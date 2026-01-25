import { useAuth } from '../Context/AuthProvider';
import Sidebar from './Sidebar.jsx';
import { Outlet } from 'react-router-dom';

function Dashboard() {
    const [authUser] = useAuth();
    return (
        <>
            <div style={{ minHeight: "calc( 100vh - 85px )" }} className="my-2 flex  gap-5 ">
                <div className={`${!authUser?.user?.role ? "hidden": " "}`}>
                    <Sidebar />
                </div>
                <div style={{ maxHeight: "calc( 100vh - 85px )" }} className="w-full p-4 Box_Shedow rounded-2xl overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Dashboard