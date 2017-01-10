import pinyin from 'pinyin'

export default async function slug (slug, name) {
    if (!slug || slug === '') {
        return pinyin(name, {
            style: pinyin.STYLE_NORMAL
        }).join('-')
    } else {
        return slug
    }
}