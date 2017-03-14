import log4js from 'log4js'

log4js.configure({
    appenders: [{
        type: 'console'
    }, {
        type: 'file',
        filename: 'log/error.log',
        category: 'cheese'
    }]
})

var logger = log4js.getLogger('cheese')
logger.setLevel('ERROR')
export default logger