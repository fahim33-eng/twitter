"use client"
import { modalState } from '@/atom/modalAtom'
import { useRouter } from 'next/navigation'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useRecoilState } from 'recoil'

export default function Icon() {
  const [open, setOpen] = useRecoilState(modalState)
  const sendToPostPage =() => {
    setOpen(false)
    router.push(`/`)
  }
    const router = useRouter()
  return (
    <div onClick={sendToPostPage}>
        <AiOutlineArrowLeft />
    </div>
  )
}
