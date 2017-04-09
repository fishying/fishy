import pinyin from 'pinyin'
export default async function slug (slug) {
    return pinyin(slug, {
        style: pinyin.STYLE_NORMAL
    }).join('-')
}