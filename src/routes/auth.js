import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

import { signupValidator, loginValidator } from '../middlewares/validators.js';

import User from '../models/userSchema.js'

const router = express.Router()

router.post('/signup', signupValidator, async (req, res) => {
    try {
        const { username, email, password } = req.body

        const user = await User.findOne({email})
        if (user) return res.status(409).json({
            success: false,
            data: null,
            message: 'User already exists!'
        });
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.status(201).json({ 
            success: true,
            data: {token: token} ,
            message: 'User signed up successfully!'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Unexpected server error!'
        })
    }
})

router.post('/login', loginValidator, async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({email})
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                data: null,
                message: 'Invalid email or password'
        });
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.status(200).json({
            success: true,
            data: {token: token},
            message: 'Successfully logged in!'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Unexpected server error!'
        })
    }
})

export default router