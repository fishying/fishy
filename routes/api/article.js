import express from 'express'
import ctr from '../../controllers'
import api from '../../api'
import respond from '../../util/respond'
const router = express.Router()

router.use(async function (req, res, next) {
    if (req.method !== 'GET') {
        api.log.verify(req, res)
            .then(() => {
                next()
            })
            .catch(msg => {
                respond(res, msg)
            })
    }
})

router.route('/')
    .get(function (req, res) {
        console.log(1)
    })
    .post(ctr.article.create)
    .put(ctr.article.update)
export default router