import { Router } from "express"
import { controller } from "./messagesController.js";
import { validate } from "./messageValidation.js";
import { authorize } from "./premissions.js";
// member authorization happens on parent channel router
const messsageRouter = Router({mergeParams: true});//channelId should be an available  parameter
/*
required: routes:-
     [SORTS BY DATE]
        []createMsg(is reply if og msg id provided)
        []editMsg
        []deleteMsg > author and mod only
*/
//author only

messsageRouter.get('/',controller.getChatLog)
messsageRouter.post('/',validate.createMessage, controller.submitMessage)
messsageRouter.put('/',validate.editMessage, authorize.author, controller.editMessage)
//mod or author only
messsageRouter.delete('/',validate.messageId ,authorize.deletePriv, controller.deleteMessage)
export{
    messsageRouter
}