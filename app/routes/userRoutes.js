const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router
  .route('/:id')
  .get(userController.getUser)
  .put(userController.createUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;