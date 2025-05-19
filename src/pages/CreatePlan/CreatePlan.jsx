// src/pages/CreatePlan.jsx
import React, { useState } from "react";
import { createPlan } from "../../api/admin-api";
import PageLoader from "../../components/ui/PageLoader";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { Routers } from "../../constants/Routes";

export default function CreatePlan() {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    description: "",
  });

  const Navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "amount" ? (value === "" ? "" : parseInt(value, 10)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await createPlan(formData);
      swal.fire({
        icon: "success",
        title: "Plan created successfully!",
        text: "You will be redirected to All Plans page.",
      }).then(() => Navigate('/all-plans'));
    } catch (error) {
      swal.fire({
        icon: "error",
        title: "Error creating plan",
        text: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="flex items-center justify-center bg-gray-100 p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6">Create Plan</h2>

          <label className="block mb-4">
            <span className="block text-gray-700">Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-4 py-2"
            />
          </label>

          <label className="block mb-4">
            <span className="block text-gray-700">Amount</span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-4 py-2 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
            />
          </label>

          <label className="block mb-6">
            <span className="block text-gray-700">Description</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-4 py-2 resize-none"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>

          {responseMsg && (
            <p className="mt-4 text-center text-sm text-gray-700">
              {responseMsg}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
