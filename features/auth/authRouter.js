import{Router} from 'express';
import { validateLogin,validateNewAccount } from '../../validations/indexValidation.js';
import {newUserController, loginController, tokenController} from './authControllers.js'
const authRouter = Router()
authRouter.post('/register', validateNewAccount, newUserController);
authRouter.post('/login', validateLogin, loginController)
// renew tokens
authRouter.post('/refresh',tokenController)

export{
    authRouter
}