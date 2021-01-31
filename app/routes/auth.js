/* eslint-disable consistent-return */
/* eslint-disable func-names */
const authController = require('../controllers/authController');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/signin');
};

module.exports = function (app, passport) {
  app.get('/signup', authController.signUp);
  app.get('/signIn', authController.signIn);
  app.get('/dashboard', isLoggedIn, authController.dashboard);
  app.get('/logout', authController.logout);
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
  }));
  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin',
  }));
};
