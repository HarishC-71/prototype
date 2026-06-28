const todo=require('../models/todo_model')
const Tget=async(req,res)=>{
    try{
        const task=await todo.find().sort({createdAt:-1})
        res.json(task)
    }
    catch(err){
        res.json(err.message)
    }
}
const Tpost=async(req,res)=>{
    try{
        const user=req.user.id
        const {title,completed}=req.body
        if(!title){
            return res.json({message:"fill required field"})
        }
        const newTask=await todo.create({user,title,completed})
        res.json(newTask)
    }
    catch(err){
        res.json(err.message)
    }
}
const Tupdate=async(req,res)=>{
    try{
        const {id}=req.params
        const {title,completed}=req.body
        const updatedTask=await todo.findByIdAndUpdate(id, {title,completed}, {new:true})
        res.json(updatedTask)
    }
    catch(err){
        res.json(err.message)
    }
}
const Tdelete=async(req,res)=>{
    try{
        const {id}=req.params
        const deletedTask=await todo.findByIdAndDelete(id)
        res.json(deletedTask)
    }
    catch(err){
        res.json(err.message)
    }
}
module.exports={Tget,Tpost,Tupdate,Tdelete}