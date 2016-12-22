import Koa from 'koa'
import index from './routes'
import bodyParser from 'koa-bodyparser'
import './models/index.js'

import views from 'koa-views'

const app = new Koa()

app.use(bodyParser())

app.use(views(__dirname + '/', {
    extension: 'hbs',
    map: {
        hbs: 'handlebars'
    }
}))

app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routers
app.use(index.routes())
// response

app.listen(3000)