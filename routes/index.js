import api from './api'
import view from './view'
export default (app) => {
    app.use('/api', api)
    app.use('/', view)
}