const express=require('express')
const auth = require("../middleware/auth");
const router=express.Router()
const{Tget,Tpost,Tupdate,Tdelete}=require('../controller/todo_controller')
router.use(auth)
router.get('/',Tget)
router.post('/',Tpost)
router.put('/:id',Tupdate)
router.delete('/:id',Tdelete)
module.exports=router