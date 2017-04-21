export default function (type, options) {
    let description
    if (type.data.exphbs.view == '404' || type.data.exphbs.view === 'index') {
        description = type.data.root.blog.description
    } else if (type.data.exphbs.view === 'article') {
        description = type.data.root.article.description || type.data.root.article.content.replace(/<.*?>/ig, '').substr(0, 60).replace(/\n/ig, '') + '...'
    } else if (type.data.exphbs.view === 'tag') {
        description = type.data.root.tag.description || type.data.root.tag.name
    }
    return `
        <meta name="description" content="${description}"/>
        <meta name="keywords" content="${type.data.root.blog.keywords ? type.data.root.blog.keywords : ''}"/>
    `
}