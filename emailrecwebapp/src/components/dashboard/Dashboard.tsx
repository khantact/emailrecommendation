"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { faGears, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Dashboard = () => {
  const currentPath = usePathname();
  return (
    <div className="bg-indigo-900 h-screen mt-12 min-w-lg">
      
        <h1 className='p-4 cursor-default font-bold text-3xl underline underline-offset-8 pb-8'>Dashboard</h1>
        <ul className="">
          <Link href='/preferences'><li className={currentPath === '/preferences' ? 'bg-indigo-800 transition ease-in pl-4 rounded-r-lg' : 
        'hover:bg-indigo-950 transition ease-in bg-inherit pl-4 rounded-r-lg'}> <FontAwesomeIcon icon={faGears} className='mr-2'/>Preferences</li></Link>
          <Link href='/account'><li className={currentPath === '/account' ? 'bg-indigo-800 transition ease-in pl-4 rounded-r-lg' : 
        'hover:bg-indigo-950 transition ease-in bg-inherit pl-4 rounded-r-lg'}> <FontAwesomeIcon icon={faUser} className='mr-3.5'/>Account</li></Link>
        </ul>
    </div>
  )
}

export default Dashboard