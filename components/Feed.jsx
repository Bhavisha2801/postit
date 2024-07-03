'use client';

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard';
import Link from 'next/link';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    
    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      {/* <form className='relative w-full flex-center'>
        <input type="text" placeholder='Search for a tag or a username' value={searchText} onChange={() => handleSearchChange()} required className='search_input peer' />
      </form> */}

      {/* <PromptCardList
      data= {posts}
      // handleTagClick={() => {}}
 /> */}
 <Link href="/profile" className="yellow_btn" >
                    My Prompts
                </Link>
     </section>
  )
}

export default Feed
