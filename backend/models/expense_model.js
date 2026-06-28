const mongoose=require('mongoose')
const expense_schema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:true,
        },
        title:{
            type:String,
            required:[true,"Enter a title"],
            trim:true,
        },
        amount:{
            type:Number,
            required:[true,"Enter a amount"],
            min:[0,"valid amount"],
        },
    },{
        versionKey:false,
        timestamps:true,
    }
)
module.exports=mongoose.model('expense',expense_schema)