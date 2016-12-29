export default (app) => {
    app
        .get('/', async (req, res, next) => {
            next()
        }, async (req, res) => {
            res.render('index')
        })
}