import { article } from '../models'

export default {
    create: async (data) => {
        let a = await article.findOrCreate({title: 'asdf'})
                    .then(data => {
                        console.log(data)
                    })
        return a
    }
}