// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const GlassSearchn = () => {
//   const [glassItems, setGlassItems] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = () => {
//     axios.get(`http://localhost:5000/api/gla/search?query=${searchQuery}`)
//       .then((response) => setGlassItems(response.data))
//       .catch((error) => console.error(error));
//   };

//   useEffect(() => {
//     handleSearch(); // Fetch data initially

//     const interval = setInterval(() => {
//         handleSearch();
//       }, 1000); // Adjust the interval as needed (in milliseconds)
  
//       // Cleanup when the component unmounts
//       return () => clearInterval(interval);
//   }, [searchQuery]);

//   return (
//     <div>
//       <h2>Glass Category - Name Search</h2>
//       <div>
//         <label>Search by Name (First 3 Letters): </label>
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>
//       <ul>
//         {glassItems.map((item) => (
//           <li key={item._id}>{item.name} - ${item.price}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default GlassSearchn;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GlassSearch = () => {
  const [glassItems, setGlassItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = () => {
    axios.get(`http://localhost:5000/api/gla/search?query=${searchQuery}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
      .then((response) => setGlassItems(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    handleSearch(); // Fetch data initially

    const interval = setInterval(() => {
        handleSearch();
    }, 1000);
    return ()=> clearInterval(interval);
  }, [searchQuery, minPrice, maxPrice]);

  return (
    <div>
      <h2>Glass Category - Name and Price Search</h2>
      <div>
        <label>Search by Name (First 3 Letters): </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        <label>Minimum Price:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <label>Maximum Price:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <ul>
        {glassItems.map((item) => (
          <li key={item._id}>{item.name} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default GlassSearch;

