import React from 'react'

const about = () => {
  return (
    <div className="grid justify-center bg-gradient-to-r from-indigo-950 to-indigo-700 h-screen overflow-y-hidden">
      <div className='max-w-md mt-14'>
        <div className='title grid justify-center block font-bold text-8xl subpixel-antialiased text-peach'>
          About
        </div>
        <div className='desc grid place-items-center block text-center mt-4 text-lg text-pearl'>
          1. Create an account and select your preferred topics. {<br/>}
          2. Receive personalized research paper recommendations based on your preferred topics. {<br/>}
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          It's that easy!
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default about