import { authenticated } from '../controllers/authenticated'
import views from './views'
import oauth from './oauth'
import sign from './sign'
export default (server) => {
    server.use('/', views)
    server.use('/', sign)
    server.use('/oauth', oauth)
    server.get('/authenticated', authenticated)
}
