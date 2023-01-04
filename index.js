import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('App is running .... ');
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;

const MONGO_SECRET = process.env.MONGO_SECRET

mongoose
  .connect(
    `mongodb+srv://alihussnain:alihussnain@memories.r8kf9uf.mongodb.net/${MONGO_SECRET}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server Running on port: ${PORT}`);
      console.log(`MongoDb ${MONGO_SECRET} connected Successfully`);
    })
  )
  .catch((error) => console.log(error.message));
