import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
    },
    description: {
        type: String,
    }
}, {timestamps: true});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema, "categories");

export default Category;