import express from 'express'
import { article } from '../../api'

const router = express.Router()
router
    .get('/', async (req, res) => {
        let data = await article.GetAll()

        if (!res.locals.blog) return res.redirect('/install')

        return res.render('index', {
            title: `${res.locals.blog.title} - ${res.locals.blog.description}`,
            article: data.article,
            meta: data.meta,
            bodyClass: 'home-template'
        })
    })
    .get('/page', async (req, res) => {
        return res.redirect('/')
    })
    .get('/page/:page', async (req, res) => {
        let page = req.params.page
        
        if (!res.locals.blog) return res.redirect('/install')

        if (page === null || page === undefined || page === 1) {
            return res.redirect('/')
        }

        let data = await article.GetAll(null, page)
        if (!data.article) {
            return res.redirect('/404')
        }

        res.render('index', {
            title: `${res.locals.blog.title} - ${res.locals.blog.description}`,
            article: data.article,
            meta: data.meta,
            bodyClass: 'article-template'
        })

    })
    .get('/:slug', async (req, res) => {
        
        if (!res.locals.blog) return res.redirect('/install')

        let data = await article.GetOneSlug(req.params.slug)
        if (!data.article) {
            return res.redirect('/404')
        }
        res.render('article', {
            title: `${data.article.title} - ${res.locals.blog.title}`,
            article: data.article,
            meta: data.meta,
            bodyClass: 'article-template'
        })
    })

export default router