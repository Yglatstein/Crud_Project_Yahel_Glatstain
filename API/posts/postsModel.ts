import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
    },
    text: {
        type: String, 
        required: true, 
    },
    tag: {
        type: String, 
        required: true, 
    },
    userId: {
        type: String, 
        required: true, 
    }, 
});

const PostModel = mongoose.model('posts', PostSchema)

export default PostModel

