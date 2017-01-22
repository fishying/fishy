import respond from '../util/respond'
export default () => {
        article.update_verify(req.body)
            .then(() => {
                next()
            })
            .catch(msg => {
                respond(res, msg)
            })
}