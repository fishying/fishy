import excerpt from './excerpt'
import date from './date'

export default function (hbs) {
    hbs.registerHelper('excerpt', excerpt)
    hbs.registerHelper('date', date)
    // hbs.registerHelper('blog', blog)
}