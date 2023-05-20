"use client"
import React, { useEffect, useState } from 'react'
import { HiOutlineSparkles } from 'react-icons/hi'
import Input from './Input'
import Post from './Post'
import { useSession } from 'next-auth/react'
import { db } from '@/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { AnimatePresence, motion } from 'framer-motion'

export default function Feed() {
  const { data : session } = useSession({
    required : true
  })
  const [posts, setPosts] = useState([])
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    )
  }, [])
  return (
    <div className='xl:ml-[370px] border-l border-r ml-[73px] xl:min-w-[576px] flex-grow max-w-xl'>
      <div className='py-2 flex px-3 sticky top-0 bg-white z-50 border-b border-gray-200'>
        <h2 className='cursor-pointer font-bold text-lg sm:text-xl'>Home</h2>
        <div className='hoverEffect ml-auto items-center justify-center'>
            <HiOutlineSparkles />
        </div>
      </div>
      <Input />
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div key={post.id} transition={{duration : 1}} initial={{opacity : 0}} animate={{opacity : 1}} exit={{opacity : 0}}>
            <Post key={post.id} id={post.id} post = {post}/>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
