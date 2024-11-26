const UserModel = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const StopModel = require('./../models/stopModel');

exports.getUser = catchAsync(async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  });

exports.updateUser = catchAsync(async (req, res) => {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  });

exports.deleteUser = catchAsync(async (req, res) => {
    await UserModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      data: null
    });
  });

exports.getUserFavoriteStops = catchAsync(async (req, res) => {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found'
        });
      }
      
      const stopsDetails = await StopModel.find({ _id: { $in: user.favouriteStops } }).select('_id name subName');

      res.status(200).json({
          status: 'success',
          data: {
            "stops": stopsDetails
          }
        });
});

exports.removeStopFromFavorites = catchAsync(async (req, res) => {
    const { id, stopId } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      }); 
    }

    user.favouriteStops = user.favouriteStops.filter(stop => stop !== stopId)
    await UserModel.findByIdAndUpdate(req.params.id, user, {
      new: true,
      runValidators: true
    });

    res.status(204).json({
      status: 'success'
    });
  });

  
exports.addStopToFavorites = catchAsync(async (req, res) => {
    const { id, stopId } = req.params;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }
    
    const stop = await StopModel.findById(stopId);

    if (!stop) {
      return res.status(404).json({
        status: 'fail',
        message: 'Stop not found'
      });
    }
    if (user.favouriteStops.includes(stop._id)) {
      return res.status(201).json({
        status: 'success'
      });
    }

    user.favouriteStops.push(stop._id);

    const updatedUser = await UserModel.findByIdAndUpdate(id,
      { favouriteStops: user.favouriteStops },
      { new: true, runValidators: true }
    );

    res.status(201).json({
      status: 'success'
    });
});