
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchItemsByCategory = () => {
    axios.get(`http://localhost:5000/api/items/${selectedCategory}`)
      .then((response) => setItems(response.data))
      .catch((error) => console.error(error));
  };

  // useEffect(() => {
  //   if (selectedCategory) {
  //     fetchItemsByCategory();
  //   }
  // }, [selectedCategory]);

  useEffect(() => {
    // Fetch data initially when the component mounts
    if (selectedCategory) {
          fetchItemsByCategory();
        }

    // Polling interval (e.g., every 5 seconds)
    const interval = setInterval(() => {
      fetchItemsByCategory();
    }, 5000); // Adjust the interval as needed (in milliseconds)

    // Cleanup when the component unmounts or when the category changes
    return () => {
      clearInterval(interval);
    };
  }, [selectedCategory]);

  return (
    <div>
      <h2>Item List</h2>
      <label>Select Category:</label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="glass">Glass</option>
        <option value="perfume">Perfume</option>
        <option value="cloth">Cloth</option>
      </select>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
