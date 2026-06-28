const { text } = require('express')
const mongoose =require('mongoose')
const todo_schema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:true,
        },
        title:{
            type:String,
            required:[true,'Enter a title'],
            trim:true,
        },
        completed:{
            type:Boolean,
            default:false,
        }
    },{
        versionKey:false,
        timestamps:true,
    }
)
module.exports=mongoose.model('todo',todo_schema)