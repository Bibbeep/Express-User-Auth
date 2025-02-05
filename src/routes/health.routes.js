const router = require('express').Router();
const { verifyToken } = require('../middlewares/authentication');
const { adminAccess } = require('../middlewares/authorization');
const { getAPIHealth } = require('../controllers/health.controller');

router.get('/health', verifyToken, adminAccess, getAPIHealth);

module.exports = router;
