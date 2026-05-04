import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import Logo from "../../public/Logo_Img.png"

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6 md:px-20 rounded-t-[3rem] mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand Column */}
        <div className="space-y-6">
          <Link to="/" className='flex items-center rounded-2xl bg-white gap-2'>
            <img src={Logo} className='w-10 ' alt="Logo" />
            <h2 className='text-2xl font-bold text-black'>HS<span className="text-blue-500">classroom</span></h2>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400">
            Empowering learners worldwide with accessible, high-quality online education. Start your journey today and unlock your potential.
          </p>
          <div className="flex gap-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/courses" className="hover:text-blue-400 transition">Browse Courses</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition">About Our Platform</Link></li>
            <li><Link to="/pricing" className="hover:text-blue-400 transition">Pricing Plans</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Categories Column */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Top Categories</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition">Web Development</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Data Science</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Digital Marketing</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Graphic Design</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Stay Updated</h4>
          <p className="text-sm text-slate-400 mb-4">Subscribe to get the latest course updates and news.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full bg-slate-800 border border-slate-700 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-blue-500"
            />
            <button className="absolute right-1 top-1 bottom-1 bg-blue-600 text-white px-4 rounded-full text-xs font-bold hover:bg-blue-700 transition">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
        <p>© {new Date().getFullYear()} HSclassroom. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookie Settings</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer