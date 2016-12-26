import Router from 'koa-router'
import user from '../controllers/user'
// import admin from './user'
import defaultPartials from './default.json'
const router = Router()

router
    .get('/api/', async (ctx) => {
        return ctx.render('index', {
            title: 'my title',
            partials: Object.assign({}, defaultPartials,{})
        })
    })
    .post('/api/test', async (ctx) => {
        ctx.body = 'HelloasdfKoa'
    })
    .post('/login', user.login)
    .post('/logon', user.logon)

// router.use('/api/user', user.routes())
// router.use('/api/admin', <q className="routes"></q>)
export default router