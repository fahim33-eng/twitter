"use client"
import { SlMagnifier } from 'react-icons/sl'
import News from './News'
import ClientButton from './ClientButton'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Widgets({ newsResults, users }) {
  let [articleNumber, setArticleNumber] = useState(3)
  let [userNumber, setUserNumber] = useState(3)
  return (
    <div className='w-[600px] hidden lg:inline ml-8 space-y-5 pb-4'>
      <div className='w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50'>
        <div className='flex items-center p-2 rounded-full relative'>
            <SlMagnifier className='z-50 text-gray-500'/>
            <input className='absolute pl-11 border-gray-500 focus:shadow-lg bg-gray-100 focus:bg-white inset-0 rounded-full text-gray-500 placeholder:text-gray-500' type='text' placeholder='Search Twitter' />
        </div>
      </div>
      <div className='text-gray-700 space-y-3 bg-gray-100 w-[90%] xl:w-[75%] rounded-xl pt-2'>
        <h4 className='font-bold text-xl px-4'>What&#39;s happening?</h4>
        <AnimatePresence>
          {newsResults.slice(0, articleNumber).map((article) => {
              return (
                  <motion.div key={article.url} transition={{duration : 1}} initial={{opacity : 0}} animate={{opacity : 1}} exit={{opacity : 0}}>
                    <News key={article.url} article={article} />
                  </motion.div> 
              )
          })}
        </AnimatePresence>
        <ClientButton articleNumber = {articleNumber} setArticleNumber = {setArticleNumber}/>
      </div>
        <div className='sticky top-16 text-gray-700 w-[90%] xl:w-[75%] bg-gray-100 rounded-xl space-y-3 pt-2'>
            <h4 className='font-bold px-4 text-xl'>Who to follow</h4>
            <AnimatePresence>
              { users.slice(0, userNumber).map(user => (
                  <motion.div key={user.login.uuid} transition={{duration : 1}} initial={{opacity : 0}} animate={{opacity : 1}} exit={{opacity : 0}}>
                    <div key={user.login.uuid} className='flex items-center py-2 px-4 hover:bg-gray-200'>
                        <img alt="User Photo" className='rounded-full mr-4' width="40" src={user.picture.thumbnail}></img>
                        <div className='truncate leading-5'>
                            <h5 className='truncate hover:underline cursor-pointer'>{user.login.username}</h5>
                            <h6 className='truncate'>{user.name.first} {user.name.last}</h6>
                        </div>
                        <button className='ml-auto px-3.5 bg-sky-500 py-1.5 font-bold shadow-md hover:brightness-95 rounded-xl'>Follow</button>
                    </div>
                  </motion.div>
              ))}
            </AnimatePresence>
            <button onClick={() => setUserNumber(userNumber + 3)} className='pl-4 pb-3 text-blue-400 hover:text-blue-500'>Show More</button>
            
        </div>
    </div>
  )
}


