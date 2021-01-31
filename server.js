/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use('/', express.static(path.join(__dirname, 'app/public')));

const models = require('./app/models');
const authRoute = require('./app/routes/auth.js')(app, passport);
require('./config/passport/passport.js')(passport, models.user);

models.sequelize.sync().then(() => {
  console.log('Database looks fine');
}).catch((err) => {
  console.error(err, 'Something went wrong with the DB update!');
});


app.get('/', (req, res) => {
  res.render('welcome');
});

app.listen(5000, (err) => {
  if (!err) console.log('Site is live');
  else console.error(err);
});
