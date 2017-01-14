
function err (res, status) {
    if (status instanceof Array) {
        res.json(status[0], status[1])
    } else {
        res.json(400, status)
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