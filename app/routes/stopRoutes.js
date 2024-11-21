const express = require('express');
const userController = require('./../controllers/stopController');

const router = express.Router();

router
  .route('/')
  .get(userController.getAllStops);

  router
  .route('/:id')
  .get(userController.getStop);

module.exports = router;