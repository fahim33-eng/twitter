"use client"
import React from 'react'
import { HiOutlinePhotograph } from 'react-icons/hi'
import { RxFace } from 'react-icons/rx'
import { useSession, signOut } from 'next-auth/react'
import { useState, useRef } from 'react'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '@/firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { RxCross2 } from 'react-icons/rx'


export default function Input() {
    const { data : session } = useSession({
        required : true,
      })
    const [inputData, setInputData] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {
        setInputData(e.target.value)
    }
    const sendPost = async () => {
        if(loading) return
        setLoading(true)
        const docRef = await addDoc(collection(db, "posts"), {
            id : session.user.uid,
            text : inputData,
            userImg : session.user.image,
            timestamp : serverTimestamp(),
            name : session.user.name,
            username : session.user.username
        })
        const imageRef = ref(storage, `posts/${docRef.id}/image`)
        if(selectedFile) {
            await uploadString(imageRef, selectedFile, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imageRef)
                await updateDoc(doc(db, "posts", docRef.id), {
                    image : downloadURL
                })
            })
        }
        setInputData("")
        setLoading(false)
        setSelectedFile(null)
    }
    const inputFileRef = useRef(null)
    const addImageToPost = (e) => {
        const reader = new FileReader()
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
    }
    return (
        <div className='flex border-b border-gray-200 p-3 space-x-3'>
            <img onClick={signOut} className="h-11 w-11 cursor-pointer rounded-full cursor-pointer hover:brightness-95" src={session?.user?.image} alt="user-image" />
            <div className='w-full divide-y divide-gray-200'>
                <div>
                    <textarea onChange={handleChange} value={inputData} className='w-full tracking-wide min-h-[50px] text-gray-500 border-none focus:ring-0 placeholder-gray-400' rows={"2"} placeholder='What&#39;s Happening?'></textarea>
                </div>
                {selectedFile && (
                    <div className='relative'>
                        <RxCross2 className='absolute border-b border-white bg-gray-700 rounded-full m-2 h-9 w-9 text-white cursor-pointer' onClick={() => setSelectedFile(null)}/>
                        <img src={selectedFile} alt='Uploaded Image' className={`${loading && "animate-pulse"}`} />
                    </div>
                )}
                {!loading && (
                    <>
                        <div className='flex items-center justify-between pt-2.5'>
                            <div className='flex'>
                                <div onClick = {() => inputFileRef.current.click()}>
                                    <HiOutlinePhotograph  className='hoverEffect text-sky-500 hover:bg-sky-100'/>
                                    <input type='file' hidden ref={inputFileRef} onChange={addImageToPost}/>
                                </div>
                                <RxFace className='hoverEffect text-sky-500 hover:bg-sky-100' />
                            </div>
                            <button onClick={sendPost} disabled = {(!inputData.trim() && !selectedFile)} className='bg-blue-400 disabled:opacity-50 text-white px-4 py-1 hover:brightness-95 rounded-full shadow-md font-bold font-sm'>Tweet</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
