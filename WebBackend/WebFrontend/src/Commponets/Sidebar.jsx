import { Link } from 'react-router-dom'
import { MdDashboardCustomize } from "react-icons/md";
import { IoBookmarksOutline } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import { useAuth } from '../Context/AuthProvider';

function Sidebar() {
    const [authUser] = useAuth();

    const menuConfig = {
        "@dmin": [
            { id: 0, label: "Dashboard", icon: <MdDashboardCustomize />, path: "/admin-dashboard" },
            { id: 1, label: "Manage Courses",icon:<MdDashboardCustomize />, path: "/admin-dashboard" },
            { id: 2, label: "Users",icon:<MdDashboardCustomize />, path: "/admin-dashboard" },
            { id: 3, label: "Settings",icon:<MdDashboardCustomize />, path: "/admin-dashboard" },
        ],
        instructor: [
            { id:0, label: "Dashboard", icon: <MdDashboardCustomize />, path: "/instructor" },
            { id:1, label: "My Courses", icon: <IoBookmarksOutline />, path: "/instructor/my-courses" },
            { id:2,label: "Create Course", icon: <IoIosCreate />, path: "/instructor/create-course" },
        ]
    };

    const Items = menuConfig[authUser?.user?.role] || [];

    return (
        <>
            <div className="w-70">
                {
                    Items.map((i) => (
                        <Link key={i.id} to={i.path} className=" hover:bg-gray-800 flex items-center gap-2 p-2 rounded-2xl hover:text-white ">
                            <div className='Box_Shedow bg-white text-black p-1 rounded-xl text-2xl'>{i.icon}</div>{i.label}
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

export default Sidebar