const mongoose=require('mongoose')
const note_schema=new mongoose.Schema(
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
        content:{
            type:String,
            required:[true,'Enter a content'],
        },
        isPinned:{
            type:Boolean,
            default:false,
        }
    },{
        versionKey:false,
        timestamps:true
    }
)
module.exports=mongoose.model('note',note_schema)