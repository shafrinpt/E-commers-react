import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../Api/axiosInstance";

const Shafrin = () => {
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  // Drive Formik initial values from state so enableReinitialize is predictable:
  const emptyForm = {
    name: "",
    price: "",
    description: "",
    category: "",
    brand: "",
    image: null,
  };
  const [formValues, setFormValues] = useState(emptyForm);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axiosInstance.get("/api/items");

      setItems(res.data);
    } catch (err) {
      toast.error("❌ Failed to fetch products");
    }
  };

  // Build validation schema dynamically depending on whether we're editing
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than 0")
      .required("Price is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().required("Brand is required"),
    description: Yup.string().max(200, "Description too long"),
    // image required only when adding a new product (edit -> optional)
    image: editId
      ? Yup.mixed().nullable()
      : Yup.mixed().required("Product image is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    // Build FormData
    const data = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      // Append only defined values (image may be null)
      if (value !== null && value !== undefined) data.append(key, value);
    });

    try {
      if (editId) {
        await axios.put(`http://localhost:7001/api/items/${editId}`, data);
        toast.success("✅ Product updated successfully!");
        setEditId(null);
      } else {
        await axios.post("http://localhost:7001/api/items", data);
        toast.success("✅ Product added successfully!");
      }

      await fetchItems();
      resetForm();
      setFormValues(emptyForm); // ensure form cleared
    } catch (err) {
      console.error(err);
      toast.error("❌ Error submitting product");
    } finally {
      setSubmitting(false);
    }
  };

  // When clicking Edit, set editId AND set formValues so Formik reinitializes
  const handleEdit = (item) => {
    setEditId(item._id);
    setFormValues({
      name: item.name ?? "",
      price: item.price ?? "",
      description: item.description ?? "",
      category: item.category ?? "",
      brand: item.brand ?? "",
      image: null, // keep null to avoid forcing re-upload
    });
    toast.info("✏️ Edit mode activated");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7001/api/items/${id}`);
      await fetchItems();
      toast.success("🗑️ Product deleted successfully!");
      // If we deleted the currently edited item, reset form
      if (editId === id) {
        setEditId(null);
        setFormValues(emptyForm);
      }
    } catch (err) {
      toast.error("❌ Error deleting product");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
        {editId ? "Edit Product" : "Add New Product"}
      </h2>

      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize // reinitializes when formValues changes
        // keep validation behaviour sensible; you can toggle these later
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="bg-white shadow-lg p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
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

            {/* Brand */}
            <div>
              <Field
                type="text"
                name="brand"
                placeholder="Brand"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="brand"
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
                accept="image/*"
                className="border p-2 rounded w-full"
                onChange={(e) => {
                  setFieldValue("image", e.currentTarget.files[0] ?? null);
                }}
              />
              <ErrorMessage
                name="image"
                component="p"
                className="text-red-500 text-sm"
              />
              {/* Helpful note for the user in edit mode */}
              {editId && (
                <p className="text-xs text-gray-500 mt-1">
                  Leave image empty to keep existing image.
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white py-2 rounded md:col-span-2"
            >
              {editId ? "Update Product" : "Add Product"}
            </button>
          </Form>
        )}
      </Formik>

      {/* Product List */}
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
              <h4 className="text-lg font-bold">{item.name}</h4>
              <p className="text-gray-600">{item.description}</p>
              <p className="font-bold text-blue-600">₹{item.price}</p>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-sm text-purple-600 font-semibold">{item.brand}</p>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-green-500 text-white px-4 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
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
