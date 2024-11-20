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
  
      res.status(204).json({
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

        const stops = await StopModel.findAll();
        if (!stops) {
            return res.status(404).json({
                status: 'fail',
                message: 'Stops not found'
            });
        }

        let favoriteStops = stops.filter(stop => user.favoriteStops.includes(stop.id));
        res.status(200).json({
            status: 'success',
            data: {
              favoriteStops
            }
          });
        return 
        
      } catch (err) {
        console.error(err)
        res.status(500).json({
          status: 'fail',
          message: err
        });
      }
};

 exports.removeStopFromFavorites = async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found'
        });
      }
  
      user.favoriteStops = user.favoriteStops.filter(stop => stop !== req.params.stopId)
      await UserModel.findByIdAndUpdate(req.params.id, user, {
        new: true,
        runValidators: true
      });
  
      res.status(204).json({
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