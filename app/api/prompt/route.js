import Prompt from "@models/promptSchema"
import { connectToDB } from "@utils/database"

export const GET = async (req, res) => {
    try {
        await connectToDB() // lambda function, its going to die when it done its job, every time it call when need
        const allPrompt = await Prompt.find({}).populate('creator') // yeh as a foriegn key banjaegi smjho to, creator field sy (in user model) user ka specific data bh get krskogy 
        return new Response(JSON.stringify(allPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompt", { status: 500 })
    }
}