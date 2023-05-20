"use client"
import { BsThreeDots, BsTrash } from 'react-icons/bs'
import { GiNetworkBars } from 'react-icons/gi'
import { AiOutlineMessage, AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from 'react-icons/ai'
import Moment from 'react-moment'
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db, storage } from '@/firebase'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { deleteObject, ref } from 'firebase/storage'
import { useRecoilState } from 'recoil'
import { modalState, postIdState } from '@/atom/modalAtom'

export default function Comment({comment, id, originalPostId}) {
    const { data : session } = useSession()
    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState([])
    const [hasLiked, setHasLiked] = useState(false)
    const [open, setOpen] = useRecoilState(modalState)
    const [postId, setPostId] = useRecoilState(postIdState)

    const deletePost = async () => {
        if(window.confirm("Are you sure you want to delete this post?")) {
            deleteDoc(doc(db, "posts", originalPostId, "comments", id))
        }
    }
  return (
    <div className='flex justify-start p-3 cursor-pointer border-b border-gray-200 flex-wrap'>
        <img className='h-10 w-10 rounded-full mr-4' src={comment.userImg} alt='User Image' />
        <div className='flex-1 mr-4'>
            {/* Header Below*/}
            <div className='flex justify-between items-center'>
                <div className='flex space-x-1 items-center'>
                    <h4 className='font-bold text-base sm:text-lg hover:underline'>{comment.name}</h4>
                    <span className='text-gray-700 text-sm'>@{comment.username} - </span>
                    <span className='text-gray-700 text-sm hover:underline'>
                        <Moment fromNow>{comment.timestamp?.toDate()}</Moment>
                    </span>
                </div>
                <BsThreeDots className='hoverEffect p-2 hover:bg-sky-100 hover:text-sky-5000' />
            </div>
            <div className='p-2 mr-4 flex justify-start max-w-full'>
                <p className='text-gray-800 mb-2 text-sm sm:text-lg break-all'>{comment.comment}</p>
            </div>
            <div className='flex justify-around p-2'>
                <div className='flex items-center'>
                    {hasLiked ? (
                        <AiFillHeart onClick={() => setHasLiked(false)} className='hoverEffect hover:bg-red-100 text-red-600'/>
                    ) : (
                        <AiOutlineHeart onClick={() => setHasLiked(true)} className='hoverEffect hover:bg-red-100 hover:text-red-600'/>
                    )}
                </div>
                <AiOutlineShareAlt className='hoverEffect hover:bg-sky-100 hover:text-sky-500'/>
                <GiNetworkBars className='hoverEffect hover:bg-sky-100 hover:text-sky-600'/>
                {session?.user?.uid === comment.whoCommented && (
                    <BsTrash onClick={deletePost} className='hoverEffect hover:bg-red-100 hover:text-red-500'/>
                )}
            </div>
        </div>
    </div>
  )
}
