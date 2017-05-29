/**
 * Created by yuer on 2017/5/27.
 */
import express from 'express'
import { signup, signin, signout, verify, validator } from '../controllers/sign'

const router = express.Router()

router.get('/signout', signout)
router.post('/signup', verify.signup, signup)
router.post('/signin', verify.signin, signin)
router.post('/validator', validator)

export default router