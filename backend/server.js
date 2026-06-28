const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config()
const app=express();

app.use(cors())
app.use(express.json())

const expense=require('./routes/expense_router')
const note=require('./routes/note_router')
const todo=require('./routes/todo_router')
const auth=require('./routes/login_routes')

app.use('/api/expense',expense)
app.use('/api/note',note)
app.use('/api/todo',todo)
app.use('/api/auth',auth)

const MANGO=process.env.MANGO
const PORT=process.env.PORT

app.get("/",(req,res)=>{
    res.json({message:"app is running harsha"})
})

mongoose.connect(MANGO)
.then(()=>{
    console.log("server connected");
    app.listen(PORT,()=>{
        console.log("app is running");
    })
})
.catch((err)=>{
    console.log("failed");
})