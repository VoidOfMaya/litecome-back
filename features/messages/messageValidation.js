import { body,param } from 'express-validator';

const createMessage =[
    body('content').trim().notEmpty().withMessage("no message provided!")
    .isString().isLength({min: 1, max: 750}).withMessage("message length out of range!"),
    body('parentId').optional({values: 'falsy'})
    .isInt().withMessage('parent id must be an integed if provided')
    .toInt()
]
const editMessage =[
    body('content').trim().notEmpty().withMessage("no message provided!")
    .isString().isLength({min: 1, max: 750}).withMessage("message length out of range!"),
    body('id').isInt().toInt().withMessage('parent id must be an integed if provided')
]
const messageId = [
        body('id').isInt().toInt().withMessage('parent id must be an integed if provided')
]
const validate ={
    createMessage,
    editMessage,
    messageId
}

export{
    validate
}