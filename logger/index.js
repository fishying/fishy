var log4js = require('log4js')
log4js.configure({
    appenders: [
        {
            type: 'file',
            filename: 'logger/cheese.log',
            category: [ 'cheese','console' ]
        },
        {
            type: 'console'
        }
    ],
    replaceConsole: true
})

log4js.loadAppender('file')
log4js.addAppender(log4js.appenders.file('logger/pants.log'), 'pants')



var logger = log4js.getLogger('cheese')

logger.setLevel('ERROR')