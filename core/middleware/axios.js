/**
 * Created by yuer on 2017/5/27.
 */
import axios from 'axios'
axios.defaults.headers = {
    Accept: 'application/json'
}
axios.defaults.validateStatus = function (status) {
    return status < 500 || status === 404
}
axios.interceptors.response.use(async function (config) {
    if (config.status >= 400 && config.status !== 404) {
        return config.data
    } else if (config.status === 404) {
        return config
    } else {
        return config.data || config
    }
}, async function (e) {
    throw e
})
export default axios