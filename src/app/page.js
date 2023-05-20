import CommentModal from '@/components/CommentModal'
import Feed from '@/components/Feed'
import Sidebar from '@/components/Sidebar'
import Widgets from '@/components/Widgets'

export default async function Home() {
  const newsResults = await fetchNews()
  const users = await fetchUser()
  return (
    <div>
      <main className='flex min-h-screen mx-auto'>
        <Sidebar />
        <Feed />
        <Widgets newsResults = {newsResults} users = {users}/>
        <CommentModal />
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
