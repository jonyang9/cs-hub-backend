import express from 'express'
import authenticateToken from '../middlewares/authentication'

// project and job application validators

import Project from '../models/projectSchema'
import Job from '../models/jobSchema'
import { projectValidator, jobValidator } from '../middlewares/validators'

const router = express.Router()

router.get('/projects', authenticateToken, async (req, res) => {
    const userId = req.userId

    try {
        const projects = await Project.find({user: userId})
        res.status(200).json(projects)
    } catch (err) {
        res.status(500).json({ message: "Server error fetching projects" })
    }
})

router.get('/jobs', authenticateToken, async (req, res) => {
    const userId = req.userId

    try {
        const jobs = await Job.find({user: userId})
        res.status(200).json(jobs)
    } catch (err) {
        res.status(500).json({ message: "Server error fetching jobs" })
    }
})

router.post('/projects', authenticateToken, projectValidator, async (req, res) => {
    const userId = req.userId
    try {
        const project = await Project.create({...req.body, user: userId})
        res.status(201).json(project)
    } catch (err) {
        res.status(500).json({ message: "Server error adding project to database" })
    }
})

router.post('/jobs', authenticateToken, jobValidator, async (req, res) => {
    const userId = req.userId
    // express validate the body
    try {
        const job = await Job.create({...req.body, user: userId})
        res.status(201).json(job)
    } catch (err) {
        res.status(500).json({ message: "Server error adding job to database" })
    }
})

export default router