import express from 'express'
import { GetPost, newPost } from '../../process'

const router = express.Router()

router
    .get('/post', async (req, res) => {
        let limit = req.query.limit
        let page = req.query.page
        try {
            let data = await GetPost.all(limit, page)
            return req.cute.ok({
                message: '文章查询成功',
                post: data.post,
                meta: data.meta
            })
        } catch (error) {
            return req.cute.error(400, {
                message: '出错',
                data: error
            })
        }
    })
    .get('/post/:id', async (req, res) => {
        let limit = req.params.id
        try {
            let data = await GetPost.onId(limit)
            return req.cute.ok({
                message: '文章查询成功',
                post: data.post,
                meta: data.meta
            })
        } catch (error) {
            return req.cute.error(400, {
                message: '出错',
                data: error
            })
        }
    })
    .post('/post', async (req, res) => {
        let post = req.body.post
        try {
            let data = await newPost(post)
            return req.cute.ok({
                message: '文章查询成功',
                post: data.post,
                meta: data.meta
            })
        } catch (error) {
            return req.cute.error(400, {
                message: '出错',
                data: error
            })
        }
    })

export default router