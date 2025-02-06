const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('../configs/swagger');
const router = require('express').Router();
const authRoutes = require('./auth.routes');
const { verifyToken } = require('../middlewares/authentication');
const { adminAccess } = require('../middlewares/authorization');
const { rateLimiter } = require('../middlewares/rateLimiter');
const { getAPIHealth } = require('../controllers/health.controller');

router.use('/auth', authRoutes);
router.use(
    '/health',
    rateLimiter({
        endpoint: '/api/v1/health',
        rateLimit: {
            time: 60,
            limit: 60,
        },
    }),
    verifyToken,
    adminAccess,
    getAPIHealth,
);
router.use(
    '/docs',
    rateLimiter({
        endpoint: '/api/v1/docs',
        rateLimit: {
            time: 60,
            limit: 100,
        },
    }),
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec),
);

module.exports = router;
