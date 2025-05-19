import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import { getTransactionRequest } from "../../api/admin-api";

const FundHistory = () => {
  const [filters, setFilters] = useState({
    memberId: "",
    fromDate: "",
    toDate: "",
  });

  const [data, setData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    // Implement filtering logic here if needed
    // For now, just log it
    console.log("Search triggered with filters:", filters);
  };

  const getAllFundRequestHistory = async () => {
    try {
      const response = await getTransactionRequest();
      console.log("Fetched transactions:", response?.transactions);
      setData(response?.transactions || []);
    } catch (error) {
      console.error("Error fetching fund requests:", error);
    }
  };

  useEffect(() => {
    getAllFundRequestHistory();
  }, []);

  const headers = [
    "#",
    "Member Name",
    "Plan Name",
    "Amount",
    "Payment Id",
    "Payment Status",
    "Payment Method",
    "Date",
  ];

  return (
    <>
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-white shadow-xl rounded-xl">
        <div>
          <label className="block text-sm font-medium mb-1">Member ID:</label>
          <div className="flex">
            <input
              type="text"
              name="memberId"
              value={filters.memberId}
              onChange={handleInputChange}
              placeholder="Search Member ID"
              className="w-full border border-gray-300 px-3 py-2 rounded-l-md text-sm focus:outline-none"
            />
            <button
              className="bg-bg-color text-white px-4 rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">From Date:</label>
          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">To Date:</label>
          <input
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
          />
        </div>

        <div className="flex items-end">
          <button
            className="w-full bg-bg-color text-white py-2 px-4 rounded-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div> */}

      <div className="bg-white shadow-xl rounded-xl mt-4">
        <TableComponent
          title="User Transaction History"
          headers={headers}
          data={data}
          searchKeys={["paymentId"]}
          searchKey="Payment ID"
          renderRow={(item, index) => (
            <>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2 capitalize">{item?.user?.name.toLowerCase() || "N/A"}</td>
              <td className="border p-2">{item?.plan?.name || "N/A"}</td>
              <td className="border p-2">₹{item?.amount}</td>
              <td className="border p-2">{item?.paymentId}</td>
              <td className="border p-2 capitalize">{item?.paymentStatus}</td>
              <td className="border p-2">{item?.paymentMethod}</td>
              <td className="border p-2">
                {new Date(item?.createdAt).toLocaleDateString()}
              </td>
            </>
          )}
        />
      </div>
    </>
  );
};

export default FundHistory;
