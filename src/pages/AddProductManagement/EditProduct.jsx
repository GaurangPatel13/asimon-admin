import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { backendConfig } from "../../constants/mainContent";
import { editProduct, getProduct } from "../../api/admin-api";

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from route
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    mrp: "",
    stock: "",
  });

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]); // New images to upload
  const [existingImages, setExistingImages] = useState([]); // Already uploaded images
  const [loading, setLoading] = useState(false);

  // Fetch product by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productData = await getProduct(id);
        const product = productData?.product;

        setForm({
          name: product.name,
          category: product.category,
          description: product.description,
          mrp: product.mrp,
          stock: product.stock,
        });

        setExistingImages(product.images || []);
      } catch (err) {
        console.error("Failed to load product", err);
        Swal.fire("Error", "Could not load product details", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Fetch category options
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${backendConfig.base}/admin/categories`
        );
        setCategories(data?.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
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
      await editProduct(id, formData, token);

      Swal.fire({
        title: "Success!",
        text: "Product updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/product-summary"); // Redirect after update
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire("Error", "Failed to update product.", "error");
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
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>

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
            type="text"
            name="name"
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
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        ))}

        <div>
          <label className="block font-medium mb-1">Upload New Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        {existingImages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {existingImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Existing"
                className="w-16 h-16 object-cover border rounded"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
