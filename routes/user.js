import Router from 'koa-router'
import user from '../controllers/user'
const router = Router()

router
    .post('/logon', user.logon)
    .post('/login', user.login)

export default router