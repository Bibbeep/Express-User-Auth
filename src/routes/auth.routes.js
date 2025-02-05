const router = require('express').Router();
const { verifyToken } = require('../middlewares/authentication.js');
const {
    register,
    login,
    logout,
} = require('../controllers/auth.controller.js');

router.use('/register', register);
router.use('/login', login);
router.use('/logout', verifyToken, logout);

module.exports = router;
