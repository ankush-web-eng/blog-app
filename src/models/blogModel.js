import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    blog:{
        type: String,
        required: true
    }
}, {timestamps:true})

const Blog = mongoose.models.blogs || mongoose.model("blogs", blogSchema)

export default Blog