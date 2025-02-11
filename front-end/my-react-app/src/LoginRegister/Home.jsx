import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = ({ user }) => {
  const[items, setItems] = useState([]);
  const categories = ['Security', 'Science', 'Computer Science']; // Example categories

  const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/questions/${category}`); // Redirect to Questions.jsx with the category
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(`http://localhost:5000/users/users`);
        if (!res.data || res.data.length === 0) {
          alert("Items not found");
          return;
        }
        setItems(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
        alert(error.response ? error.response.data.message : "Error occurred");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      
       <div className="container">
      {items.map((item) => (
        <div key={item._id} className="item-card">
          <h2>{item.name}</h2>
          <p>{item.email}</p>
        </div>
      ))}
    </div>
    <div className="bg-blue-500 text-white p-4">Hello Tailwind!</div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h1>
          <p className="text-lg">Your Score: <span className="font-semibold">{user?.score || 0}</span></p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <h1 className="text-3xl font-bold text-gray-700 mb-6">Choose a Category</h1>
  <div className="flex flex-wrap justify-center gap-4">
    {categories.map((category) => (
      <button
        key={category}
        className="bg-green-500 text-white text-lg px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-300 capitalize"
        onClick={() => handleCategoryClick(category)}
      >
        {category}
      </button>
    ))}
  </div>
</div>

   </>
  )
};

export default Home