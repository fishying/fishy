import express from 'express'
import { tag } from '../../api'
const router = express.Router()

router
    .get('/tag/:slug', async (req, res) => {
        console.log(1)
        let data = await tag.oneSlug(req.params.slug)
        console.log(data)
        res.render('tag', {
            title: data.name,
            info: data.tag,
            article: data.tag.article,
            meta: data.meta,
            bodyClass: 'tag-template'
        }).end()
    })

export default router