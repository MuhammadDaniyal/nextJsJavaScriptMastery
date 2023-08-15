
import Prompt from "@models/promptSchema"
import { connectToDB } from "@utils/database"

export const GET = async (req, { params }) => { // params - populate dynamic variables into the url - get parameter when you give an api call
    try {
        await connectToDB() // lambda function, its going to die when it done its job, every time it call when need
        const allProfilePrompt = await Prompt.find({
            creator: params.id
        }).populate('creator')
        return new Response(JSON.stringify(allProfilePrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompt", { status: 500 })
    }
}