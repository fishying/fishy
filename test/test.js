import test from 'ava'
import superkoa from 'superkoa'

test.cb('first test', t => {
  superkoa('./app.js')
    .get('/logon')
    .expect(200, function (err, res) {
        t.ifError(err)
        var userId = res.body.id;
        t.is(res.text, 'Hello Koa', 'res.text == Hello Koa')
        t.end()
    })
})