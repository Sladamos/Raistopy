const express = require('express');
const stopController = require('./../controllers/stopController');

const router = express.Router();

/**
 * @swagger
 * /api/stops:
 *   get:
 *     summary: Get all stops
 *     tags: [Stops]
 *     parameters:
 *       - in: query
 *         name: excludeUser
 *         schema:
 *           type: string
 *         description: Exclude stops from the favorites of the specified user ID
 *     responses:
 *       200:
 *         description: A list of stops
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     stops:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           subName:
 *                             type: string
 *       404:
 *         description: Stops not found
 */
router
  .route('/')
  .get(stopController.getAllStops);

  /**
 * @swagger
 * /api/stops/{id}:
 *   get:
 *     summary: Get details of a specific stop
 *     tags: [Stops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the stop
 *     responses:
 *       200:
 *         description: Details of the stop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     stop:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         subName:
 *                           type: string
 *                         latitude:
 *                           type: number
 *                         longitude:
 *                           type: number
 *                         type:
 *                           type: string
 *                         zoneName:
 *                           type: string
 *                         virtual:
 *                           type: boolean
 *                         ticketZoneBorder:
 *                           type: boolean
 *                         onDemand:
 *                           type: boolean
 *       404:
 *         description: Stop not found
 */
  router
  .route('/:id')
  .get(stopController.getStop);

module.exports = router;