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

// Custom CORS middleware to handle preflight OPTIONS requests for all origins & routes
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use(cors())
app.use(express.json())

const expense=require('./routes/expense_router')
const note=require('./routes/note_router')
const todo=require('./routes/todo_router')
const auth=require('./routes/login_routes')

// Primary API routes
app.use('/api/expense',expense)
app.use('/api/note',note)
app.use('/api/todo',todo)
app.use('/api/auth',auth)

// Route aliases to support /auth/signup, /auth/login, etc. directly
app.use('/expense',expense)
app.use('/note',note)
app.use('/todo',todo)
app.use('/auth',auth)

const MONGO_URI = process.env.MONGO_URI;
const PORT=process.env.PORT||5000

app.get("/",(req,res)=>{
    res.json({message:"app is running harsha"})
})

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database connected successfully to MongoDB Atlas!");
    } catch (err) {
        console.warn("\n-----------------------------------------------------------");
        console.warn("WARNING: Primary MONGO_URI connection failed:", err.message);
        console.warn("Please update your MongoDB Atlas password in .env or MongoDB Atlas dashboard.");
        console.warn("-----------------------------------------------------------\n");

        if (process.env.NODE_ENV !== 'production') {
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
        } else {
            process.exit(1);
        }
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

connectDB();