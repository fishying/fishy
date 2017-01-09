import article from '../api/article'

export default {
    create: async (req, res) => {
        let data = req.body
        article.create(data.data, data.tag)
    }
}