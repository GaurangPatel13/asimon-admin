import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ButtonWithIcon from "../../components/ButtonWithIcon";
import TableComponent from "../../components/TableComponent";
import { deleteProduct, getAllProducts, updateStockStatus } from "../../api/admin-api";
import Swal from "sweetalert2";
import PageLoader from "../../components/ui/PageLoader";
import ProductForm from "../AddProductManagement/ProductForm";
import Modal from "../../components/Modal";
import ToggleButton from "../../components/ToggleButton";

const ProductSummary = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        setProducts(response?.data);
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
    "Category ID",
    "DP",
    "SP",
    "MRP",
    "PV",
    "Stock",
    "Image",
    "Active",
    "Action"
  ];

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteProduct(id);
      setProducts(prev => prev.filter((p) => p._id !== id));
      Swal.fire("Deleted!", "Product has been deleted.", "success");
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStockStatus = async (id) => {
    try {
      setLoading(true);
      await updateStockStatus(id);
      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, isActive: !p.isActive } : p
        )
      );
    } catch (err) {
      console.error("Stock status error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
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
                <td className="border p-2">{item?.category?.name}</td>
                <td className="border p-2">{item?.dp}</td>
                <td className="border p-2">{item?.sp}</td>
                <td className="border p-2">{item?.mrp}</td>
                <td className="border p-2">{item?.pv}</td>
                <td className="border p-2">{item?.stock}</td>
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
                <td className="border p-2">
                  <ToggleButton
                    isEnabled={item?.isActive}
                    onToggle={() => handleStockStatus(item._id)}
                  />
                </td>
                <td className="border p-2">
                  <div className="flex gap-2">
                    <ButtonWithIcon
                      title="Edit"
                      icon={<BiEdit />}
                      onClick={() => handleEdit(item)}
                      bgcolor="bg-green-500"
                    />
                    <ButtonWithIcon
                      title="Delete"
                      icon={<RiDeleteBin6Line />}
                      onClick={() => handleDelete(item._id)}
                      bgcolor="bg-red-500"
                    />
                  </div>
                </td>
              </>
            )}
          />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Update Product">
        <ProductForm productData={selectedProduct} isEditMode={true} />
      </Modal>
    </>
  );
};

export default ProductSummary;
