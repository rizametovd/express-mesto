const express = require('express');
const { celebrate, Joi } = require('celebrate');

const usersRoutes = express.Router();
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getMyProfile,
} = require('../controllers/users');

usersRoutes.get('/', getUsers);
usersRoutes.get('/me', getMyProfile);

usersRoutes.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

usersRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

usersRoutes.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), updateAvatar);

exports.usersRoutes = usersRoutes;
