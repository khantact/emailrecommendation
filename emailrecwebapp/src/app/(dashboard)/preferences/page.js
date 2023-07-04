"use client"
import React from 'react'
import Dashboard from '@/components/dashboard/Dashboard'
import Preferencesform from '@/components/preferenceform/Preferencesform'
const Preferences = () => {
  return(
    <div className='flex'>
      <Dashboard />
      <div className='flex justify-center w-full p-4'>
        <Preferencesform />
      </div>
    </div>
  )
}

export default Preferences