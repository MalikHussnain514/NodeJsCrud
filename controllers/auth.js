import mongoose from 'mongoose';
import Auth from '../models/auth.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Auth.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: 'User Doesnt Exist' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await Auth.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords dont match' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Auth.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    return res.status(200).json({ result, token });
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ message: 'Something Went Wrong in Signup' });
  }
};
