var User = require('../models/user');

// Display list of all User.
exports.user_list = function(req, res) {
    User.find({}, 'email displayName')
      .exec(function (err, listUsers) {
        if (err) { return next(err); }
          res.send(listUsers);
      });
};

// Display detail page for a specific User.
exports.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
};
