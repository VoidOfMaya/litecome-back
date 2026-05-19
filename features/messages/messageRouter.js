import { Router } from "express"
import { controller } from "./messagesController.js";
import { validate } from "./messageValidation.js";
// member authorization happens on parent channel router
const messsageRouter = Router({mergeParams: true});//channelId should be an available  parameter
/*
required: routes:-
     [SORTS BY DATE]
        []createMsg(is reply if og msg id provided)
        []editMsg
        []deleteMsg > author and mod only
*/
messsageRouter.get('/',controller.getChatLog)
messsageRouter.post('/',validate.message, controller.submitMessage)
export{
    messsageRouter
}