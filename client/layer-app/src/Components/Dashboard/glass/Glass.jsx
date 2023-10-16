// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Glass = () => {
//   const [glassItems, setGlassItems] = useState([]);

//   const fetchData = () => {
//     axios
//       .get('http://localhost:5000/api/glass')
//       .then((response) => setGlassItems(response.data))
//       .catch((error) => console.error(error));
//   };

//   useEffect(() => {
//     // Fetch data initially
//     fetchData();

//     // Polling interval (e.g., every 5 seconds)
//     const interval = setInterval(() => {
//       fetchData();
//     }, 1000); // Adjust the interval as needed (in milliseconds)

//     // Cleanup when the component unmounts
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       <h2>Glass Category</h2>
//       <ul>
//         {glassItems.map((item) => (
//           <li key={item._id}>{item.name} - {item.email} - {item.price}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Glass;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Glass = () => {
//   const [glassItems, setGlassItems] = useState([]);

//   const fetchData = () => {
//     axios
//       .get('http://localhost:5000/api/glass')
//       .then((response) => setGlassItems(response.data))
//       .catch((error) => console.error(error));
//   };

//   const handleDelete = (productId) => {
//     axios
//       .delete(`http://localhost:5000/api/glass/${productId}`)
//       .then(() => {
//         // If deletion is successful, fetch updated data
//         fetchData();
//       })
//       .catch((error) => console.error(error));
//   };

//   useEffect(() => {
//     // Fetch data initially
//     fetchData();

//     // Polling interval (e.g., every 5 seconds)
//     const interval = setInterval(() => {
//       fetchData();
//     }, 1000); // Adjust the interval as needed (in milliseconds)

//     // Cleanup when the component unmounts
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       <h2>Glass Category</h2>
//       <ul>
//         {glassItems.map((item) => (
//           <li key={item._id}>
//             {item.name} - {item.email} - ${item.price}
//             <button onClick={() => handleDelete(item._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Glass;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Glass = () => {
//   const [glassItems, setGlassItems] = useState([]);
//   const [updateFormData, setUpdateFormData] = useState({
//     name: '',
//     email: '',
//     price: '',
//   });

//   const fetchData = () => {
//     axios
//       .get('http://localhost:5000/api/glass')
//       .then((response) => setGlassItems(response.data))
//       .catch((error) => console.error(error));
//   };

//   const handleUpdate = (productId) => {
//     axios
//       .put(`http://localhost:5000/api/glass/${productId}`, updateFormData)
//       .then(() => {
//         // If update is successful, fetch updated data
//         fetchData();
//         // Clear the form data
//         setUpdateFormData({
//           name: '',
//           email: '',
//           price: '',
//         });
//       })
//       .catch((error) => console.error(error));
//   };

//   const handleDelete = (productId) => {
//     axios
//       .delete(`http://localhost:5000/api/glass/${productId}`)
//       .then(() => {
//         // If deletion is successful, fetch updated data
//         fetchData();
//       })
//       .catch((error) => console.error(error));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     // Keep the existing values for fields that are not being updated
//     setUpdateFormData({ ...updateFormData, [name]: value });
//   };

//   useEffect(() => {
//     // Fetch data initially
//     fetchData();

//     // Polling interval (e.g., every 5 seconds)
//     const interval = setInterval(() => {
//       fetchData();
//     }, 1000); // Adjust the interval as needed (in milliseconds)

//     // Cleanup when the component unmounts
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       <h2>Glass Category</h2>
//       <ul>
//         {glassItems.map((item) => (
//           <li key={item._id}>
//             {item.name} - {item.email} - ${item.price}
//             <button onClick={() => handleUpdate(item._id)}>Update</button>
//             <button onClick={() => handleDelete(item._id)}>Delete</button>
//             <form>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={updateFormData.name || item.name}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={updateFormData.email || item.email}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="number"
//                 name="price"
//                 placeholder="Price"
//                 value={updateFormData.price || item.price}
//                 onChange={handleInputChange}
//               />
//             </form>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Glass;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Glass = () => {
//   const [glassItems, setGlassItems] = useState([]);
//   const [updateFormData, setUpdateFormData] = useState({
//     name: '',
//     email: '',
//     price: '',
//   });
//   const [selectedItem, setSelectedItem] = useState(null); // Track the selected item

