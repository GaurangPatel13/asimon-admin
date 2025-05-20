import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { backendConfig } from "../../constants/mainContent";

const ProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    mrp: "",
    stock: "",
  });

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${backendConfig.base}/admin/categories`);
        setCategories(data?.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    const validFiles = selectedFiles.filter((file) =>
      allowedTypes.includes(file.type)
    );

    if (validFiles.length !== selectedFiles.length) {
      Swal.fire({
        icon: "warning",
        title: "Invalid File Type",
        text: "Only JPEG, JPG, and PNG images are allowed.",
      });

      // Clear file input and reset state
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setImages([]);
      return;
    }

    setImages(validFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const formData = new FormData();

    for (const key in form) {
      formData.append(key, form[key]);
    }

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const { data } = await axios.post(
        `${backendConfig.base}/admin/add-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: "Product Created!",
        text: "Your product has been successfully created.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setForm({
        name: "",
        category: "",
        description: "",
        mrp: "",
        stock: "",
      });
      setImages([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error creating product:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to create product.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mx-auto p-6 border rounded shadow max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4">Create Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {[
          { label: "Description", name: "description", type: "text" },
          { label: "MRP", name: "mrp", type: "number", step: "0.01" },
          { label: "Stock", name: "stock", type: "number" },
        ].map((input) => (
          <div key={input.name}>
            <label className="block font-medium mb-1">{input.label}</label>
            <input
              {...input}
              value={form[input.name]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
              required
            />
          </div>
        ))}

        <div>
          <label className="block font-medium mb-1">Upload Images</label>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            multiple
            onChange={handleImageChange}
            ref={fileInputRef}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
