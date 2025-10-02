import mongoose from "mongoose";
const { Schema, model } = mongoose

const jobSchema = new Schema({
    company: String,
    status: String,
    position: String,
    location: String,
    startDate: String,
    duration: String,
    deadline: String,
    dateApplied: String,
    interviewDate: String,
    applicationLink: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const Job = model('Job', jobSchema)
export default Job

