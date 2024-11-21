const UserModel = require('./../models/userModel');
const StopModel = require('./../models/stopModel');

exports.getUser = async (req, res) => {
    try {
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
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };

exports.createUser = async (req, res) => {
    try {
      const user = await UserModel.create({
        _id: req.params.id,
        login: req.body.login
      });
  
      res.status(201).json({
        status: 'success',
        data: {
          user
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err
      });
    }
  };

exports.updateUser = async (req, res) => {
    try {
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
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };

exports.deleteUser = async (req, res) => {
    try {
      await UserModel.findByIdAndDelete(req.params.id);
  
      res.status(200).json({
        status: 'success',
        data: null
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };

exports.getUserFavoriteStops = async (req, res) => {
  try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found'
        });
      }

      const stopsDetails = await StopModel.find({ _id: { $in: user.favouriteStops } });

      res.status(200).json({
          status: 'success',
          data: {
            "stops": stopsDetails
          }
        });
      return 
      
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
};

 exports.removeStopFromFavorites = async (req, res) => {
    try {
      const { id, stopId } = req.params;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found'
        });
      }
  
      user.favouriteStops = user.favouriteStops.filter(stop => stop.id !== stopId)
      await UserModel.findByIdAndUpdate(req.params.id, user, {
        new: true,
        runValidators: true
      });
  
      res.status(204).json({
        status: 'success'
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };
  //673f73232d385ba6e0750661

  
exports.addStopToFavorites = async (req, res) => {
  try {
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
      return res.status(200).json({
        status: 'success'
      });
    }

    user.favouriteStops.push(stop._id);

    const updatedUser = await UserModel.findByIdAndUpdate(id,
      { favouriteStops: user.favouriteStops },
      { new: true, runValidators: true }
    );

    res.status(204).json({
      status: 'success'
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err
    });
  }
};