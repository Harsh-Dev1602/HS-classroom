import React from 'react'
import bgImg from "../../public/BG_Img.png"
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Review from './Review'
function Home() {
  return (
    <>
      <div className="flex justify-evenly flex-col md:flex-row items-center py-10">
        <img src={bgImg} className=' md:w-1/4' />
        <h1 className="md:w-1/3 font-bold text-slate-900 leading-tight">
          Learn Anytime, Anywhere with Our
          <span className="text-blue-600"> Online Learning Platform</span>
        </h1>
      </div>

      <section className="bg-gray-100 rounded-2xl h-auto py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className=" font-bold text-[#145da0]">
            Start Your Learning Journey Today
          </h2>
          <p className="mt-2 mb-10 text-gray-600">
            Join thousands of learners improving their skills with our online
            platform.
          </p>
          <Link to="/signup" className=" BG_Color text-white rounded-2xl p-4"> Create Free Account </Link>
        </div>
      </section>

      <Review />

      <Footer />
    </>
  )
}

export default Home