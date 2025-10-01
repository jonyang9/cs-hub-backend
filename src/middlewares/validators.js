import { body, validationResult } from "express-validator";

export const signupValidator = [
    body("username")
        .trim()
        .notEmpty().withMessage("No username provided")
        .isLength({min: 3}).withMessage("Username must be at least 3 characters long"),

    body("email")
        .trim()
        .notEmpty().withMessage("No email provided")
        .isEmail().withMessage("Email must be valid")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({min: 8}).withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number"),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }
]

