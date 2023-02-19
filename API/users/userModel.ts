import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique:true
    },
    password: {
        type: String, 
        required: true, 
    },
    name: {
        type: String, 
        required: true, 
        unique:true
    },
    image: {
        type: String, 
        required: true, 
    }
});

const UserModel = mongoose.model('users', UserSchema)

export default UserModel

