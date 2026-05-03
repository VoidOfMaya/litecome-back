import { Router } from "express";

const indexRouter = Router();

indexRouter.get('/',async ()=>{
    console.log(`Index Router echo_status: success!`)
    const user = {id: 1, name: 'someName', email: 'example@gmail.com'}
    const tokenTest = await bcrypt.hash(`${user.id}&${user.name}`,10);
    console.log(`hashed value: ${tokenTest} of: ${user.id}&${user.name} `)
})

export{
    indexRouter
}