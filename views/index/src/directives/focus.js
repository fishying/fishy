export default {
    inserted: function (el, binding, vnode) {
        el.addEventListener("focus", function(){
            vnode.context[binding.expression]()
        })
    }
}