//   const fetchData = () => {
//     axios
//       .get('http://localhost:5000/api/glass')
//       .then((response) => setGlassItems(response.data))
//       .catch((error) => console.error(error));
//   };

//   const handleUpdate = (productId) => {
//     axios
//       .put(`http://localhost:5000/api/glass/${productId}`, updateFormData)
//       .then(() => {
//         // If update is successful, fetch updated data
//         fetchData();
//         // Clear the form data
//         setUpdateFormData({
//           name: '',
//           email: '',
//           price: '',
//         });
//         setSelectedItem(null); // Clear the selected item
//       })
//       .catch((error) => console.error(error));
//   };

//   const handleDelete = (productId) => {
//     axios
//       .delete(`http://localhost:5000/api/glass/${productId}`)
//       .then(() => {
//         // If deletion is successful, fetch updated data
//         fetchData();
//       })
//       .catch((error) => console.error(error));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     // Update the form data with the new values
//     setUpdateFormData({ ...updateFormData, [name]: value });
//   };

//   const handleSelectItem = (item) => {
//     // Set the selected item and populate the form data with its values
//     setSelectedItem(item);
//     setUpdateFormData({
//       name: item.name,
//       email: item.email,
//       price: item.price,
//     });
//   };

//   useEffect(() => {
//     // Fetch data initially
//     fetchData();

//     // Polling interval (e.g., every 5 seconds)
//     const interval = setInterval(() => {
//       fetchData();
//     }, 1000); // Adjust the interval as needed (in milliseconds)

//     // Cleanup when the component unmounts
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       <h2>Glass Category</h2>
//       <ul>
//         {glassItems.map((item) => (
//           <li key={item._id}>
//             {item.name} - {item.email} - ${item.price}
  
//             <button onClick={() => handleSelectItem(item)}>Select</button>
//           </li>
//         ))}
//       </ul>
//       {selectedItem && (
//         <form>
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={updateFormData.name}
//             onChange={handleInputChange}
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={updateFormData.email}
//             onChange={handleInputChange}
//           />
//           <input
//             type="number"
//             name="price"
//             placeholder="Price"
//             value={updateFormData.price}
//             onChange={handleInputChange}
//           />

// <button onClick={() => handleUpdate(selectedItem._id)}>Update</button>
//           <button onClick={() => handleDelete(selectedItem._id)}>Delete</button>
   
//         </form>
        
//       )}
//     </div>
//   );
// };

// export default Glass;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Glass = () => {
  const [glassItems, setGlassItems] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    email: '',
    price: '',
  });
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected item

  const fetchData = () => {
    axios
      .get('http://localhost:5000/api/glass')
      
      .then((response) => setGlassItems(response.data)
      )
      .catch((error) => console.error(error));
  };

  const handleUpdate = (productId) => {
    axios
      .put(`http://localhost:5000/api/glass/${productId}`, updateFormData)
      .then(() => {
        // If update is successful, fetch updated data
        fetchData();
        // Clear the form data
        setUpdateFormData({
          name: '',
          email: '',
          price: '',
        });
        setSelectedItem(null); // Clear the selected item
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:5000/api/glass/${productId}`)
      .then(() => {
        // If deletion is successful, fetch updated data
        fetchData();
      })
      .catch((error) => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the form data with the new values
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  const handleSelectItem = (item) => {
    // Set the selected item and populate the form data with its values
    setSelectedItem(item);
    setUpdateFormData({
      name: item.name,
      email: item.email,
      price: item.price,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Call the update function here or add validation logic if needed
    if (selectedItem) {
      handleUpdate(selectedItem._id);
    }
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
      <h2>Glass Category</h2>
      <ul>
        {glassItems.map((item) => (
          <li key={item._id}>
            {item.name} - {item.email} - ${item.price}
            <img  style={{width:"200px",height:'200px'}} src={`http://localhost:5000/${item.image}`}/>
   
         <button onClick={() => handleSelectItem(item)}>Select</button>
          </li>
        ))}
      </ul>
      {selectedItem && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={updateFormData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={updateFormData.email}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={updateFormData.price}
            onChange={handleInputChange}
          />
          <button type="submit">Update</button>
          <button onClick={() => handleDelete(selectedItem._id)}>Delete</button>
          <button onClick={() => handleSelectItem('')}>cancle</button>
        </form>
      )}
    </div>
  );
};

export default Glass;
