import { Post } from '../models'

export const GetPost = {
    async all (limit, page) {
        limit = parseInt(limit) || 10
        page = parseInt(page) || 1
        let data = await Post
            .where({ enabled: true })
            .skip(limit*(page - 1))
            .limit(limit)
            .sort({ '_id': -1 })
            .lean()
            .exec()
        let count = await Post.count({ enabled: true })
        return {
            post: data,
            meta: {
                pagination: {
                    page: page,
                    limit: limit,
                    total: Math.ceil(count / limit) ? Math.ceil(count / limit) : 1
                },
                post: {
                    total: count
                }
            }
        }
    },
    async oneId (id) {
        let data = await Post
            .where({ _id: id })
            .where({ enabled: true })
            .exec()
        return data
    }
}

export const newPost = async (data) => {
    console.log(data)
}