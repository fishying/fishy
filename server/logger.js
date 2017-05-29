import log4js from 'log4js'

log4js.configure({
    appenders: [
        {
            type: 'console'
        }
    ],
    replaceConsole: true
})

log4js.loadAppender('file')

if (!process.env.NODE_ENV === 'production') {
    log4js.addAppender(log4js.appenders.file('logger/cheese.log'), [ 'cheese','console' ])
}

var logger = log4js.getLogger('cheese')

logger.setLevel('ERROR')
