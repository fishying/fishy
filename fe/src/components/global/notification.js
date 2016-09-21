import notification from "../notification"

export default (Vue, $root) => {
    Vue.set($root, "GLOBAL_NOTIFICATION",[])

    Vue.component("notification", notification)

    Vue.prototype.$Notification = {
        remove(el, time){
            setTimeout(function(){
                $root.GLOBAL_NOTIFICATION.$remove(el)
            }, time)
        },
        create(obj) {
            $root.GLOBAL_NOTIFICATION.push(obj)
            if(obj.time){
                this.remove(obj, obj.time)
            }
        },
        success(obj){
            obj.type = "success"
            this.create(obj)
        },
        info(obj){
            obj.type = "info"
            this.create(obj)
        },
        warning(obj){
            obj.type = "warning"
            this.create(obj)
        },
        danger(obj){
            obj.type = "danger"
            this.create(obj)
        },
    }
}