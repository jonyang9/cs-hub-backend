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
            return res.status(400).json({
                success: false,
                data: { errors: errors.array() },
                message: 'Signup validation failed!'
            })
        }
        next()
    }
]

export const loginValidator = [
    body("email")
        .isEmail().withMessage("Invalid email"),

    body("password")
        .notEmpty().withMessage("Password is required"),
    
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                data: { errors: errors.array() },
                message: 'Login validation failed! '
            })
        }
        next()
    }
]

export const projectValidator = [
    body("name")
        .trim()
        .notEmpty().withMessage("Project name cannot be empty"),

    body("description")
        .trim()
        .escape(),

    body('langs.*')
        .trim()
        .escape(),

    body('tasks.*')
        .trim()
        .escape(),

    body('githubLink')
        .trim()
        .isURL().withMessage('GitHub link must be a valid url'),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        next()
    }
]

export const jobValidator = [
    body("company")
        .trim()
        .notEmpty().withMessage("Company cannot be empty"),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        next()
    }
]

