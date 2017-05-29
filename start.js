/**
 * Created by yuer on 2017/5/22.
 */
require('babel-core/register')(
    {
        presets: ['stage-3','es2015']
    }
)

require('babel-polyfill')

require('./app.js')
