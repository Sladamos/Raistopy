const express = require('express');
const userController = require('./../controllers/stopController');

const router = express.Router();

router
  .route('/')
  .get(userController.getAllStops);

module.exports = router;