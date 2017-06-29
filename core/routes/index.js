import api from './api'
import sign from './sign'
export default (server) => {
    server.use('/api', api)
    server.use(sign)
}
