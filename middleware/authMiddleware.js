import jwt from 'jsonwebtoken';
import Auth from '../models/auth.js';

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Auth.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      // res.status(401);
      // throw new Error('Not Authorized, token failed');
      res.status(401).json({ message: 'Not Authorized, token failed' });
    }
  }

  if (!token) {
    // res.status(401);
    // throw new Error('Authorization not, Token not found');
    res.status(401).json({ message: 'Authorization not, Token not found' });
  }
};

export { protect };
