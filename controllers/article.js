import article from '../api/article'

export default {
    create: async (req, res) => {
        let data = req.body
        article.create(data.data, data.tag)
            .then(ctx => {
                res.json({
                    success: true,
                    message: ctx.msg,
                    data: ctx.data
                })
            })
            .catch(msg => {
                res.json({
                    success: false,
                    message: msg || '出错啦'
                })
            })
    }
}