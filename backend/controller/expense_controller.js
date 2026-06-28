const expense=require('../models/expense_model')
const Eget=async(req,res)=>{
    try{
        const expenses=await expense.find().sort({createdAt:-1})
        res.json(expenses)
    }
    catch(err){
        res.json(err.message)
    }
}
const Epost=async(req,res)=>{
    try{
        const user=req.user.id
        const {title,amount}=req.body
        if (!title || amount === undefined){
            return res.json({message:"enter a required field"})
        }
        const expensed=await expense.create({user,title,amount})
        res.json(expensed)
    }
   catch(err){
        res.json(err.message)
    }
}
const Edelete=async(req,res)=>{
    try{
        const {id}=req.params
        const expensed=await expense.findByIdAndDelete(id)
        if(!expensed){
            return res.json({message:"expense not found"})
        }
        res.json(expensed)
    }
    catch(err){
        res.json(err.message)
    }
}

module.exports={Eget,Epost,Edelete}