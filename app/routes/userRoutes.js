const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Register a new user (signup)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - passwordConfirm
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.route('/:id').put(authController.signup)

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid email or password
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.post('/logout', authController.logout);

router.use(authController.protect);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user's details
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User details
 *       403:
 *         description: Unauthorized access
 *   patch:
 *     summary: Update a user's details
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       403:
 *         description: Unauthorized access
 */
router
  .route('/:id')
  .get(authController.restrictToUser, userController.getUser)
  .patch(authController.restrictToUser, userController.updateUser)
  .delete(authController.restrictToUser, userController.deleteUser);

  /**
 * @swagger
 * /api/users/{id}/stops:
 *   get:
 *     summary: Get a user's favorite stops
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of favorite stops
 *       403:
 *         description: Unauthorized access
 */
router
  .route('/:id/stops')
  .get(authController.restrictToUser, userController.getUserFavoriteStops);

  /**
 * @swagger
 * /api/users/{id}/stops/{stopId}:
 *   delete:
 *     summary: Remove a stop from user's favorites
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *       - in: path
 *         name: stopId
 *         required: true
 *         schema:
 *           type: string
 *         description: The stop ID
 *     responses:
 *       200:
 *         description: Stop removed from favorites
 *       403:
 *         description: Unauthorized access
 *   put:
 *     summary: Add a stop to user's favorites
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *       - in: path
 *         name: stopId
 *         required: true
 *         schema:
 *           type: string
 *         description: The stop ID
 *     responses:
 *       200:
 *         description: Stop added to favorites
 *       403:
 *         description: Unauthorized access
 */
router
  .route('/:id/stops/:stopId')
  .delete(authController.restrictToUser, userController.removeStopFromFavorites)
  .put(authController.restrictToUser, userController.addStopToFavorites);

module.exports = router;