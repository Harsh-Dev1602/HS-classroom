import { Link, useLocation } from 'react-router-dom';
import { MdDashboardCustomize } from "react-icons/md";
import { IoBookmarksOutline } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi";
import { useAuth } from '../Context/AuthProvider';

function Sidebar() {
    const [authUser] = useAuth();
    const location = useLocation(); // Hook to identify active route

    const menuConfig = {
        "@dmin": [
            { id: 0, label: "Dashboard", icon: <MdDashboardCustomize />, path: "/admin-dashboard" },
            { id: 1, label: "Manage Courses", icon: <IoBookmarksOutline />, path: "/admin/courses" },
            { id: 2, label: "Manage Users", icon: <HiUserGroup />, path: "/admin/users" },
        ],
        instructor: [
            { id: 0, label: "Dashboard", icon: <MdDashboardCustomize />, path: "/instructor" },
            { id: 1, label: "My Courses", icon: <IoBookmarksOutline />, path: "/instructor/my-courses" },
            { id: 2, label: "Create Course", icon: <IoIosCreate />, path: "/instructor/create-course" },
        ]
    };

    const items = menuConfig[authUser?.user?.role] || [];

    return (
        <div className="h-screen flex flex-col p-6">


            {/* Navigation Links */}
            <nav className="flex-grow space-y-2">
                {items.map((item) => {
                    const isActive = location.pathname === item.path;
                    
                    return (
                        <Link 
                            key={item.id} 
                            to={item.path} 
                            className={`flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 group ${
                                isActive 
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                                : "hover:bg-slate-50 text-slate-600 hover:text-blue-600"
                            }`}
                        >
                            <div className={`p-2 rounded-xl text-xl transition-all ${
                                isActive 
                                ? "bg-white/20 text-white" 
                                : "bg-white shadow-sm border border-slate-100 text-slate-500 group-hover:text-blue-600 group-hover:border-blue-100"
                            }`}>
                                {item.icon}
                            </div>
                            <span className="font-bold text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

        </div>
    );
}

export default Sidebar;