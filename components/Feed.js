'use client'

import React, { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {
        data.map((prompt, i) => {
          console.log(prompt)
          return <PromptCard key={i} prompt={prompt} handleTagClick={handleTagClick} />
        })
      }
    </div>
  )
}

const Feed = () => {

  const [promptPost, setPromptPost] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredPost, setFilteredPost] = useState([])

  const fetchFilteredPosts = (query) => {
    const filteredResults = promptPost.filter(item =>
      item.tag.toLowerCase().includes(query.toLowerCase()) ||
      item.prompt.toLowerCase().includes(query.toLowerCase()) ||
      item.creator.username.toLowerCase().includes(query.toLowerCase()))
    setFilteredPost(filteredResults)
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
    fetchFilteredPosts(searchText)
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)
    fetchFilteredPosts(tagName)
  }

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPromptPost(data)
    }
    fetchPrompts()
  }, [])

  return (
    <section className='feed'>
      <form className='relative flex-center w-full'>
        <input
          type="text"
          name="search"
          value={searchText}
          onChange={handleSearchChange}
          placeholder='search for tag or username'
          required
          className='search_input peer'
        />
      </form>
      {
        searchText ? (
          <PromptCardList
            data={filteredPost}
            handleTagClick={handleTagClick}
          />
        ) : (
          <PromptCardList
            data={promptPost}
            handleTagClick={handleTagClick}
          />
        )
      }

    </section>
  )
}

export default Feed