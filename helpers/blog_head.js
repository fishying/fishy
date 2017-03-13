export default function (type, options) {
    let description = type.data.exphbs.view === 'index'
        ? type.data.root.blog.description 
        : (
            type.data.exphbs.view === 'article'
            ? type.data.root.article.content.replace(/<.*?>/ig, '').substr(0, 60).replace(/\n/ig, '') + '...'
            : type.data.root.tag.description ? type.data.root.tag.description : type.data.root.tag.name
        )
    return `
        <meta name="description" content="${description}"/>
        <meta name="keywords" content="${type.data.root.blog.keywords ? type.data.root.blog.keywords : ''}"/>
    `
}