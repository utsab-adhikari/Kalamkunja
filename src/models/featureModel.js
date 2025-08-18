import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true }
}, { timestamps: true });

const Feature = mongoose.models.Feature || mongoose.model('Feature', featureSchema);

export default Feature;
