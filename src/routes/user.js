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
    try {
        const job = await Job.create({...req.body, user: userId})
        res.status(201).json(job)
    } catch (err) {
        res.status(500).json({ message: "Server error adding job to database" })
    }
})

router.patch('/projects/:id', authenticateToken, async (req, res) => {
    const projectId = req.params.id
    const userId = req.userId
    const updates = req.body

    const allowedUpdates = ['name', 'status', 'description', 'langs', 'tasks', 'githubLink'];
    const filteredUpdates = {};
    for (const key of allowedUpdates) {
        if (req.body[key] !== undefined) filteredUpdates[key] = req.body[key];
}
    try {
        const updatedProject = await Project.findOneAndUpdate(
            {
                _id: projectId,
                user: userId
            }, 
            filteredUpdates, 
            {
                new: true,
                runValidators: true
        })

        if (!updatedProject) 
            return res.status(404).json({ message: 'Project not found' })
        res.status(200).json(updatedProject)
    } catch (err) {
        res.status(400).json({ message: 'Failed to update project' })
    }
})

router.patch('/jobs/:id', authenticateToken, async (req, res) => {
    const jobId = req.params.id
    const userId = req.userId
    const updates = req.body

    const allowedUpdates = [
        'company',
        'status',
        'position',
        'location',
        'startDate',
        'duration',
        'deadline',
        'dateApplied',
        'interviewDate',
        'applicationLink'
    ];
    const filteredUpdates = {};
    for (const key of allowedUpdates) {
        if (updates[key] !== undefined) filteredUpdates[key] = updates[key];
    }

    try {
        const updatedJob = await Job.findOneAndUpdate(
            {
                _id: jobId,
                user: userId
            }, 
            filteredUpdates, 
            {
                new: true,
                runValidators: true
        })

        if (!updatedJob) 
            return res.status(404).json({ message: 'Job not found' })
        res.status(200).json(updatedJob)
    } catch (err) {
        res.status(400).json({ message: 'Failed to update job' })
    }
})

router.delete('/projects/:id', authenticateToken, async (req, res) => {
    const projectId = req.params.id
    const userId = req.userId

    try {
        const deletedProject = await Project.findOneAndDelete({
            _id: projectId,
            user: userId
        })

        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found or authorized' })
        }

        res.status(200).json({ message: 'Project deleted successfully' })
    } catch (err) {
        res.status(500).json({ message: 'Server error deleting project' })
    }
})

router.delete('/jobs/:id', authenticateToken, async (req, res) => {
    const jobId = req.params.id
    const userId = req.userId

    try {
        const deletedJob = await Job.findOneAndDelete({
            _id: jobId,
            user: userId
        })

        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found or authorized' })
        }

        res.status(200).json({ message: 'Job deleted successfully' })
    } catch (err) {
        res.status(500).json({ message: 'Server error deleting job' })
    }
})



export default router