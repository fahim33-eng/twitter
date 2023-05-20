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

export default function Post({post, id}) {
    const { data : session } = useSession()
    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState([])
    const [hasLiked, setHasLiked] = useState(false)
    const [open, setOpen] = useRecoilState(modalState)
    const [postId, setPostId] = useRecoilState(postIdState)

    useEffect(() => {
        setHasLiked((likes.findIndex((like) => like.id === session?.user.uid ) !== -1))
    }, [likes])

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "posts", id, "likes"), (snapshot) => setLikes(snapshot?.docs)
        )
    }, [db])

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "posts", id, "comments"), (snapshot) => setComments(snapshot?.docs)
        )
    }, [db])

    const likePost = async () => {
        if(hasLiked) {
            await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid))
        }
        else {
            await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
                username : session.user.username
            })
        }
    }

    const deletePost = async () => {
        if(window.confirm("Are you sure you want to delete this post?")) {
            deleteDoc(doc(db, "posts", id))
            if(post?.data()?.image) {
                deleteObject(ref(storage, `posts/${id}/image`))
            }
        }
    }
  return (
    <div className='flex justify-start p-3 cursor-pointer border-b border-gray-200 flex-wrap'>
        <img className='h-10 w-10 rounded-full mr-4' src={post?.data()?.userImg} alt='User Image' />
        <div className='flex-1 mr-4'>
            {/* Header Below*/}
            <div className='flex justify-between items-center'>
                <div className='flex space-x-1 items-center'>
                    <h4 className='font-bold text-base sm:text-lg hover:underline'>{post?.data()?.name}</h4>
                    <span className='text-gray-700 text-sm'>@{post?.data()?.username} - </span>
                    <span className='text-gray-700 text-sm hover:underline'>
                        <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
                    </span>
                </div>
                <BsThreeDots className='hoverEffect p-2 hover:bg-sky-100 hover:text-sky-5000' />
            </div>
            <div className='p-2 mr-4 flex justify-start max-w-full'>
                <p className='text-gray-800 mb-2 text-sm sm:text-lg break-all'>{post?.data()?.text}</p>
            </div>
            {post?.data()?.image && (
                <img className='rounded-2xl p-2 mr-8 w-full' src={post?.data()?.image} alt="Post Image" />
            )}
            
            <div className='flex justify-around p-2'>
                <div className='flex items-center'>
                    {hasLiked ? (
                        <AiFillHeart onClick={likePost} className='hoverEffect hover:bg-red-100 text-red-600'/>
                    ) : (
                        <AiOutlineHeart onClick={likePost} className='hoverEffect hover:bg-red-100 hover:text-red-600'/>
                    )}
                    <span className={`${likes.length > 0 && "text-red-500"} text-[14px]`}>{likes.length}</span>
                </div>
                <div className='flex items-center'>
                    <AiOutlineMessage onClick={() => {
                        setPostId(id)
                        setOpen(!open)
                    }} className='hoverEffect hover:bg-sky-100 hover:text-sky-500'/>
                    <span className={`${comments.length > 0 && "text-red-500"} text-[14px] mt-0.5`}>{comments.length}</span>
                </div>


                <AiOutlineShareAlt className='hoverEffect hover:bg-sky-100 hover:text-sky-500'/>
                <GiNetworkBars className='hoverEffect hover:bg-sky-100 hover:text-sky-600'/>
                {session?.user?.uid === post?.data().id && (
                    <BsTrash onClick={deletePost} className='hoverEffect hover:bg-red-100 hover:text-red-500'/>
                )}
            </div>
        </div>
    </div>
  )
}
