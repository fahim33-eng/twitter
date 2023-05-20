"use client"
import { useRecoilState } from "recoil"
import { modalState, postIdState }  from "../atom/modalAtom"
import Modal from 'react-modal'
import { RxCross2 } from 'react-icons/rx'
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from "firebase/firestore"
import { useState, useEffect } from "react"
import { db } from "@/firebase"
import Moment from "react-moment"
import { useSession } from "next-auth/react"
import { HiOutlinePhotograph } from 'react-icons/hi'
import { RxFace } from 'react-icons/rx'
import { useRouter } from "next/navigation"

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState)
  const [postId, setPostId] = useRecoilState(postIdState)
  const [inputData, setInputData] = useState("")
  const [post, setPost] = useState({})
  const { data : session } = useSession()
  const router = useRouter()

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapShot) => {
      setPost(snapShot)
    })
  }, [postId])
  const handleChange = (e) => {
    setInputData(e.target.value)
  }
  const sendComment = async () => {
    addDoc(collection(db, "posts", postId, "comments"), {
      comment : inputData,
      name : session.user.name,
      username : session.user.username,
      userImg : session.user.image,
      timestamp : serverTimestamp(),
      whoCommented : session.user.uid
    })
    setOpen(false)
    setInputData("")
    router.push(`/posts/${postId}`)
  }
  const sendToPostPage =() => {
    setOpen(false)
    router.push(`/posts/${postId}`)
  }
  return (
    <div>
      {open && (
        <Modal ariaHideApp={false} onRequestClose={() => setOpen(false)} isOpen={open} className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-1 border-gray-200 rounded-md shadow-md">
          <div className="p-1">
            <div className="border-b border-gray-200">
              <div onClick={() => setOpen(false)} className="hoverEffect w-10 h-10 flex items-center justify-center">
                <RxCross2 className="text-gray-700 p-0 cursor-pointer"/>
              </div>
            </div>
            <div className="p-2 relative flex items-center">
              <span className="w-0.5 absolute h-full bg-gray-300 top-11 left-[26px] z-[-1]" />
                <img className='h-10 w-10 rounded-full mr-4' src={post?.data()?.userImg} alt='User Image' />
                <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{post?.data()?.name}</h4>
                <span className='text-gray-700 text-sm mr-2'>@{post?.data()?.username} - </span>
                <span className='text-gray-700 text-sm hover:underline'>
                <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
              </span>
            </div>
            <p className="ml-16 mb-8 break-all">{post?.data()?.text}</p>

            <div className='flex border-b border-gray-200 p-2'>
            <img className="h-10 w-10 cursor-pointer rounded-full cursor-pointer hover:brightness-95" src={session?.user?.image} alt="user-image" />
            <div className='w-full divide-y divide-gray-200'>
                <div>
                    <textarea onChange={handleChange} value={inputData} className='w-full tracking-wide min-h-[50px] text-gray-500 border-none focus:ring-0 placeholder-gray-400' rows={"2"} placeholder='Tweet your reply'></textarea>
                </div>
                <div className='flex items-center justify-between pt-2.5'>
                    <div className='flex'>
                      <button onClick={sendToPostPage} className='bg-gray-900 disabled:opacity-50 text-white px-4 py-1 hover:brightness-95 rounded-full shadow-md font-bold font-sm'>See Other Replies</button>
                    </div>
                    <button onClick={sendComment} disabled = {(!inputData.trim())} className='bg-blue-400 disabled:opacity-50 text-white px-4 py-1 hover:brightness-95 rounded-full shadow-md font-bold font-sm'>Reply</button>
                </div>
                  
              
            </div>
        </div>

            
          </div>
        </Modal>
      )}
    </div>
  )
}
