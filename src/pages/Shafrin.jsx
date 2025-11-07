import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Shafrin = () => {
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  // ✅ Fetch all products from backend
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      setItems(res.data);
    } catch (err) {
      toast.error("❌ Failed to fetch products");
    }
  };

  // ✅ Yup validation rules
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than 0")
      .required("Price is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().max(200, "Description too long"),
    image: Yup.mixed().required("Product image is required"),
  });

  // ✅ Handle Submit (for both Add / Update)
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    const data = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/items/${editId}`, data);
        toast.success("✅ Product updated successfully!");
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/items", data);
        toast.success("✅ Product added successfully!");
      }

      fetchItems();
      resetForm();
    } catch (err) {
      toast.error("❌ Error submitting product");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Handle Edit
  const handleEdit = (item, setValues) => {
    setEditId(item._id);
    setValues({
      name: item.name,
      price: item.price,
      description: item.description,
      category: item.category,
      image: null,
    });
    toast.info("✏️ Edit mode activated");
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchItems();
      toast.success("🗑️ Product deleted successfully!");
    } catch (err) {
      toast.error("❌ Error deleting product");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
        {editId ? "Edit Product" : "Add New Product"}
      </h2>

      {/* ✅ Formik Wrapper */}
      <Formik
        initialValues={{
          name: "",
          price: "",
          description: "",
          category: "",
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue, isSubmitting, setValues, values }) => (
          <Form className="bg-white shadow-lg p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Name */}
            <div>
              <Field
                type="text"
                name="name"
                placeholder="Product Name"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Price */}
            <div>
              <Field
                type="number"
                name="price"
                placeholder="Price"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="price"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Category */}
            <div>
              <Field
                type="text"
                name="category"
                placeholder="Category"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="category"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <Field
                as="textarea"
                name="description"
                rows="3"
                placeholder="Description"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="description"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <input
                type="file"
                name="image"
                accept="image/*"
                className="border p-2 rounded w-full"
                onChange={(e) =>
                  setFieldValue("image", e.currentTarget.files[0])
                }
              />
              <ErrorMessage
                name="image"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded md:col-span-2"
            >
              {editId ? "Update Product" : "Add Product"}
            </button>
          </Form>
        )}
      </Formik>

      {/* ✅ Product List */}
      <h3 className="text-2xl font-bold text-gray-700 mt-10 mb-4">
        Product List
      </h3>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center">No products added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white shadow-md rounded-lg p-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 w-full object-cover rounded mb-3"
                />
              )}
              <h4 className="text-lg font-bold text-gray-800">{item.name}</h4>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-blue-600 font-bold">₹{item.price}</p>
              <p className="text-sm font-semibold text-gray-500">
                {item.category}
              </p>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => handleEdit(item, (vals) => setValues(vals))}
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
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
