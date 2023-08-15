import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const handleCopy = () => {
    setCopied(prompt.prompt)
    console.log(copied);
    navigator.clipboard.writeText(prompt.prompt)
    setTimeout(() => setCopied(''), 7000)
  }

  const handleUserProfile = () => {
    router.push(`/profile/${prompt.creator._id}?name=${prompt.creator.username}`)
  }

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex flex-1 justify-start items-center gap-3 cursor-pointer'
          onClick={handleUserProfile}>
          <Image
            src={prompt.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex-col flex'>
            <h3 className=' font-satoshi font-semibold text-gray-900'>
              {prompt.creator.username}
            </h3>
            <p className=' font-inter text-sm text-gray-500'>
              {prompt.creator.email}
            </p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={copied === prompt.prompt
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'}
            width={14}
            height={14}
            alt='copy-icon'
          />
        </div>
      </div>
      <p className=' my-3 font-satoshi text-gray-700 text-sm'>{prompt.prompt}</p>
      <p
        className=' font-inter blue_gradient text-sm cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >#{prompt.tag}</p>
      {
        session?.user.id === prompt.creator._id &&
        pathname === '/profile' && (
          <div className='mt-5 flex-center gap-4 border-t border-grey-100 pt-3'>
            <p className='green_gradient font-inter font-semibold cursor-pointer'
              onClick={handleEdit}
            >
              Edit
            </p>
            <p className='orange_gradient font-inter font-semibold cursor-pointer'
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )
      }
    </div>
  )
}

export default PromptCard