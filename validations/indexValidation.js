import { body,param } from 'express-validator';

const NewAccount =[
    body('email').trim().notEmpty().withMessage('Email is a required field')
                 .isEmail().withMessage('Please provide a valid email address')
                 .normalizeEmail(),

    body('name').trim().notEmpty().withMessage('first name is required')
                     .matches(/^[A-Za-z\s'-]+$/).withMessage('can only contain letters, spaces, hyphens, apostrophes')
                     .isLength({min: 3, max: 25}).withMessage('range must be between 3- 12 characters'),

    body('password').trim().notEmpty().withMessage('password is required')
                    .isLength({min:8}).withMessage('password must atleast be 8 letters')
                    .matches(/^[A-Za-z0-9\s.,!?@#$_-]+$/).withMessage('can only contain letters'),
    //validates confirmpasswored against password
    body('confirmPassword').trim().notEmpty().withMessage('password is required')
        .custom((password, {req}) =>{
            const ogPass = req.body.password
            if(password !== ogPass){
                throw new Error('passwords do not match');
            }
            return true;
    })
]
const Login =[
    body('email').trim().notEmpty().withMessage('Email is a required field')
                 .isEmail().withMessage('Please provide a valid email address')
                 .normalizeEmail(),

    body('password').trim().notEmpty().withMessage('password is required')
            .isLength({min:8}).withMessage('password must atleast be 8 letters')
            .matches(/^[A-Za-z0-9\s.,!?@#$_-]+$/).withMessage('can only contain letters, numbers, hyphens, apostrophes'),
]
const userEdit = [
    body('name').trim().isLength({max:25, min: 3}).withMessage('name must be 3 - 25 characters in length')
    .matches(/^[a-zA-Z ]+$/).withMessage('name can have letters and spaces'),
    body('bio').trim().isLength({max:250}).withMessage('bio limit is 250 characters in length')
    .matches(/^[a-zA-Z0-9 ]+$/).withMessage('bio can only be letters, spaces and numbers'),
    body('photo').trim()
]
const userId =[
    param('id').trim().notEmpty().withMessage('no user id provided')
    .toInt().withMessage('id must be a number')
]

const validate ={
    NewAccount,
    Login,
    userId,
    userEdit
}

export{
    validate
}