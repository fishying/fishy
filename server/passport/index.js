import passport from 'passport'
import LocalStrategy from 'passport-local'
// 引入user
import User from '../../models/user'

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

export default passport