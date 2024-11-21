const express = require('express');
const stopController = require('./../controllers/stopController');

const router = express.Router();

router
  .route('/')
  .get(stopController.getAllStops);

  router
  .route('/:id')
  .get(stopController.getStop);

module.exports = router;