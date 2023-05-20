import CommentModal from '@/components/CommentModal'
import Feed from '@/components/Feed'
import Sidebar from '@/components/Sidebar'
import Widgets from '@/components/Widgets'
import {HiOutlineSparkles} from 'react-icons/hi'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Icon from '@/components/Icon'
import Post from '@/components/Post'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import CommentPost from '@/components/CommentPost'


export default async function PostPage({params, searchParams}) {
  const postId = params.postId
  const newsResults = await fetchNews()
  const users = await fetchUser()

  return (
    <div>
      <main className='flex min-h-screen mx-auto'>
        <Sidebar />
        <div className='xl:ml-[370px] border-l border-r ml-[73px] xl:min-w-[576px] flex-grow max-w-xl'>
            <div className='py-2 flex px-3 items-center sticky top-0 bg-white z-50 border-b border-gray-200'>
                <div className='flex items-center'>
                    <div className='hoverEffect ml-auto items-center justify-center'>
                        <Icon/>
                    </div>
                    <h2 className='cursor-pointer font-bold text-lg sm:text-xl'>Go Back To Home</h2>
                </div>
                <div className='hoverEffect ml-auto items-center justify-center'>
                    <HiOutlineSparkles />
                </div>
            </div>

            <CommentPost id={postId}/>
        </div>
        <Widgets newsResults = {newsResults} users = {users}/>
      </main>
    </div>
  )
}

const URL = "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
const randomUserURL = "https://randomuser.me/api/?results=50&inc=name,%20login,picture"

async function fetchNews() {
  const response = await fetch(URL)
  const data = await response.json()
  return data.articles
} 
async function fetchUser() {
  const response = await fetch(randomUserURL)
  const users = await response.json()
  return users.results
} 
