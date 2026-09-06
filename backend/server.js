const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv')
const dns=require('dns')

// Set Google DNS to fix SRV lookup issues on Windows local environments
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
    // fallback if custom DNS set fails
}

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

const MONGO_URI = process.env.MONGO_URI;
const PORT=process.env.PORT||5000

app.get("/",(req,res)=>{
    res.json({message:"app is running harsha"})
})

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("CRITICAL ERROR:", err.message);
        process.exit(1);
    });