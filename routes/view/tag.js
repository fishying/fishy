import express from 'express'
import { tag } from '../../api'
const router = express.Router()

router
    .get('/tag/:slug', async (req, res) => {
        let data = await tag.GetOneSlug(req.params.slug)
        if (!res.locals.blog) return res.redirect('/install')
        res.render('tag', {
            title: `${data.tag.name} - ${res.locals.blog.title}`,
            tag: data.tag,
            article: data.tag.article,
            meta: data.meta,
            bodyClass: 'tag-template'
        })
    })

export default router