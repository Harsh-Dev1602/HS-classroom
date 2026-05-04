import { useAuth } from '../Context/AuthProvider';
import Sidebar from './Sidebar.jsx';
import { Outlet } from 'react-router-dom';

function Dashboard() {
    const [authUser] = useAuth();

    return (
        <div style={{ height:"calc(100vh - 100px)"}} className="w-full overflow-y-hidden bg-[#f8fafc] flex ">
            {/* Conditional Sidebar Wrapper */}
            {authUser?.user?.role && (
                <div className="hidden md:block w-72 border-r border-slate-200 bg-white">
                    <Sidebar />
                </div>
            )}

            {/* Main Content Area */}
            <div className="  container overflow-y-auto mx-auto ">
                <Outlet />
            </div>
        </div >
    )
}

export default Dashboard