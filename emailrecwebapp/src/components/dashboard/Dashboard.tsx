import React from 'react'
import Link from 'next/link'

const Dashboard = () => {
  return (
    <div>
      <div className="">
        <div className="">
            <ul className='bg-indigo-900 w-1/5 p-4 h-screen'>
              <h1 className='cursor-default font-bold text-3xl underline underline-offset-8 pb-8 mt-20'>Dashboard</h1>
              <li><Link href='/preferences'>Preferences</Link></li>
              <li><Link href='/account'>Account</Link></li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard