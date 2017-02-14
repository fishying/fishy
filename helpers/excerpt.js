export default function (type, options) {
    let text = type.data.root.article[type.data.key].content 
        ? type.data.root.article[type.data.key].content.replace(/<.*?>/ig, '') 
        : type.hash.content.replace(/<.*?>/ig, '')
    
    let tailor = type.hash.tailor ? type.hash.tailor : 50
    let ellipsis = type.hash.tailor ? type.hash.tailor : '...'

    if (text.length <= tailor) {
        return text
    } else {
        return text
            .substr(0, tailor)
            .replace(/\n/ig, '') + ellipsis
    }
}