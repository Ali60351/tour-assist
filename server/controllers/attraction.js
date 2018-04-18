const model = require('../models/model.js');

module.exports = {
    initialize: function() {
        model.initialize();
    },
    getAllAttractions: function(req, res) {
        model.getAllAttractions()
        .then((result) => {
            res.status = 200;
            res.json(result);
        })
        .catch((err) => {
            res.status = 777;
            res.json({
                'message': 'Error Signing In',
                'obj': err
            });
        });
    },
    getAttraction: function(req, res) {
        id = req.params.id
        model.getAttraction(id)
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