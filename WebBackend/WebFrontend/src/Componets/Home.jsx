import React from 'react'
import bgImg from "../../public/BG_Img.png"
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Review from './Review'

function Home() {
  return (
    <div className="bg-white font-sans text-slate-800">
      {/* Hero Section: Matching the header style of themewagon.github.io_eduleb_.jpg */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-gradient-to-r from-blue-50 to-transparent">
        <div className="md:w-1/2 space-y-6">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">
            Better Learning Future With Us
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            Smart Study <span className="text-blue-600 font-medium">Where Knowledge Meets the Web</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-md">
            Join thousands of learners improving their skills with our industry-leading online platform.
          </p>
          <div className="flex gap-4">
            <Link to="/courses" className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-blue-700 transition">
              Get Started
            </Link>
          </div>
        </div>
        
        <div className="md:w-1/2 mt-10 md:mt-0 relative">
          <img src={bgImg} className="z-10 relative w-full h-auto object-contain" alt="Hero" />
          {/* Decorative circle matching the style in themewagon.github.io_eduleb_.jpg */}
          <div className="absolute -top-10 -right-10 h-64 w-64 bg-blue-100 rounded-full filter blur-3xl opacity-50 -z-0"></div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Expert Tutors", icon: "🎓", color: "bg-red-50 text-red-500" },
            { title: "Online Courses", icon: "💻", color: "bg-blue-50 text-blue-500" },
            { title: "Flexible Learning", icon: "⏰", color: "bg-green-50 text-green-500" }
          ].map((feature, index) => (
            <div key={index} className="p-8 border border-gray-100 rounded-xl hover:shadow-2xl transition duration-300">
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center text-2xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-500">High-quality content designed by professionals to help you excel.</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section: Professional Gradient Styling */}
      <section className="mx-6 md:mx-20 my-10 rounded-3xl bg-[#145da0] py-16 px-10 text-center text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to start your learning journey?
          </h2>
          <p className="text-blue-100 mb-10 max-w-2xl mx-auto">
            Take the next step in your career with access to over 500+ premium courses and a global community of learners.
          </p>
          <Link to="/signup" className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-xl">
            Create Free Account
          </Link>
        </div>
        {/* Background Accent */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-400 rounded-full opacity-20"></div>
      </section>

      <Review />
      <Footer />
    </div>
  )
}

export default Home