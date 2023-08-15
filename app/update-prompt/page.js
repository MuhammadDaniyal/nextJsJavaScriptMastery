"use client"

import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'

const EditPrompt = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    useEffect(() => {
        console.log('paramsId', promptId);
        const fetchGetPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }
        if (promptId) fetchGetPromptDetails()
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        if (!promptId) return alert('Prompt Id not found')

        setSubmitting(true)

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    tag: post.tag,
                    prompt: post.prompt
                })
            })
            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt