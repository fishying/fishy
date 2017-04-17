export default function (arr, data) {
    let newData = {}
    arr.forEach(type => {
        if (data[type] !== undefined || data[type] !== null) {
            newData[type] = data[type]
        }
    })
    return newData
}