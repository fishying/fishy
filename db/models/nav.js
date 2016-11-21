let mongoose = require("../db");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

let navSchema = new Schema ({
    list:{
        type:Array
    }
})

let nav = mongoose.model("nav", navSchema);

nav.findNavList = () => {
    return nav.findOne()
    .select("navlist")
    .exec()
}
nav.findNavUp = () => {
    return nav.findOne()
    .select("navlist")
    .exec()
}
nav.addFindNav = (data) => {
    return nav.create(data)
}
module.exports = nav