import express from 'express'
import { request } from '../../middleware'
import { article } from '../../api'

const router = express.Router()
router
    .use(request.setFrontEnd)
    .get('/:slug', async (req, res) => {
        await article.oneSlug(req.params.slug)
            .then(e => {
                res.render('article', {
                    title: 'login',
                    article: e.article,
                    meta: e.meta
                })
            })
    })
    .get('/', async (req, res) => {
        let data = await article.all()
        res.render('index', {
            title: 'index',
            article: data.article,
            meta: data.meta
        })
    })

export default router