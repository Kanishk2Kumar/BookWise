import React from 'react'

const TooFast = () => {
  return (
    <main className='root-container flex min-h-screen flex-col items-center justify-center'>
        <h1 className='font-bebas-neue text-5xl font-bold text-light-100'>Woahh, Slow Down there Speedy!!!</h1>
        <p className='font-ibm-plex-sans text-light-200 text-2xl mt-10'>You have been putting to many requests at once , please try again after a short while!!!</p>
    </main>
  )
}

export default TooFast