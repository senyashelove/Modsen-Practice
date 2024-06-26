const { validationResult } = require('express-validator');
const tokenService = require('../models/tokenService');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const AuthError = require('../exceptions/errors');

class AuthController {
  async registration(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(AuthError.BadRequest('Ошибка при валидации', errors.array()));
    }
    try {
      const data = req.body;
      console.log(data);
      const candidate = await prisma.users.findFirst({
        where: {
          email: data.email,
        },
      });
      if (candidate) {
        throw AuthError.BadRequest('Пользователь с таким логином уже существует');
      }
      const hashPassword = bcrypt.hashSync(data.password, 3);
      const newUser = await prisma.users.create({
        data: {
          login: data.login,
          email: data.email,
          password: hashPassword,
          role: 'USER',
        },
      });
      const tokens = await tokenService.generateTokens({ id: newUser.id, email: newUser.email });
      await tokenService.saveToken(newUser.id, tokens.refreshToken);
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
      return res.json({ user: newUser, ...tokens });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(email);
      const user = await prisma.users.findFirst({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw AuthError.BadRequest('Пользователь с таким логином не найден');
      }
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        throw AuthError.BadRequest('Неверный пароль');
      }
      const tokens = await tokenService.generateTokens({ id: user.id, email: user.email });
      await tokenService.saveToken(user.id, tokens.refreshToken);
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
      return res.json({ user, ...tokens });
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const data = req.body;
      console.log(data);
      const candidate = await prisma.users.findFirst({
        where: {
          email: data.email,
        },
      });
      if (!candidate) {
        throw AuthError.BadRequest('Пользователя не существует');
      }
      const updateUser = await prisma.users.update({
        where: {
          id: candidate.id,
        },
        data: {
          email: data.email,
        },
      });
      res.cookie('refreshToken', updateUser.refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
      return res.json({ user: updateUser });
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await tokenService.refresh(refreshToken);
      res.cookie('refreshToken', token.refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AuthController();
