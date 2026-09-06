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

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database connected successfully");
    } catch (err) {
        console.warn("\n-----------------------------------------------------------");
        console.warn("WARNING: Primary MONGO_URI connection failed:", err.message);
        console.warn("Please check your MongoDB Atlas username/password in .env");
        console.warn("-----------------------------------------------------------\n");

        const fallbackUri = "mongodb://127.0.0.1:27017/mydatabase";
        if (MONGO_URI !== fallbackUri) {
            console.log("Attempting fallback connection to local MongoDB (mongodb://127.0.0.1:27017/mydatabase)...");
            try {
                await mongoose.connect(fallbackUri);
                console.log("Connected to local MongoDB successfully!");
            } catch (fallbackErr) {
                console.error("CRITICAL ERROR: Failed to connect to local MongoDB:", fallbackErr.message);
                process.exit(1);
            }
        } else {
            process.exit(1);
        }
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

connectDB();