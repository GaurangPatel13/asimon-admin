import React, { useEffect, useState } from 'react';
import { getFundRequest } from '../../api/admin-api';
import TableComponent from '../../components/TableComponent';

const FundRequest = () => {
  const headers = [
    '#',
    'Member Name',
    'Account No',
    'Bank Name',
    'IFSC Code',
    'Holder Name',
    'Transaction ID',
    'Date',
    'Amount',
    'Payment Proof',
    'Status',
  ];

  const [filters, setFilters] = useState({
    memberId: '',
    fromDate: '',
    toDate: '',
  });

  const [data, setData] = useState([]);

  const getAllFundRequestHistory = async () => {
    try {
      const response = await getFundRequest();
      const filteredData = (response?.data || []).filter(item => item?.status === 'Requested');
      setData(filteredData);
    } catch (error) {
      console.error('Error fetching fund requests:', error);
    }
  };

  useEffect(() => {
    getAllFundRequestHistory();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    console.log('Searching with filters:', filters);
    // Implement filtering logic if needed
  };

  return (
    <>
      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-white shadow-xl rounded-xl">
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
      </div>

      {/* Table Section */}
      <div className="bg-white shadow-xl rounded-xl mt-4">
        <TableComponent
          title="Fund Request"
          headers={headers}
          data={data}
          searchKeys={['TransactionId', 'HolderName']}
          searchKey="TransactionId and HolderName"
          renderRow={(item, index) => (
            <>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                {(item?.userId?.name?.firstName || '') + ' ' + (item?.userId?.name?.middleName || '') + ' ' + (item?.userId?.name?.lastName || '')}
              </td>
              <td className="border p-2">{item?.AccountNo}</td>
              <td className="border p-2">{item?.BankName}</td>
              <td className="border p-2">{item?.ifscCode}</td>
              <td className="border p-2">{item?.HolderName}</td>
              <td className="border p-2">{item?.TransactionId}</td>
              <td className="border p-2">{new Date(item?.createdAt).toLocaleDateString()}</td>
              <td className="border p-2">₹{item?.amount}</td>
              <td className="border p-2">
                <a href={item?.paymentProof} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View
                </a>
              </td>
              <td className="border p-2">{item?.status}</td>
            </>
          )}
        />

      </div>
    </>
  );
};

export default FundRequest;
