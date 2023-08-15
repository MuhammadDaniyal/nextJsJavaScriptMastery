import Prompt from "@models/promptSchema"
import { connectToDB } from "@utils/database"

// GET (read)
export const GET = async (req, { params }) => {
    try {
        await connectToDB() // lambda function, its going to die when it done its job, every time it call when need
        const prompt = await Prompt.findById(params.id).populate('creator')
        if (!prompt) return new Response("Prompt not found", { status: 404 })
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompt", { status: 500 })
    }
}

// PATCH (update)
export const PATCH = async (req, { params }) => {
    const { tag, prompt } = await req.json() // extract all of data, you pass through post request
    try {
        await connectToDB()
        const existPrompt = await Prompt.findById(params.id).populate('creator')
        if (!existPrompt) return new Response("Prompt not found", { status: 404 })
        const newPrompt = await Prompt.findByIdAndUpdate(params.id, {
            tag, prompt
        }, { new: true })
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 })
    }
}
// Delete (delete)
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB()
        const existPrompt = await Prompt.findById(params.id).populate('creator')
        if (!existPrompt) return new Response("Prompt not found", { status: 404 })
        await Prompt.findByIdAndDelete(params.id)
        return new Response("Prompt has been deleted successfully", { status: 201 })
    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 })
    }
}