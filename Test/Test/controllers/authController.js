const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const AuthError = require('../exceptions/errors');

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.SECRET_access, { expiresIn: '1h' });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.SECRET_refresh, { expiresIn: '24h' });
}

class AuthController {
  async registration(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(AuthError.BadRequest('Ошибка при валидации', errors.array()));
    }
    try {
      const data = req.body;
      console.log(data);
      const candidate = await prisma.users.findUnique({
        where: {
          email: data.email,
        },
      });
      if (candidate) {
        throw AuthError.BadRequest('Пользователь с таким логином уже существует');
      }
      const hashPassword = bcrypt.hashSync(data.password, process.env.BCRYPT_SALT);
      const newUser = await prisma.users.create({
        data: {
          login: data.login,
          email: data.email,
          password: hashPassword,
          role: 'USER',
        },
      });
      const accessToken = generateAccessToken({ id: newUser.id, role: newUser.role });
      const refreshToken = generateRefreshToken({ id: newUser.id, role: newUser.role });
      await saveRefreshToken(newUser.id, refreshToken);
      res.cookie('refreshToken', refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
      return res.json({ user: newUser, accessToken });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(email);
      const user = await prisma.users.findUnique({
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
      const accessToken = generateAccessToken({ id: user.id, role: user.role });
      const refreshToken = generateRefreshToken({ id: user.id, role: user.role });
      await saveRefreshToken(user.id, refreshToken);
      res.cookie('refreshToken', refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
      return res.json({ user, accessToken });
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const data = req.body;
      console.log(data);
      const candidate = await prisma.users.findUnique({
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
      const token = jwt.verify(refreshToken, process.env.SECRET_refresh);
      const user = await prisma.users.findUnique({
        where: {
          id: token.id,
        },
      });
      if (!user) {
        throw AuthError.BadRequest('Пользователь не найден');
      }
      const accessToken = generateAccessToken({ id: user.id, role: user.role });
      const newRefreshToken = generateRefreshToken({ id: user.id, role: user.role });
      await saveRefreshToken(user.id, newRefreshToken);
      res.cookie('refreshToken', newRefreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
      return res.json({ accessToken });
    } catch (e) {
      next(e);
    }
  }
}

async function saveRefreshToken(userId, refreshToken) {
  const tokenData = await prisma.tokens.findUnique({
    where: {
     userId: userId,
    },
  });
  if (tokenData) {
    await prisma.tokens.update({
      where: {
        id: tokenData.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });
  } else {
    await prisma.tokens.create({
      data: {
        userId: userId,
        refreshToken: refreshToken,
      },
    });
  }
}

module.exports = new AuthController();