import Router from 'koa-router'
import user from './user'
const router = Router()

router
    .get('/api/', async (ctx) => {
        ctx.body = 'HelloasdfKoa'
    })
    .post('/api/test', async (ctx) => {
        console.log(ctx.request.body.test)
        ctx.body = {
            content: 'ajax_info里的数据',
            name: 'name'
        }
    })

router.use('/api/user', user.routes(), user.allowedMethods())
export default router