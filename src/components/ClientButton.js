"use client"
import { useState } from "react"

export default function ClientButton({articleNumber, setArticleNumber}) {
    const [number, setNumber] = useState(articleNumber)
  return (
    <button onClick={() => setArticleNumber(articleNumber + 3)} className='pl-4 pb-3 text-blue-400 hover:text-blue-500'>Show More</button>
  )
}
