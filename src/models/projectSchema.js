import mongoose from "mongoose";
const { Schema, model } = mongoose

const projectSchema = new Schema({
    name: String,
    status: String,
    description: String,
    langs: [String],
    tasks: [String],
    githubLink: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const Project = model('Project', projectSchema)
export default Project