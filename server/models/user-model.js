const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const User=new Schema(
    {
        
        userName:{type:String,required:true,unique:true},
        email:{type:String,required:true},
        password:{type:String,required:true},
        role:{type:String,required:true}
    },
    {timestamps:true},
);

module.exports=mongoose.model('User',User);
