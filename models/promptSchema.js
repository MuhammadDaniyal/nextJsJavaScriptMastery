import mongoose from "mongoose";


const promptSchema = new mongoose.Schema({
    // we want to specify the creator of a specific prompt, 
    // creator is going to be document from the database
    creator: {
        type: mongoose.Schema.Types.ObjectId, // yeh as a foriegn key banjaegi smjho to, creator (user model) ka specific data bh get krskogy 
        ref: 'User' // one-to-many relationship, one user have many prompts
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required!'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required!'],
    }
})

// in nextjs route is being created and running for the time when it is getting called 
// first look if exists the model and if not exist then create a modal because this route called every time and connection is established every single time from scratch  
const Prompt = mongoose.models.Prompt || mongoose.model("Prompt", promptSchema)

export default Prompt