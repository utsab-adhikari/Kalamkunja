import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  features: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feature' }]
}, { timestamps: true });

const Topic = mongoose.models.Topic || mongoose.model('Topic', topicSchema);
export default Topic;
