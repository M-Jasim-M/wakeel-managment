import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({ name: '', email: '', category: '', price: '', image: null });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === 'file' ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append('name', formData.name);
    productData.append('email', formData.email);
    productData.append('category', formData.category);
    productData.append('price', formData.price);
    productData.append('image', formData.image);

    axios.post('http://localhost:5000/api/items', productData)
      .then((response) => {
        console.log('Data sent successfully:', response.data);
        setFormData({ name: '', email: '', category: '', price: '', image: null }); // Clear the form after submission
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };

  return (
    <form>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Select Category</option>
        <option value="glass">Glass</option>
        <option value="perfume">Perfume</option>
        <option value="cloth">Cloth</option>
      </select>
      <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
      <input type="file" name="image" onChange={handleChange} accept="image/*" />
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default Form;
