const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('../configs/swagger');
const router = require('express').Router();
const authRoutes = require('./auth.routes');
const { verifyToken } = require('../middlewares/authentication');
const { adminAccess } = require('../middlewares/authorization');
const { getAPIHealth } = require('../controllers/health.controller');

router.use('/auth', authRoutes);
router.use('/health', verifyToken, adminAccess, getAPIHealth);
router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = router;
