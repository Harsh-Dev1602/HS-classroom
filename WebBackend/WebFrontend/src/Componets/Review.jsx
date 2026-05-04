import React from 'react'

function Review() {
    const reviews = [
        {
            name: "Donald Jackman",
            role: "SWE 1 @ Amazon",
            img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100",
            text: "The structured curriculum and expert support made my transition into tech seamless. Highly recommended for anyone starting their journey."
        },
        {
            name: "Richard Nelson",
            role: "SWE 2 @ Amazon",
            img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100",
            text: "The real-world projects provided here are top-notch. I was able to build a portfolio that actually caught the attention of recruiters."
        },
        {
            name: "James Washington",
            role: "SWE 2 @ Google",
            img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
            text: "Incredible community and resources. The flexibility allowed me to learn at my own pace while working full-time. A total game changer!"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-blue-50/50">
            <div className="max-w-6xl mx-auto px-6 text-center">
                {/* Header Section */}
                <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Testimonials</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-3">
                    What Our <span className="text-blue-600">Students Say</span>
                </h2>
                <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
                    Join thousands of successful students who transformed their careers through our platform.
                </p>

                {/* Review Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-blue-50 hover:shadow-xl transition-all duration-300 group flex flex-col items-start text-left relative overflow-hidden">
                            {/* Quote Icon Styling */}
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V5C14.017 4.44772 14.4647 4 15.017 4H19.017C20.6739 4 22.017 5.34315 22.017 7V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.017 21L2.017 18C2.017 16.8954 2.91239 16 4.017 16H7.017C7.56928 16 8.017 15.5523 8.017 15V9C8.017 8.44772 7.56928 8 7.017 8H3.017C2.46472 8 2.017 7.55228 2.017 7V5C2.017 4.44772 2.46472 4 3.017 4H7.017C8.67386 4 10.017 5.34315 10.017 7V15C10.017 18.3137 7.33071 21 4.017 21H2.017Z" />
                                </svg>
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="currentColor" className="text-orange-400">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-gray-600 italic mb-8 relative z-10 leading-relaxed">
                                "{review.text}"
                            </p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="relative">
                                    <img className="h-14 w-14 rounded-full border-2 border-blue-100 object-cover" src={review.img} alt={review.name} />
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 leading-none">{review.name}</h4>
                                    <p className="text-sm text-blue-600 font-medium mt-1">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Review