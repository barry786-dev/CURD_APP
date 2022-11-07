const express = require('express');
const router = express.Router();
const renderServices = require('../services/render');

/**
 * @description Root Route
 * @method GET /
 */
router.get('/', renderServices.homeRoutes);

/**
 * @description add users
 * @method GET /add_user
 */
router.get('/add-user', renderServices.addUser);

/**
 * @description update users
 * @method GET /update_user
 */
router.get('/update-user', renderServices.updateUser);

module.exports = router;
