import express from 'express'
import config from '../../config.json'
const router = express.Router()
import article from '../../middleware/article'
router
    .get('/:slug', async (req, res) => {
        await article.oneViewSlug(req.params.slug)
            .then(e => {
                res.render(`theme/${config.theme}/article`, {
                    title: 'login',
                    article: e.article,
                    meta: e.meta
                })
            })
    })
    .get('/', async (req, res) => {
        let data = await article.allView()
        res.render(`theme/${config.theme}/index`, {
            title: 'index',
            article: data.article,
            meta: data.meta
        })
    })

export default router