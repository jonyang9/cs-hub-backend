import express from 'express'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

import User from '../models/userSchema';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body

        const user = await User.findOne({email})
        if (user) return res.status(400).json({ message: 'User already exists!' });
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.status(201).json({ message: 'User created!', token: token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({email})
        if (!user) return res.status(400).json({ message: 'User email not found!' });

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) return res.status(401).json({ message: 'Incorrect password!' })

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.status(200).json({ message: 'Successfully logged in!', token: token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

export default router