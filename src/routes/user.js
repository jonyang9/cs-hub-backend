import express from 'express'
import authenticateToken from '../middlewares/authentication'

// project and job application validators

import Project from '../models/projectSchema'
import Job from '../models/jobSchema'

const router = express.Router()

router.get('/users/projects', authenticateToken, async (req, res) => {
    const userId = req.userId

    try {
        const projects = await Project.find({user: userId})
        res.status(200).json(projects)
    } catch (err) {
        res.status(500).json({ message: "Server error fetching projects" })
    }
})

router.get('/users/jobs', authenticateToken, async (req, res) => {
    const userId = req.userId

    try {
        const jobs = await Job.find({user: userId})
        res.status(200).json(jobs)
    } catch (err) {
        res.status(500).json({ message: "Server error fetching jobs" })
    }
})