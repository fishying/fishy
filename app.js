/**
 * Created by yuer on 2017/5/22.
 */
import express from 'express'
import config from './config'
import routes from './core/routes'
import './core/models'
import './server/logger'

// use middleware
import use from './server/use'

console.log('--------------------------------------------------------------------------------')
console.log('fishy')
console.log('--------------------------------------------------------------------------------')
const app = new express()

use(app)
routes(app)

process.on('SIGINT', () => {
    console.log('bye~')
    process.exit()
})

app.listen(config.port, function(){
    console.log(`port ${config.port}!`)
    console.log('biu~')
})
