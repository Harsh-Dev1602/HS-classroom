import React from 'react'
import bgImg from "../../public/BG_Img.png"
function Home() {
  return (
    <>
    <div className="flex justify-evenly flex-col md:flex-row items-center">
       <img src={bgImg} className=' md:w-1/3'/>
       <h1 className='md:w-1/3 text-center font-bold Text_Color'>Online Learning Management System</h1>
    </div>

    </>
  )
}

export default Home