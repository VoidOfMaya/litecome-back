import { Router } from "express";
import { controller } from "./channelController.js";
import { validate } from "./channelValidation.js";
import { authorize } from './premissions.js'

const channelRouter = Router({mergeParams: true});
//premissions
//authenticated only
channelRouter.get('/info',controller.getChannelInfo)
channelRouter.post('/new',validate.newChannel,controller.createNewChannel)

//members only
channelRouter.get('/' ,authorize.member ,controller.getDmChannel)
channelRouter.put('/leave',authorize.member,controller.leaveChannel)
//mod only
channelRouter.get('/',authorize.mod,)




export{
    channelRouter
}