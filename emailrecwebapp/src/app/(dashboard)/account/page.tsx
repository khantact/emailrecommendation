import React from 'react'
import Dashboard from '@/components/dashboard/Dashboard'
const account = () => {
  return (
    <div className='flex'>
      <Dashboard />
      <div className='flex justify-center w-full p-4'>
        Account Settings
      </div>
    </div>
  )
}

export default account