import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/TableComponent';
import { getAllOrders } from '../../api/admin-api';
import PageLoader from '../../components/ui/PageLoader';
import SelectComponent from '../../components/SelectComponent';
import { formatDateonly } from '../../utils/dateFunctions';


const OrderHistory = () => {
  const [loading, setLoading] = useState(false);
    const [orderStatus, setOrderStatus] = useState('');
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
        console.error('Error fetching order history:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrderHistory()
  }, [])

  const headers = [
    '#', 'Date', 'FCID', 'Name', 'Amount', 'AMSD', 'GST', 'Shipping', 'Total', 'Status', 'Action'
  ];


  const [status, setStatus] = useState("");

  const handleStatusChange = (newStatus) => {
    console.log(newStatus)
    setStatus(newStatus);
    // You can also trigger an API call or update table row status here
  };
  
   const handleFilter = (status) => {
    setOrderStatus(status);

    if (status === 'All Orders') {
      return setfilterOrderList(data);
      } 
    if (status == "Pending") {
      const filterOrders = data?.filter((order) => order?.orderStatuses === "Pending");
      setfilterOrderList(filterOrders);
    }
    if (status == "Proceed") {
      const filterOrders = data?.filter((order) => order?.orderStatuses === "Processing");
      setfilterOrderList(filterOrders);
    }
    if (status == "Cancel") {
      const filterOrders = data?.filter((order) => order?.orderStatuses === "Cancel");
      setfilterOrderList(filterOrders);
    }
    if (status == "Delivered") {
      const filterOrders = data?.filter((order) => order?.orderStatuses === "Delivered");
      setfilterOrderList(filterOrders);
    }
    if (status == "Dispatched") {
      const filterOrders = data?.filter((order) => order?.orderStatuses === "Dispatched");
      setfilterOrderList(filterOrders);
    }
  }

  const renderRow = (item, index) => (
    <>
      <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3  text-blue-600 cursor-pointer">{index+1}</td>
      <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{formatDateonly(item?.createdAt)}</td>
      <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item?.userId?.username}</td>
      <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item?.userId?.name}</td>
      <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item.amount}</td>
      <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item.amsd}</td>
      <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item.gst}</td>
      <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item.shipping}</td>
      <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item.total}</td>
      <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item?.orderStatuses}</td>
      <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">
        <SelectComponent
          name="orderStatus"
          value={status} 
          onChange={(e) => handleStatusChange(e.target.value)} 
          options={[
            { label: "Proceed", value: "proceed" },
            { label: "Dispatched", value: "dispatched" },
            { label: "Delivered", value: "delivered" },
            { label: "Cancel", value: "cancel" }
          ]}
          classname="text-xs px-2 py-1 bg-white"
        />
      </td>
    </>
  );


  return (
    <>
      {loading && <PageLoader />}
      <div className="bg-white shadow-xl rounded-xl">
         <div className='p-4'>
          <SelectComponent
            label="Filter by Status"
            placeholder="Select status"
            value={orderStatus}
            onChange={(e) => handleFilter(e.target.value)}
            options={["All Orders","Proceed", "Dispatched", "Delivered","Cancel","Pending"]}
          />
        </div>
        <TableComponent
          title="Order History"
          headers={headers}
          data={filterOrderList}
          renderRow={renderRow}
          searchKeys={['amount']}
          searchKey="name"
        />
      </div>
    </>

  );
};

export default OrderHistory;
