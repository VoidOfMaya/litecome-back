import { Router } from "express";

const indexRouter = Router();

indexRouter.get('/',()=>{
    console.log(`Index Router echo_status: success!`)
})

export{
    indexRouter
}