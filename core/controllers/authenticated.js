import respond from '../middleware/respond'

export const authenticated = async (req, res) => {
    let redirect_uri = req.query.redirect_uri
    if (req.redisId && req.cookies['connect.rid']) {
        return res.redirect(`${redirect_uri}?rid=${req.cookies['connect.rid']}`)
    }
}
