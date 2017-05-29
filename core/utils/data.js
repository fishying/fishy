export function filterObj (obj, arr) {
    obj = Object.create(obj)
    let newObj = {}
    arr.forEach(type => {
        newObj[type] = obj[type] || null
    })
    return newObj
}
export function githubInfoFoLocal (data) {
    let newData = {}
    Object.keys(data)
        .forEach(key => {
            if (key === 'login') {
                newData.username = data[key]
            } else if (key === 'avatarUrl') {
                newData.avatar = data[key]
            } else if (key === 'email') {
                newData.email = data[key]
            } else if (key === 'bio') {
                newData.description = data[key]
            } else if (key === 'websiteUrl') {
                newData.website = data[key]
            } else if (key === 'name') {
                newData.nickname = data[key]
            } else {
                return
            }
        })
    return newData
}