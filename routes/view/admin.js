import express from 'express'
const router = express.Router()

router.get('*', async (req, res) => {
    let app = req.app
    if (!req.user) {
        return res.redirect('/login')
    }
    app.use(express.static(app.get('admin_views')))
    return res.sendFile('/', { root: app.get('admin_views') })
})

export default router