/* eslint-disable no-unused-vars */
const liveServer = require('live-server');
const path = require('path');

module.exports.signUp = (req, res) => {
  res.render('register');
};

module.exports.signIn = (req, res) => {
  res.render('login');
};

module.exports.dashboard = (req, res) => {
  // res.sendFile(path.resolve(__dirname, '../views/public/index.html'));
  // liveServer.start({ port: 5000, host: 'localhost', root: './app/views/public' });
  res.render('dashboard');
};

module.exports.logout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
};
