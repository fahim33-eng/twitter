"use client"
import Image from "next/image";
import SidebarMenuItems from "./SidebarMenuItems";
import { AiFillHome } from 'react-icons/ai'
import { BsBell, BsFillBookmarksFill } from 'react-icons/bs'
import { BsHash, BsList, BsThreeDots } from 'react-icons/bs'
import { HiOutlineInbox } from 'react-icons/hi'
import { BiUser } from 'react-icons/bi'
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Sidebar() {
  const {data : session } = useSession({
    required : true,
  })
  console.log(session)
  return (
    <div className="flex flex-col xl:items-start fixed p-2 h-full xl:ml-16">
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:p-2">
        <Image width={"40"} height={"40"} alt="twitter logo" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/800px-Logo_of_Twitter.svg.png"}/>
      </div>
      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItems text = "Home" Icon = {AiFillHome} active = {true} />
        <SidebarMenuItems text = "Explore" Icon = {BsHash} />
        <SidebarMenuItems text = "Notifications" Icon = {BsBell} />
        <SidebarMenuItems text = "Messages" Icon = {HiOutlineInbox} />
        <SidebarMenuItems text = "Bookmarks" Icon = {BsFillBookmarksFill} />
        <SidebarMenuItems text = "Lists" Icon = {BsList} />
        <SidebarMenuItems text = "Profile" Icon = {BiUser} />
        <SidebarMenuItems text = "More" Icon = {BsThreeDots} />
      </div>

      <button className="bg-blue-400 text-white w-48 h-12 text-lg hover:brightness-95 rounded-full font-bold hidden xl:inline shadow-md">Tweet</button>
      <div onClick={signOut} className="hoverEffect space-x-2 flex text-gray-700 justify-center xl:justify-start items-center mt-auto">
        <img className="h-10 w-10 rounded-full" src={session?.user?.image } alt="user-image" />
        <div className="leading-5 hidden xl:inline">
          <h4 className="font-bold text-sm tracking-wide">{session?.user?.name}</h4>
          <p className="text-gray-500 text-sm">@{session?.user?.username}</p>
        </div>
        <BsThreeDots className="h-5 xl:ml-8 hidden xl:inline"/>
      </div>
    </div>
  )
}
