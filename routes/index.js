import Router from 'koa-router'
const router = Router()

router
    .get('/', async (ctx) => {
        ctx.body = 'HelloasdfKoa'
    })
    .post('/test', async (ctx) => {
        ctx.body = {
            content: 'ajax_info里的数据',
            name: 'name'
        }
    })

export default router