import { body,param } from 'express-validator';

const newChannel = [
    body('name').notEmpty().withMessage('field is required')
    .matches(/^[a-zA-Z0-9 ]+$/).withMessage('group name can only use numbers/letters/spaces')
]
const relation = [
    body('relationId').trim().notEmpty().withMessage('RelationId must be defined')
        .isInt().toInt().withMessage('relationId must be an integer'),
]
const channel = [
    param('channelId').trim().notEmpty().withMessage('channelId must be defined')
        .isInt().toInt().withMessage('channelId must be an integer')
]
const validate ={
    newChannel,
    relation,
    channel
}

export{
    validate
}