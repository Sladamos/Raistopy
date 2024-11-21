const UserModel = require('../models/userModel');
const StopModel = require('./../models/stopModel');

exports.getAllStops = async (req, res) => {
    try {
        let stops = await StopModel.Stop.find();
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

            stops = stops.filter(stop => !user.favoriteStops.map(stop => stop.id).includes(stop.id));
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

exports.getStop = async (req, res) => {
    try {
        const stop = await StopModel.Stop.findById(req.params.id);
        if (!stop) {
            return res.status(404).json({
              status: 'fail',
              message: 'Stop not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                stop
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
