const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Destination=new Schema(
    {
        
        country:{type:String,required:true},
        name:{type:String,required:true},
        currency:{type:String,required:true},
        images:{type:String,required:true},
        description:{type:String,required:true},
        attractions:{type:String,required:true},
        languages:{type:String,required:true},
        
    },
    {timestamps:true},
);
 
module.exports=mongoose.model('Destination',Destination);
