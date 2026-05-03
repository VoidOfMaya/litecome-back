import { Router } from "express";
import bcrypt from 'bcryptjs';
const indexRouter = Router();

indexRouter.get('/',async (req, res)=>{
    console.log(`Index Router echo_status: success!`)
    const user = {id: 1, name: 'someName', email: 'example@gmail.com'}
    const tokenTest = await bcrypt.hash(`${user.id}&${user.name}`,10);
    res.status(200).json({message:`hashed value: ${tokenTest} of: ${user.id}&${user.name} `})
})

export{
    indexRouter
}