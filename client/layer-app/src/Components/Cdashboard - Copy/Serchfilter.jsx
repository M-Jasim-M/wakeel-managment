import React, { useState } from 'react';

function LayerSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [layers, setLayers] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchLayers = async () => {
    try {
      // Send an AJAX request to your Express API
      const response = await fetch(`http://localhost:5000/api/layers?searchTerm=${searchTerm}`);
      const data = await response.json();

      if (data.success) {
        setLayers(data.layers);
      } else {
        // Handle error response
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for layers..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={searchLayers}>Search</button>

      <div>
        {layers.map((layer) => (
          <div key={layer._id}>
            <h3>{layer.name}</h3>
            {/* Display other layer details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LayerSearch;
