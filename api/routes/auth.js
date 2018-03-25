const express = require('express');
const router = express.Router();

const passport = require('passport')
const TwitterStrategy = require('passport-twitter')

const consumerKey = 'JuawOC6sDlVTLAvrYYNLGSXIl'
const consumerSecret = 'Z9fPXQxOrBGGHVqacBqGRWtM34I8HMkKW0wV63xgSbLnXljhrk'

passport.serializeUser(function(user, done) {
  console.log('user', user)
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('user', user)
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
  return done(null, profile);
}));

/* GET home page. */
router.get('/signup', passport.authenticate('twitter'));
router.get('/callback', passport.authenticate('twitter', { failureRedirect: '/' }), function(req, res) {
  console.log('user', req.user)
  res.redirect('/dashboard');
})

module.exports = router;
