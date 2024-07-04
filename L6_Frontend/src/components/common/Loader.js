import React from 'react'

export default function Loader() {
  return (
    <div className='relative z-[150150] bg-blue-500 h-[100vh] w-[100vw] border-2 border-red-800'>
      <span className="loading loading-dots loading-lg bg-white"></span>
    </div>
  )
}
