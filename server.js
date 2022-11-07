const express = require('express');
const reload = require('reload');
require('dotenv').config({ path: '.env' });
const morgan = require('morgan');
const path = require('path');

const app = express();

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

app.get('/', (req, res) => {
  res.render('index.ejs');
});
app.get('/add-user', (req, res) => {
  res.render('add_user.ejs');
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
