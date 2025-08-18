import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
  links: {
    website: String,
    github: String,
    discord: String
  }
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export default Project;
