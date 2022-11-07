const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB Connected...');
    } else {
      const con = await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB Connected...:' + `${con.connection.host}`);
    }
  } catch (err) {
    console.log(
      'failed to connect to the data base, this error come from connection.js from inside connectDB function >>>>',
      err
    );
    // process.exit(1);
  }
};

module.exports = { connectDB };
