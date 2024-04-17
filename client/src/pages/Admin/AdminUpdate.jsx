import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";

 const AdminUpdate = () => {
    const { auth} = useAuth();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address:"",
  });
  const params = useParams();


  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/user/data/update/${params.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth?.token,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Updated successfully");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const getSingleUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/data/${params.id}`, {
        method: "GET",
        headers: {
            Authorization: auth?.token,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setData(userData);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <h1 className="text-2xl font-bold mb-4">Update User Data</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={data.username} onChange={handleChange} placeholder="Name" className="block w-full mb-4 border-gray-300 rounded-md p-2" />
            <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Email" className="block w-full mb-4 border-gray-300 rounded-md p-2" />
            <input type="text" name="phone" value={data.phone} onChange={handleChange} placeholder="Phone" className="block w-full mb-4 border-gray-300 rounded-md p-2" />
            <input type="text" name="phone" value={data.address} onChange={handleChange} placeholder="address" className="block w-full mb-4 border-gray-300 rounded-md p-2" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</button>
          </form>
        </div>
        <div>
          <img src="https://thumbs.dreamstime.com/b/social-media-stay-connected-concept-people-using-81499037.jpg" alt="contact" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

export default AdminUpdate;