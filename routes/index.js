export default (app) => {
    app
        .get('/', async (req, res, next) => {
            next()
        }, async (req, res) => {
            console.log(1)
            res.json({
                data: 'asdfs'
            })
        })
}