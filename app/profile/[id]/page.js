'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Profile from '@components/Profile'
import { useRouter, useSearchParams } from 'next/navigation'

const UserProfile = ({ params }) => {

    const [profilePrompt, setProfilePrompt] = useState([])
    const { data: session } = useSession()
    const router = useRouter()
    const username = useSearchParams().get('name')
    console.log("user params : ", params);

    useEffect(() => {
        const fetchPrompts = async () => {
            const response = await fetch(`/api/users/${params.id}/posts`)
            const data = await response.json()
            setProfilePrompt(data)
        }
        console.log(session);
        if (params.id) fetchPrompts()
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

    return (
        <Profile
            name={username}
            desc={`Welcome to ${username} personalize profile`}
            data={profilePrompt}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default UserProfile