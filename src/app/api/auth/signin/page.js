"use client"
import { getProviders, signIn } from 'next-auth/react'

export default async function page() {
  const providers = await getProviders()
  return (
    <div className='flex justify-center items-center h-screen w-full space-x-4 bg-gradient-to-r from-blue-500 to-purple-500'>
      <img width={"100"} src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/800px-Logo_of_Twitter.svg.png'/>
      <div>
        {providers && Object.values(providers).map((provider) => (
          <div key="1">
            <button onClick={() => signIn(provider.id, {callbackUrl : "/"})} className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-700">Sign in Using Google</button>
          </div>
        ))}
      </div>
    </div>
  )
}
