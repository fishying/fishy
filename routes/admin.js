import Router from 'koa-router'
import user from '../controllers/user'
import article from '../controllers/article'

const router = Router()

router
    .param('/admin', user.verify)
    .post('/article', async (ctx) => {
        console.log(ctx)
    })

export default router