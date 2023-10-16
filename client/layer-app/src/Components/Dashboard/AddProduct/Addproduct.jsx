import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [add, setAdd] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    image: null,
  });

  const showAdd = () => {
    setAdd(!add);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === 'file' ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, quantity, image } = formData;
    const productData = new FormData();
    productData.append('name', name);
    productData.append('description', description);
    productData.append('price', price);
    productData.append('quantity', quantity);
    productData.append('image', image);

    console.log(formData)
    try {
      const response = await axios.post('/api/products', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product created:', response.data);
      // Clear the form or handle redirection
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <>
      <button onClick={showAdd}>Add products</button>
      {add && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}

export default AddProduct;
