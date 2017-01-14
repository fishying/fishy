import user from '../api/log'
import respond from '../util/respond'

export default {
    register: async (req, res) => {
        user.register(req.body.name, req.body.password, req.body.email)
            .then(msg => {
                return res.json({
                    success: true,
                    message: msg,
                })
            })
            .catch(msg => {
                respond(res, msg)
            })
    },
    login: async (req, res) => {
        user.login(req)
            .then(msg => {
                return res.json({
                    success: true,
                    message: msg,
                })
            })
            .catch(msg => {
                respond(res, msg)
            })
    },
}