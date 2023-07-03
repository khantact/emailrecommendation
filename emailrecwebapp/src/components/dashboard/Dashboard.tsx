import React from 'react'
import Link from 'next/link'

const Dashboard = () => {
  return (
    <div className="p-4 bg-indigo-900  h-screen">
        <h1 className='cursor-default font-bold text-3xl underline underline-offset-8 pb-8'>Dashboard</h1>
        <ul className="">
          <Link href='/preferences'><li className="hover:bg-indigo-950 transition ease-in bg-inherit">Preferences</li></Link>
          <Link href='/account'><li className="hover:bg-indigo-950 transition ease-in bg-inherit">Account</li></Link>
        </ul>
    </div>
  )
}

export default Dashboard