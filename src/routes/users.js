var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controllers/userController');

// GET list of all user.
router.get('/', user_controller.user_list);

// GET details of a specific user
router.get('/:id', user_controller.user_detail);

module.exports = router;
