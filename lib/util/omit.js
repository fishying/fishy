export default function (arr, data) {
    let newData = {}
    arr.forEach(type => {
        if (data[type]) {
            newData[type] = data[type]
        }
    })
    return newData
}