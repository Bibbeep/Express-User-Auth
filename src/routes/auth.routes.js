const router = require('express').Router();
const { verifyToken } = require('../middlewares/authentication.js');
const { rateLimiter } = require('../middlewares/rateLimiter.js');
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
 *       429:
 *         description: Too many requests
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailedResponse429'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailedResponse500'
 */
router.use(
    '/register',
    rateLimiter({
        endpoint: '/api/v1/auth/register',
        rateLimit: {
            time: 3600,
            limit: 5,
        },
    }),
    register,
);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Logs in a user account
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequestBody'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginSuccessResponse200'
 *       400:
 *         description: Invalid request body format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginFailedResponse400'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginFailedResponse401'
 *       429:
 *         description: Too many requests
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailedResponse429'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailedResponse500'
 */
router.use(
    '/login',
    rateLimiter({
        endpoint: '/api/v1/auth/login',
        rateLimit: {
            time: 900,
            limit: 10,
        },
    }),
    login,
);

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logs out a user account
 *     tags: [User Authentication]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer JWT access token
 *         schema:
 *           type: string
 *           format: JWT
 *         required: true
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutSuccessResponse200'
 *       401:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutFailedResponse401'
 *       429:
 *         description: Too many requests
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailedResponse429'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailedResponse500'
 */
router.use(
    '/logout',
    rateLimiter({
        endpoint: '/api/v1/auth/logout',
        rateLimit: {
            time: 60,
            limit: 20,
        },
    }),
    verifyToken,
    logout,
);

module.exports = router;
