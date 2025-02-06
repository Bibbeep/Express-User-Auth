const { getClient } = require('../configs/redis');
const HTTPError = require('../utils/httpError');

module.exports = {
    rateLimiter: (rule) => {
        const { endpoint, rateLimit } = rule;

        return async (req, res, next) => {
            try {
                const ipAddress = req.ip;
                const key = `${endpoint}:${ipAddress}`;

                const redis = await getClient();
                const requests = await redis.incr(key);

                // If the first time hitting the endpoint (outside the time window), set the key expiration time
                if (requests === 1) {
                    await redis.expire(key, rateLimit.time);
                }

                // If exceeds the limit, throw an error
                if (requests > rateLimit.limit) {
                    throw new HTTPError(
                        429,
                        'Too many requests, please try again later.',
                    );
                }

                next();
            } catch (err) {
                next(err);
            }
        };
    },
};
