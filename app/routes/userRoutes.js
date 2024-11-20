const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router
  .route('/:id')
  .get(userController.getUser)
  .put(userController.createUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router
  .route('/:id/stops')
  .get(userController.getUserFavoriteStops);

router
  .route('/:id/stops/:stopId')
  .delete(userController.removeStopFromFavorites);

module.exports = router;