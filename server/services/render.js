const axios = require('axios');
require('dotenv').config({ path: '../../.env' });

exports.homeRoutes = (req, res) => {
  // Make a get request to /api/users
  //const port = process.env.PORT;
  //console.log(`>>>>>>>>>>>${req.app.get('host')}${req.app.get('port')}`);
  axios
    .get(`${req.app.get('host')}${req.app.get('port')}${req.app.get('api')}`)
    .then((response) => {
      res.render('index', {
        users: response.data,
      });
    });
};

exports.addUser = (req, res) => {
  res.render('add_user');
};

exports.updateUser = (req, res) => {
  res.render('update_user');
};
