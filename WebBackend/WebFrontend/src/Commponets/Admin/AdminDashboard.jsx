import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/olms-api/user/courses/all-course");
      setCourses(res.data);
    } catch (err) {
      toast.error("Error fetching courses: " + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" p-6">
        <h1 className="Text_Color font-bold mb-6">Admin Dashboard</h1>

        {loading ? (
          <p>Loading courses...</p>
        ) : (
          <div className=" p-4">
            <h2 className=" font-semibold mb-4 Text_Color">Courses</h2>
            <table className="w-full">
              <thead>
                <tr className=" text-white p-4 BG_Color  rounded-2xl text-left">
                  <th className="p-4">Title</th>
                  <th className="p-4">Description</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course._id} >
                       <td className="p-4 Box_Shedow">{course.title}</td>
                    <td className="p-4 Box_Shedow">{course.description}</td>
                  </tr>
                ))}
                {courses.length === 0 && (
                  <tr>
                    <td colSpan="2" className="text-center text-gray-500 p-4">
                      No courses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>



    </>
  )
}

export default AdminDashboard