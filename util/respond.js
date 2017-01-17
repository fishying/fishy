
function err (res, status) {
    if (status instanceof Array) {
        res.json(status[0], status[1])
    } else if (status instanceof Object) {
        res.json(400, status)
    } else {
        console.log(status)
        res.json(400, {message: status})
    }
}

function suc (res, status) {
    res.json(status)
}

export default (res, status, success) => {
    res.format({
        json: () => {
            success ? suc(res, status) : err(res, status)
        }
    })
}