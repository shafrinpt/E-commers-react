import React, { useState, useEffect } from "react";
import axios from "axios";

const Shafrin = () => {
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  // ✅ Fetch all products from backend
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/items");
    setItems(res.data);
  };

  // ✅ Input change handler
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  // ✅ Submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    if (editId) {
      await axios.put(`http://localhost:5000/api/items/${editId}`, data);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/items", data);
    }

    // ✅ Refresh items without reloading page
    fetchItems();

    // ✅ Clear form
    setFormData({ name: "", price: "", description: "", category: "", image: null });
  };

  // ✅ Edit product
  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData({
      name: item.name,
      price: item.price,
      description: item.description,
      category: item.category,
      image: null, // image stays null until user uploads
    });
  };

  // ✅ Delete product
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems(); // Refresh list after delete
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
        {editId ? "Edit Product" : "Add New Product"}
      </h2>

      {/* ✅ Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded focus:ring-2 focus:ring-blue-400 md:col-span-2"
          rows="3"
        ></textarea>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border p-2 rounded focus:ring-2 focus:ring-blue-400 md:col-span-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 w-full md:col-span-2"
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* ✅ Product List */}
      <h3 className="text-2xl font-bold text-gray-700 mt-10 mb-4">Product List</h3>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">No products added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
              {item.image && (
                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.name}
                  className="h-40 w-full object-cover rounded mb-3"
                />
              )}
              <h4 className="text-lg font-bold text-gray-800">{item.name}</h4>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-blue-600 font-bold">₹{item.price}</p>
              <p className="text-sm font-semibold text-gray-500">{item.category}</p>
              <div className="flex justify-between mt-3">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shafrin;
