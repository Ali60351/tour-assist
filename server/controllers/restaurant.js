const model = require('../models/model.js');
var image = require('./image.js');

module.exports = {
    initialize: function() {
        model.initialize();
    },

    addRestaurant: function(req, res) {
      var title = req.body.title;
      var location = req.body.location;
      var cuisine = req.body.cuisine;
      var encodedImage = req.body.image;

      // console.log(title);
      // console.log(location);
      // console.log(cuisine);

      image.uploadImage(encodedImage).then((link) => {
          model.addRestaurant(title, location, link, [], cuisine, 4)
          .then((result) => {
              res.status = 200;
              res.json({
                  'message': 'Added Successfully',
                  'obj': result
              });
          })
          .catch((err) => {
              res.status = 777;
              res.json({
                  'message': 'Error Adding',
                  'obj': err
              });
          });
      }).catch(err => {
          res.status = 777;
          res.json({
              'message': 'Error Uploading',
              'obj': err
          });
      });
    },

    updateRestaurant: function(req, res) {
        id = req.params.id

        var obj = {
            'title': req.body.title,
            'location': req.body.location,
            'imgUrl': req.body.imgUrl,
            'features': req.body.features,
            'cuisine': req.body.cuisine,
            'rating': req.body.rating
        }

        model.updateRestaurant(id, obj)
        .then((result) => {
            res.status = 200;
            res.json({
                'message': 'Updated Successfully',
                'obj': result
            });
        })
        .catch((err) => {
            res.status = 777;
            res.json({
                'message': 'Error Updating Data',
                'obj': err
            });
        });
    },

    getRestaurant: function(req, res) {
        id = req.params.id
        model.getRestaurant(id)
        .then((result) => {
            res.status = 200;
            res.json(result);
        })
        .catch((err) => {
            res.status = 777;
            res.json({
                'message': 'Error Fetching Data',
                'obj': err
            });
        });
    },

    getAllRestaurants: function(req, res) {
        model.getAllRestaurants()
        .then((result) => {
            res.status = 200;
            res.json(result);
        })
        .catch((err) => {
            res.status = 777;
            res.json({
                'message': 'Error Fetching Data',
                'obj': err
            });
        });
    }
}
