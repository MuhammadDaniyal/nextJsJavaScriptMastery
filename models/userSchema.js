import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, "Email already exists!"],
        required: [true, "Email is required!"]
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
    },
    image: {
        type: String,
    }
})

// in nextjs route is being created and running for the time when it is getting called 
// first look if exists the model and if not exist then create a modal because this route called every time and connection is established every single time from scratch  
const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User