import api from './api'
import view from './view'
import fp from 'path'
function relative(path) {
    return fp.join(__dirname, path)
}
export default (app) => {
    app.get('/favicon.ico', async (req, res) => {
        res.sendFile('favicon.ico', {
            root: relative('../')
        }, async function (err) {
            if (err) {
                return res.status(404)
            }
        })
    })
    app.use('/api', api)
    app.use('/', view)
}