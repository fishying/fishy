import Router from 'koa-router'
import user from './user'
import admin from './user'
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

router.use('/api/user', user.routes(), user.allowedMethods())
router.use('/api/admin', admin.routes(), admin.allowedMethods())
export default router