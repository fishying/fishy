import article from '../api/article'

export default {
    add: async (req, res) => {
        let data = req.body
        article.create(data)
    }
}