const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();
router.route('/:id').put(authController.signup)

router.use(authController.protect);

router
  .route('/:id')
  .get(authController.restrictToUser, userController.getUser)
  .patch(authController.restrictToUser, userController.updateUser)
  .delete(authController.restrictToUser, userController.deleteUser);

router
  .route('/:id/stops')
  .get(authController.restrictToUser, userController.getUserFavoriteStops);

router
  .route('/:id/stops/:stopId')
  .delete(authController.restrictToUser, userController.removeStopFromFavorites)
  .put(authController.restrictToUser, userController.addStopToFavorites);

module.exports = router;