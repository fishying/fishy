import express from 'express'
import config from '../../config.json'
import tag from '../../middleware/tag'
const router = express.Router()

router
    .get('/tag/:slug', async (req, res) => {
        await tag.oneViewSlug(req.params.slug)
            .then(e => {
                res.render(`theme/${config.theme}/tag`, {
                    title: e.name,
                    info: e.tag,
                    article: e.tag.article,
                    meta: e.meta
                })
            })
    })

export default router