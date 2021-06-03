import User from './models/User.js';
import Role from './models/Role.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import expressValidator from 'express-validator';
// import { secret } from './config.js';
const { validationResult } = expressValidator;
const secret = 'MY_SECRET_KEY';

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: '72h' });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Ошибка при регистрации', errors });
      }
      const { name, password, imgUrl, sex, search } = req.body;
      const candidate = await User.findOne({ name });
      console.log(candidate);
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Пользователь с таким именем уже существует' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      //   const userRole = await Role.findOne({ value: 'USER' });
      //   console.log(userRole);
      const user = new User({
        name,
        password: hashPassword,
        imgUrl: imgUrl,
        sex,
        search,
      });
      await user.save();
      return res.json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      const { name, password } = req.body;
      const user = await User.findOne({ name });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${name} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new authController();
