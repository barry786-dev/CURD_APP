const express = require('express');
const router = express.Router();
const renderServices = require('../services/render');
const userControllers = require('../controllers/userCo');

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

// API
router.post('/api/users', userControllers.create);
router.get('/api/users', userControllers.find);
router.put('/api/users/:id', userControllers.update);
router.delete('/api/users/:id', userControllers.delete);

module.exports = router;
