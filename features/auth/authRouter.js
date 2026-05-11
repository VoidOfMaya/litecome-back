import{Router} from 'express';
import { validate } from '../../validations/indexValidation.js';
import {controller} from './authControllers.js'
const authRouter = Router()
authRouter.post('/register', validate.NewAccount, controller.newUser);
authRouter.post('/login', validate.Login, controller.login)
//logout revokes token on backend, delets  access token from frontend
authRouter.post('/logout',controller.logout)
// renew tokens
authRouter.post('/refresh',controller.token)


export{
    authRouter
}