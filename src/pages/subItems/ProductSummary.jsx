import React, { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../components/TableComponent";
import { deleteProduct, getAllProducts } from "../../api/admin-api";
import Swal from "sweetalert2";
import PageLoader from "../../components/ui/PageLoader";

const ProductSummary = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        setProducts(response?.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const headers = [
    "S.No",
    "Name",
    "Category",
    "Image",
    "MRP",
    "Stock",
    "Actions",
  ];

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p._id !== id));
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Failed to delete product.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditClick = (id) => {
    navigate(`/edit-product/${id}`);
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="bg-white rounded-lg w-full">
        <div className="overflow-x-auto">
          <TableComponent
            title="Product Summary"
            headers={headers}
            data={products}
            searchKey="name"
            searchKeys={["name", "description"]}
            renderRow={(item, index) => (
              <>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{item?.name}</td>
                <td className="border p-2">
                  {item?.category?.name || item?.category}
                </td>
                <td className="border p-2">
                  {item?.images?.[0] ? (
                    <img
                      src={item.images[0]}
                      alt="Product"
                      className="w-16 h-10 object-contain"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="border p-2">₹{item?.mrp}</td>
                <td className="border p-2">{item?.stock}</td>
                <td className="border p-2">
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-500 text-white p-2 rounded text-sm"
                      onClick={() => handleEditClick(item._id)}
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded text-sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </td>
              </>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default ProductSummary;
