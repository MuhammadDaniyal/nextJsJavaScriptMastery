'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Profile from '@components/Profile'
import { useRouter } from 'next/navigation'

const MyProfile = () => {

    const [profilePrompt, setProfilePrompt] = useState([])
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        const fetchPrompts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json()
            setProfilePrompt(data)
        }
        console.log(session);
        if (session?.user.id) fetchPrompts()
    }, [])

    const handleEdit = (prompt) => {
        console.log('prompt', prompt);
        router.push(`/update-prompt?id=${prompt._id}`)
    }
    const handleDelete = async (prompt) => {
        const hasConfirm = confirm("Are you sure you want to delete this prompt")
        if (hasConfirm) {
            try {
                await fetch(`/api/prompt/${prompt._id}`, {
                    method: "DELETE"
                })
                const filteredPrompts = profilePrompt.filter((p) => {
                    return prompt._id !== p._id
                })
                setProfilePrompt(filteredPrompts)
            } catch (error) {
                console.log(error);
            }
        }
    }

    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch('/api/prompt')
    //         const dataRes = await response.json()
    //         const filterPrompt = dataRes.filter((data, i) => {
    //             return data.creator._id === session?.user.id
    //         })
    //         setProfilePrompt(dataRes)
    //         console.log("filter", filterPrompt);
    //     })()
    // }, [])

    return (
        <Profile
            name="My"
            desc="Welcome to your personalize profile"
            data={profilePrompt}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile