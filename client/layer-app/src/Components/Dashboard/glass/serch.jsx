import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GlassSearch = () => {
  const [glassItems, setGlassItems] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = () => {
    axios.get(`http://localhost:5000/api/glass/search?minPrice=${minPrice}&maxPrice=${maxPrice}`)
      .then((response) => setGlassItems(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    handleSearch(); // Fetch data initially
  }, []);

  return (
    <div>
      <h2>Glass Category - Price Filter</h2>
      <div>
        <label>Min Price: </label>
        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
      </div>
      <div>
        <label>Max Price: </label>
        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </div>
      <button onClick={handleSearch}>Search</button>
      <ul>
        {glassItems.map((item) => (
          <li key={item._id}>{item.name} - ${item.price} - {item.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default GlassSearch;
