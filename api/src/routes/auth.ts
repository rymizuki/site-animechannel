import express from 'express'
const router = express.Router()

import { get } from 'lodash'

import passport from 'passport'
import TwitterStrategy from 'passport-twitter'

import authenticator from '../services/authenticator'

const consumerKey    = process.env.TWITTER_CONSUMER_KEY
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET

passport.serializeUser(function(user, done) {
  done(null, user)
});

passport.deserializeUser(function(user, done) {
  console.log('deserialize ', user)
  done(null, user)
})

passport.use(new TwitterStrategy({
  consumerKey,
  consumerSecret,
  callbackURL: `http://${ process.env.API_HOSTNAME || 'localhost' }:50200/auth/callback`,
}, function(token, tokenSecret, profile, done) {
  // 例えばtwitteridがDBの中に存在するかということを確認する
  // 検証結果によってdoneの書き方を以下のように指定する
  //     検証成功 : return done(null,profile);
  //     検証失敗 : return done(null,false);
  //     例外発生 : return done(null);
  authenticator.authenticate(profile)
    .then((authentication) => {
      return done(null, { authentication })
    })
}))

/* GET home page. */
router.get('/signup', passport.authenticate('twitter'));
router.get('/callback', passport.authenticate('twitter', { failureRedirect: '/' }), function(req, res) {
  const authentication = get(req, 'user.authentication')
  console.log('session user', authentication.user)

  return res.redirect(`/user/${ authentication.user.username }`)
})

export default router
