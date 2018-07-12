
var mongoose = require("mongoose");



var armasSchema = mongoose.Schema({
    descripcion:{type: String,require:true},
    categoria:{type:String,require:true},
    fuerza:{type:Number,require:true},
    municiones:{type:Boolean,require:true}
});

var Armas= mongoose.model("Arma",armasSchema);
module.exports = Armas;