import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Define validation rules
export const userValidationRules = [
    body('fname')
        .isString()
        .notEmpty()
        .withMessage('Missing user data. First name must be a non-empty string'),
    body('lname')
        .isString()
        .notEmpty()
        .withMessage('Missing user data. Last name must be a non-empty string'),
];

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    console.log("Validation Middleware Executing:");

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ message: errors.array()[0].msg }); 
        return; 
    }
    next(); 
};
