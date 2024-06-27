const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const AuthError = require('../exceptions/errors');

const checkRole = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(AuthError.UnauthorizedError());
        }
        const userData = jwt.verify(authorizationHeader, process.env.SECRET_access);
        if (!userData) {
            return next(AuthError.UnauthorizedError());
        }
        if (userData.role !== 'organizer') {
            return next(AuthError.BadRequest('У обычнго пользователя недостаточно прав'));
        }
        req.user = userData;
        next();
    } catch (e) {
        return next(AuthError.UnauthorizedError());
    }
};

module.exports = checkRole;