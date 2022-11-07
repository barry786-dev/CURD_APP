const express = require('express');
const reload = require('reload');
require('dotenv').config({ path: '.env' });
const morgan = require('morgan');
const path = require('path');
const router = require('./server/routes/router');
const { connectDB } = require('./server/database/connection');

const app = express();

// connect to database
connectDB();

// set server port
app.set('port', process.env.PORT || 8080);

// set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//log requests
app.use(morgan('tiny'));

// use assets (public)
app.use('/css', express.static(path.join(__dirname, 'assets', 'css')));
app.use('/js', express.static(path.join(__dirname, 'assets', 'js')));
app.use('/img', express.static(path.join(__dirname, 'assets', 'img')));

// parse request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// load routers
app.use(router);
app.use('*', (req, res) => {
  res.render('404');
});

reload(app)
  .then(() => {
    const server = app.listen(app.get('port'), () =>
      console.log(
        `server is running on http://localhost:${server.address().port}`
      )
    );
  })
  .catch((err) => {
    console.error(
      'Reload could not start, could not start server/sample app',
      err
    );
  });
