const UsersDB = require('../model/model');
const { connectDB } = require('../database/connection');

// create and save new user

exports.create = async (req, res) => {
  try {
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
    // req.body is = UserData here we just use reduce above in case some one wants to get only certain data from the body object
    const user = new UsersDB(UserData);
    // save user in the database
    connectDB()
      .then(() => {
        user
          .save()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                'error during try to save the user >>>:' + `${err.message}`,
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            'error during trying to connect to main database, please try again later or contact the admin >>>:' +
            `${err}`,
        });
      });
  } catch (err) {
    console.log('failed to receive your request >>>>', err);
  }
};

// retrieve and return all users / retrieve and return a single user
exports.read = (req, res) => {
  connectDB()
    .then(() => {
      if (req.query.id) {
        const id = req.query.id;
        UsersDB.findById(id)
          .then((data) => {
            if (!data) {
              res.status(404).send({ message: 'Not find user with this id' });
            } else {
              res.send(data);
            }
          })
          .catch((err) => {
            res
              .status(500)
              .send({ message: err.message || 'error from the server side' });
          });
      } else {
        UsersDB.find()
          .then((user) => {
            res.send(user);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                'error during try to find the user >>>:' +
                `${err.message || 'error during try to find the user'}`,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          'error during trying to connect to main database, please try again later or contact the admin >>>:' +
          `${err}`,
      });
    });
};

// Update a new identified user by user id
exports.update = (req, res) => {
  // validate request
  if (!req.body) {
    return res.status(400).send({ message: 'Data to update can not be empty' });
  }

  const id = req.params.id;
  connectDB()
    .then(() => {
      UsersDB.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
        new: true,
      })
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `can not Update this user, Maybe user is not exist `,
            });
          } else {
            res.send(data);
          }
        })
        .catch((err) => {
          res.status(500).send({
            message:
              'error during try to update the user >>>:' +
              `${err.message || 'error during try to Update the user'}`,
          });
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

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  connectDB()
    .then(() => {
      UsersDB.findByIdAndDelete(id, {
        new: true,
      })
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `can not delete this user, Maybe user is not exist `,
            });
          } else {
            res.send({
              message: 'User was deleted successfully',
              'deleted user': data,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message:
              'error during try to delete the user >>>:' +
              `${err.message || 'error during try to delete the user'}`,
          });
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
