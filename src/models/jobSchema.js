import mongoose from "mongoose";
const { Schema, model } = mongoose

const jobSchema = new mongoose.Schema({
    company: { type: String, required: true },
    status: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: String, required: true },
    duration: { type: String, required: true },
    deadline: { type: String, required: true },
    dateApplied: { type: String, required: true },
    interviewDate: { type: String, required: true },
    applicationLink: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


const Job = model('Job', jobSchema)
export default Job

