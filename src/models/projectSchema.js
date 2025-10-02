import mongoose from "mongoose";
const { Schema, model } = mongoose

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
    langs: { type: [String], required: true },
    tasks: { type: [String], required: true },
    githubLink: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


const Project = model('Project', projectSchema)
export default Project