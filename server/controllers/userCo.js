const UsersDB = require('../model/model');
const { connectDB } = require('../database/connection');

// create and save new user

exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: 'Content can not be empty' });
    return;
  }
  // new user
  // const { name, email, gender, status } = req.body;
  //extract the request data from req.body in object form using reduce array method to return object with the requests values
  const UserData = ['name', 'email', 'gender', 'status'].reduce(
    (obj, key) => ((obj[key] = req.body[key]), obj),
    {}
  );
  const user = new UsersDB(UserData);

  // save user in the database
  connectDB()
    .then(() => {
      user.save();
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error during try to save the user >>>:' + `${err.message}`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          'error during trying to connect to main database, please try again later or contact the admin >>>:' +
          `${err}`,
      });
    });
};

// retrieve and return all users / retrieve and return a single user
exports.find = (req, res) => {};

// Update a new identified user by user id
exports.update = (req, res) => {};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {};
