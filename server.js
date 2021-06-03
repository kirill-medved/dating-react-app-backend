import express from 'express';
import mongoose from 'mongoose';
import authRouter from './authRouter.js';

// App config

const app = express();
const PORT = process.env.PORT || 8001;
const connectionUrl =
  'mongodb+srv://admin:EEdw0CaKR7AfaJfA@cluster0.gl2lf.mongodb.net/usersdb?retryWrites=true&w=majority';

// middlwares
app.use(express.json());
app.use('/auth', authRouter);


const start = async () => {
  try {
    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();





