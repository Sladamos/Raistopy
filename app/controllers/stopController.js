const UserModel = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const StopModel = require('./../models/stopModel');

exports.getAllStops = catchAsync(async (req, res) => {
    let stops = await StopModel.find().select('_id name subName');
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
});

exports.getStop = catchAsync(async (req, res) => {
    const stop = await StopModel.findById(req.params.id);
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
});
