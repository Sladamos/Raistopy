const StopModel = require('./../models/stopModel');

exports.getAllStops = async (req, res) => {
    try {
        const stops = await StopModel.findAll();
        if (!stops) {
            return res.status(404).json({
                status: 'fail',
                message: 'Stops not found'
            });
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
