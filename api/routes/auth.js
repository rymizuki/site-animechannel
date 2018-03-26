const express = require('express');
const router = express.Router();

const passport = require('passport')
const TwitterStrategy = require('passport-twitter')

const Passport = require('../schema/passport')
const User = require('../schema/user')

const consumerKey    = process.env.TWITTER_CONSUMER_KEY
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET

passport.serializeUser(function(passport, done) {
  done(null, passport);
});

passport.deserializeUser(function(user, done) {
  console.log('deserialize user', user)
  done(null, user);
});

passport.use(new TwitterStrategy({
  consumerKey,
  consumerSecret,
  callbackURL: 'http://localhost:8080/auth/callback',
}, function(token, tokenSecret, profile, done) {
  // 例えばtwitteridがDBの中に存在するかということを確認する
  // 検証結果によってdoneの書き方を以下のように指定する
  //     検証成功 : return done(null,profile);
  //     検証失敗 : return done(null,false);
  //     例外発生 : return done(null);
  Passport.findOne({ where: {
    provider:    profile.provider,
    providerId:  profile.id
  } })
    .then((_passport) => {
      const passport = _passport || Passport.build()
      passport.providerId   = profile.id
      passport.provider     = profile.provider
      passport.username     = profile.username
      passport.displayName  = profile.displayName
      passport.photo        = profile.photos[0].value
      passport.save().then(() => {
        return done(null, passport);
      })
    })
}));

/* GET home page. */
router.get('/signup', passport.authenticate('twitter'));
router.get('/callback', passport.authenticate('twitter', { failureRedirect: '/' }), function(req, res) {
  console.log('session user', req.user.id)
  res.redirect(`/user/${ req.user.username }`);
})

module.exports = router;
