const jwt = require('jsonwebtoken');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TokenService {
     generateTokens = async (payload) => {
        const accessToken = jwt.sign(payload, process.env.SECRET_access, { expiresIn: '1h' })
        const refreshToken = jwt.sign(payload, process.env.SECRET_refresh, { expiresIn: '24h' })
        return {
            accessToken, refreshToken
        }
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await prisma.tokens.findFirst({
            where: {
                userId: userId
            }
        })
        if (tokenData) {
            const updateToken = await prisma.tokens.update({
                where: { id: tokenData.id },
                data: { refreshToken: refreshToken }
            })
            return updateToken
        }
        console.log(refreshToken);
        const token = await prisma.tokens.create({
            data: {
                userId: userId,
                refreshToken: refreshToken
            }
        })
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await prisma.tokens.deleteMany({
            where: {
                refreshToken: refreshToken
            }
        })
        return tokenData;
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.SECRET_access);
            return userData;
        }
        catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.SECRET_refresh);
            return userData;
        }
        catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        const tokenData = await prisma.tokens.findFirst({
            where: {
                refreshToken: refreshToken
            }
        })
        return tokenData;
    }


}

module.exports = new TokenService();