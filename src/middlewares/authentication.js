const jwt = require('jsonwebtoken');
const { getClient } = require('../configs/redis');
const HTTPError = require('../utils/httpError');
const { JWT_SECRET } = process.env;

module.exports = {
    verifyToken: async (req, res, next) => {
        try {
            if (!req.headers?.authorization?.startsWith('Bearer')) {
                throw new HTTPError(401, 'Invalid or expired token.', [
                    {
                        message: 'Invalid or expired token',
                        context: {
                            key: 'request.headers.authorization',
                            value: req.headers?.authorization || null,
                        },
                    },
                ]);
            }

            const token = req.headers.authorization.split(' ')[1];

            const redis = await getClient();
            const blacklisted = await redis.get(`blacklist_${token}`);

            if (blacklisted !== null) {
                throw new HTTPError(401, 'Invalid or expired token.', [
                    {
                        message: 'Invalid or expired token',
                        context: {
                            key: 'request.headers.authorization',
                            value: req.headers?.authorization || null,
                        },
                    },
                ]);
            }

            const decoded = await jwt.verify(token, JWT_SECRET);

            req.userId = decoded.id;
            req.userRole = decoded.role;
            req.tokenExp = decoded.exp;
            req.token = token;

            next();
        } catch (err) {
            next(err);
        }
    },
};
