const express=require('express')
const router=express.Router()
const auth = require("../middleware/auth");
const{Eget,Epost,Edelete}=require('../controller/expense_controller')
router.use(auth)
router.get('/',Eget)
router.post('/',Epost)
router.delete('/:id',Edelete)
module.exports=router