import React from 'react'

function Loader() {
    return (
        <div>
            <div className="flex-col gap-4 w-full h-screen flex items-center justify-center bg-[#f9fafb]">
                <div className="w-20 h-20 border-4 border-transparent text-[#145da0] text-4xl animate-spin flex items-center justify-center border-t-[#145da0] rounded-full">
                    <div className="w-16 h-16 border-4 border-transparent text-[#051d40] text-2xl animate-spin flex items-center justify-center border-t-[#051d40] rounded-full" >
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Loader