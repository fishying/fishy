export async function anonymous (req, res, next) {
    if (req.redis.isAuthenticated) {
        return res.redirect('/')
    } else {
        next()
    }
}
export async function authenticated (req, res, next) {
    if (!req.redis.isAuthenticated) {
        return res.redirect('/signin')
    } else {
        next()
    }
}
