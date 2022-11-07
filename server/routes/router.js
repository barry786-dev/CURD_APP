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
router.post('/api/users', userControllers.create);//create
router.get('/api/users', userControllers.read); //read
router.put('/api/users/:id', userControllers.update);//update
router.delete('/api/users/:id', userControllers.delete);//delete

module.exports = router;
