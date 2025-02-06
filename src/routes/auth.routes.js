const router = require('express').Router();
const { verifyToken } = require('../middlewares/authentication.js');
const {
    register,
    login,
    logout,
} = require('../controllers/auth.controller.js');

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Registers a new user account
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequestBody'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterSuccessResponse201'
 *       400:
 *         description: Invalid request body format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterFailedResponse400'
 *       409:
 *         description: Using an already registered email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterFailedResponse409'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailedResponse500'
 */
router.use('/register', register);
router.use('/login', login);
router.use('/logout', verifyToken, logout);

module.exports = router;
