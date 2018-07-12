var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");

var SALT_FACTOR=10;

var zombieSchema = mongoose.Schema({
    username:{type: String,require: true,unique:true},
    password:{type:String,require:true},
    role:{type:String, require:true},
    createdat:{type:Date, default:Date.now},
    displayname:{type:String},
    bio:String,
   
});

var donothing=()=>{

}

zombieSchema.pre("save",function(done){
    var zombie = this;
    if(!zombie.isModified("password")){
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR,(err,salt)=>{
        if(err){
            return done(err);
        }
        bcrypt.hash(zombie.password,salt,donothing,(err,hashedpassword)=>{
            if(err){
                return done(err);
            }
            zombie.password = hashedpassword;
            done();
        });
    });
});

zombieSchema.methods.checkPassword =function(guess,done){
    bcrypt.compare(guess,this.password,function(err,isMatch){
        done(err,isMatch);
    });

}

zombieSchema.methods.name=function(){
    return this.displayname || this.username ;
}



var Zombies = mongoose.model("Zombie",zombieSchema);
module.exports = Zombies;