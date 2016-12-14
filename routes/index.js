import Router from 'koa-router'
import user from './user'
import admin from './user'
const router = Router()

router
    .get('/api/', async (ctx) => {
        console.log(ctx.request.params)
        ctx.body = 'HelloasdfKoa'
    })
    .post('/api/test', async (ctx) => {
        ctx.body = 'HelloasdfKoa'
    })

router.use('/api/user', user.routes(), user.allowedMethods())
router.use('/api/admin', admin.routes(), admin.allowedMethods())
export default router