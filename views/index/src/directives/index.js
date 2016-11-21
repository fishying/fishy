import focus from "./focus"


const install = (Vue) => {
    Vue.directive("focus", focus)
}
export default install