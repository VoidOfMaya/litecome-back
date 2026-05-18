import { Router } from "express"

const messsageRouter = Router();

messsageRouter.get('/chatLog', async (req, res) =>{
    res.status(200).json({msg: 'message router accessed '})
})

export{
    messsageRouter
}