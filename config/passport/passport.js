/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-shadow */
/* eslint-disable global-require */

module.exports = (passport, user) => {
  const User = user;
  const LocalStrategy = require('passport-local').Strategy;

  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    }, (req, email, password, done) => {
      const {
        firstname, lastname,
      } = req.body;
      User.findOne({
        where: {
          email,
        },
      }).then((user) => {
        if (user) {
          return done(null, false, {
            message: 'That email is already taken',
          });
        }
        console.log(req.body);
        const newUser = new User({
          firstname, lastname, email, password,
        });
        newUser.save().then((newUser, created) => {
          if (!newUser) {
            return done(null, false);
          }
          if (newUser) {
            return done(null, newUser);
          }
        });
      });
    },
  ));

  passport.use('local-signin', new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
    ((req, email, password, done) => {
      const User = user;

      const isValidPassword = function (userpass, password) {
        return userpass === password;
      };

      User.findOne({
        where: {
          email,
        },
      }).then((user) => {
        if (!user) {
          return done(null, false, {
            message: 'Email does not exist',
          });
        }

        if (!isValidPassword(user.password, password)) {
          return done(null, false, {
            message: 'Incorrect password.',
          });
        }


        const userinfo = user.get();
        return done(null, userinfo);
      }).catch((err) => {
        console.log('Error:', err);

        return done(null, false, {
          message: 'Something went wrong with your Signin',
        });
      });
    }),

  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
};
