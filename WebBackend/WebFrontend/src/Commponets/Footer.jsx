import React from 'react'

function Footer() {
  return (
    <>
      <footer className="py-6 text-center bg-gray-900 text-white rounded-2xl">
        <h3>© {new Date().getFullYear()} HSclassroom.</h3>
        <p> All rights reserved.</p>
      </footer>
    </>
  )
}

export default Footer