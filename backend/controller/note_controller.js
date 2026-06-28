const note=require('../models/Note_model')
const Nget=async(req,res)=>{
    try{
        const notes=await note.find().sort({createdAt:-1})
        res.json(notes)
    }
    catch(err){
        res.json(err.message)
    }
}
const Npost=async(req,res)=>{
    try{
        const user=req.user.id
        const {title,content}=req.body
        if(!title||!content){
            return res.json({message:"fill required field"})
        }
        const newNote=await note.create({user,title,content})
        res.json(newNote)
    }
    catch(err){
        res.json(err.message)
    }
}
const Nupdate=async(req,res)=>{
    try{
        const user=req.user.id
        const {id}=req.params
        const {title,content}=req.body
        const updatedNote=await note.findByIdAndUpdate(id,{title,content},{new:true})
        res.json(updatedNote)
    }
    catch(err){
        res.json(err.message)
    }
}
const Ndelete=async(req,res)=>{
    try{
        const {id}=req.params
        const deletedNote=await note.findByIdAndDelete(id)
        res.json(deletedNote)
    }
    catch(err){
        res.json(err.message)
    }
}
const Ntoggle=async(req,res)=>{
    const {id}=req.params;
    try{
        const noteItem=await note.findById(id);
        if (!noteItem) {
            return res.json({ message: 'Note not found or unauthorized' });
        }
        noteItem.isPinned=!noteItem.isPinned;
        await noteItem.save();
        res.json(noteItem); 
    }catch(error){
        console.error(error);
        res.json({ message: 'Server error' });
    }
};

module.exports={Nget,Npost,Nupdate,Ndelete,Ntoggle}