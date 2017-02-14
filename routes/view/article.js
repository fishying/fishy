import express from 'express'
import config from '../../config.json'
const router = express.Router()
import article from '../../middleware/article'
router
    .get('/:slug', async (req, res) => {
        article.oneViewSlug(req.params.slug)
            .then(e => {
                console.log(e)
            })
        /*res.render(`theme/${config.theme}/article`, {
            title: 'login',
            article: data.article,
            meta: data.meta
        })*/
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