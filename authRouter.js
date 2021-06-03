import Router from 'express';
import controller from './authController.js';
import expressValidator from 'express-validator';
import authMiddleware from './middleware/authMiddleware.js';
import roleMiddleware from './middleware/roleMiddleware.js';

const { check } = expressValidator;
const router = new Router();

router.post(
  '/registration',
  [
    check('name', 'Имя пользователя не может быть пустым').notEmpty(),
    check(
      'password',
      'Пароль должен быть больше 4 и меньше 10 символов',
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.registration,
);
router.post('/login', controller.login);
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers);

export default router;
