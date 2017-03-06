export default function (type, options) {
    let data = options.data.root.meta
    let news = {}
    news.nextPage = parseInt(data.pagination.page) + 1,
    news.prevPage = parseInt(data.pagination.page) - 1,
    news.next = data.pagination.total > data.pagination.page ? true : false,
    news.prev = data.pagination.page > 1 ? true : false,
    news.page = data.pagination.page,
    news.limit = data.pagination.limit,
    news.total = data.pagination.total,
    news.count = data.article.total
    
    return options.fn(news)
}