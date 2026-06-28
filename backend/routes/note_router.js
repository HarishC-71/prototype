const express=require('express')
const router=express.Router();
const auth = require("../middleware/auth");
const {Nget,Npost,Nupdate,Ndelete,Ntoggle}=require('../controller/note_controller')
router.use(auth)
router.get('/',Nget)
router.post('/',Npost)
router.put('/:id',Nupdate)
router.put('/:id/toggle',Ntoggle)
router.delete('/:id',Ndelete)
module.exports=router