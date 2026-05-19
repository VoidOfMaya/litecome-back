import { body,param } from 'express-validator';

const message =[
    body('content').trim().notEmpty().withMessage("no message provided!")
    .isString().isLength({min: 1, max: 750}).withMessage("message length out of range!"),
    body('parentId').optional({values: 'falsy'})
    .isInt().withMessage('parent id must be an integed if provided')
    .toInt()
]
const validate ={
    message,

}

export{
    validate
}