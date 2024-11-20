const UserModel = require('../models/userModel');
const StopModel = require('./../models/stopModel');

exports.getAllStops = async (req, res) => {
    try {
        let stops = await StopModel.findAll();
        if (!stops) {
            return res.status(404).json({
                status: 'fail',
                message: 'Stops not found'
            });
        }

        const excludeUserId = req.query.excludeUser;
        if (excludeUserId) {
            const user = await UserModel.findById(excludeUserId);
            if (!user) {
                return res.status(404).json({
                  status: 'fail',
                  message: 'User not found'
                });
              }

            stops = stops.filter(stop => !user.favoriteStops.includes(stop.id));
        }

        res.status(200).json({
            status: 'success',
            data: {
                stops
            }
        });
    } catch (err) {
        console.error("Error in getAllStops: ", err);
        res.status(500).json({
            status: 'fail',
            message: 'An error occurred while fetching stops'
        });
    }
};
