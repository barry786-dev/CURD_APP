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
  axios
    .get(
      `${req.app.get('host')}${req.app.get('port')}${req.app.get('api')}?id=${
        req.query.id
      }`
    )
    .then((response) => {
      res.render('update_user', {
        user: response.data,
      });
    })
    .catch((err) => {
      res.send(err);
    });

  // axios.get(
  //     `${req.app.get('host')}${req.app.get('port')}${req.app.get('api')}
  //     }`,{params:{id:req.query.id}}
  //   )
};
