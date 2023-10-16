import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Perfume = () => {
  const [glassItems, setGlassItems] = useState([]);

  const fetchData = () => {
    axios
      .get('http://localhost:5000/api/perfume')
      .then((response) => setGlassItems(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Polling interval (e.g., every 5 seconds)
    const interval = setInterval(() => {
      fetchData();
    }, 1000); // Adjust the interval as needed (in milliseconds)

    // Cleanup when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>perfume Category</h2>
      <ul>
        {glassItems.map((item) => (
          <li key={item._id}>{item.name} - {item.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Perfume;
