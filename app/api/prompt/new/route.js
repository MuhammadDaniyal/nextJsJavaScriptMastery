import Prompt from "@models/promptSchema"
import { connectToDB } from "@utils/database"

export const POST = async (req, res) => {
    const { userId, tag, prompt } = await req.json() // extract all of data, you pass through post request

    try {
        await connectToDB() // lambda function, its going to die when it done its job, every time it call when need
        const newPrompt = new Prompt({
            creator: userId,
            tag,
            prompt
        })
        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create new prompt", { status: 500 })
    }
}