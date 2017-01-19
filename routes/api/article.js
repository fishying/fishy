import express from 'express'
import ctr from '../../controllers'
import middleware from '../../middleware'
import respond from '../../util/respond'
const router = express.Router()

router.use(async function (req, res, next) {
    if (req.method !== 'GET') {
        //
    }
    next()
})

router.route('/')
    .get(function (req, res) {
        console.log(1)
    })
    .delete(ctr.article.delete)
    .post(ctr.article.create)
    .put(ctr.article.update)
export default router