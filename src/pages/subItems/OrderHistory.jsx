import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import { getAllOrders, updateDeliveryStatus } from "../../api/admin-api";
import PageLoader from "../../components/ui/PageLoader";
import SelectComponent from "../../components/SelectComponent";
import { formatDateonly } from "../../utils/dateFunctions";
import Swal from "sweetalert2";

const OrderHistory = () => {
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [data, setData] = useState([]);
  const [filterOrderList, setfilterOrderList] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        setLoading(true);
        const response = await getAllOrders();
        setData(response?.orders);
        setfilterOrderList(response?.orders);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderHistory();
  }, []);

  const headers = [
    "#",
    "Date",
    "Name",
    "Address",
    "Product Details",
    "Shipping Amount",
    "Sub Total",
    "Total",
    "Payment Method",
    "Status",
    "Action",
  ];

  const handleStatusChange = async (orderId, newStatus) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to change the order status to "${newStatus}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        await updateDeliveryStatus(orderId, { status: newStatus });

        Swal.fire("Updated!", "Order status has been updated.", "success");

        const response = await getAllOrders();
        setData(response?.orders);
        setfilterOrderList(response?.orders);
      } catch (error) {
        console.error("Failed to update order status:", error);
        Swal.fire(
          "Error!",
          "There was a problem updating the order status.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFilter = (status) => {
    setOrderStatus(status);
    if (status === "All Orders") {
      return setfilterOrderList(data);
    }
    const filteredOrders = data?.filter(
      (order) => order?.orderStatus === status
    );
    setfilterOrderList(filteredOrders);
  };

  const renderRow = (item, index) => {
  const statusColor = {
    Pending: "text-yellow-500",
    Shipped: "text-blue-500",
    Delivered: "text-green-500",
  };

  const selectBgColor = {
    Pending: "bg-yellow-100",
    Shipped: "bg-blue-100",
    Delivered: "bg-green-100",
  };

  return (
    <>
      <td className="border-r whitespace-nowrap border-b p-2 md:p-3 text-blue-600">{index + 1}</td>
      <td className="border-r whitespace-nowrap border-b p-2 md:p-3">{formatDateonly(item?.createdAt)}</td>
      <td className="border-r whitespace-nowrap border-b p-2 md:p-3 capitalize">{item?.userId?.name?.toLowerCase()}</td>
      <td className="border-r whitespace-nowrap border-b p-2 md:p-3">
        {`${item?.address?.addressLine1}, ${item?.address?.city}, ${item?.address?.state}, ${item?.address?.country}, ${item?.address?.pincode}`}
      </td>
      <td className="border-r whitespace-nowrap border-b p-2 md:p-3">
        {item.items?.map(i => `${i.product?.name} (x${i.quantity})`).join(", ")}
      </td>
      <td className="border-r whitespace-nowrap border-b p-2 md:p-3">₹{item.shippingAmount}</td>
      <td className="border-r whitespace-nowrap border-b p-2 md:p-3">₹{item.amount}</td>
      <td className="border-r whitespace-nowrap border-b p-2 md:p-3">₹{item.totalAmount}</td>
      <td className="border-r whitespace-nowrap border-b p-2 md:p-3">{item.paymentMethod}</td>
      <td className={`border-r whitespace-nowrap border-b p-2 md:p-3 font-semibold ${statusColor[item.orderStatus]}`}>
        {item?.orderStatus}
      </td>
      <td className="border-r whitespace-nowrap border-b p-2 md:p-3">
        <SelectComponent
          name="orderStatus"
          value={item.orderStatus}
          onChange={(e) => handleStatusChange(item._id, e.target.value)}
          options={["Pending", "Shipped", "Delivered"]}
          classname={`text-xs px-2 py-1 ${selectBgColor[item.orderStatus] || "bg-white"} ${statusColor[item.orderStatus]}`}
        />
      </td>
    </>
  );
};


  return (
    <>
      {loading && <PageLoader />}
      <div className="bg-white shadow-xl rounded-xl">
        <div className="p-4">
          <SelectComponent
            label="Filter by Status"
            placeholder="Select status"
            value={orderStatus}
            onChange={(e) => handleFilter(e.target.value)}
            options={["All Orders", "Pending", "Shipped", "Delivered"]}
          />
        </div>
        <TableComponent
          title="Order History"
          headers={headers}
          data={filterOrderList}
          renderRow={renderRow}
          searchKeys={["amount"]}
          searchKey="name"
        />
      </div>
    </>
  );
};

export default OrderHistory;
