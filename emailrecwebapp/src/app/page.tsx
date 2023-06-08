import React from 'react'
import './page.css'

const Main = () => {
  return (
    <div className="grid justify-center place-items-center bg-indigo-950 h-screen">
      <div className='max-w-md'>
        <div className='title grid place-items-center block font-bold text-8xl subpixel-antialiased text-peach'>
          Lorem
        </div>
        <div className='desc grid place-items-center block text-center mt-4 text-lg text-pearl'>
          Get personalized research paper recommendations based on your preferred topics. 
          Stay up to date with curated email updates featuring relevant scholarly articles in your chosen fields.
        </div>
      </div>
    </div>
  )
}

export default Main