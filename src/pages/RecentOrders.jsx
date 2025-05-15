import React, { useState } from 'react';
import { IoIosEye } from "react-icons/io";
import TableComponent from '../components/TableComponent';

const RecentOrders = () => {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5); // Set default to 5 entries per page

  // Dummy data (static)
  const orderList = [
    // { id: 10, name: "SUMIT AMLIYAR", fcid:"100159" ,date: "14-02-2025", totalAmount: 15337.50 },
    // { id: 4, name: "SHILA DANGODE", fcid:"10040", date: "15-02-2025", totalAmount: 36860.25 },
    // { id: 3, name: "RAMDAYAL GURJAR (100010)", date: "15-02-2025", totalAmount: 40813.59 },
    // { id: 2, name: "NIKHIL KUMAR (100008)", date: "15-02-2025", totalAmount: 12975.40 },
    // { id: 9, name: "KRISHNPAL CHOUDHARY (100013)", date: "15-02-2025", totalAmount: 16906.76 },
    // { id: 1, name: "KAMLESH GURJAR (100009)", date: "15-02-2025", totalAmount: 23730.81 },
    // { id: 5, name: "JITESH PORWAL (100034)", date: "15-02-2025", totalAmount: 20934.76 },
    // { id: 6, name: "BHUMIKA CHOUHAN (100154)", date: "15-02-2025", totalAmount: 19321.37 },
    // { id: 7, name: "BHARTI EVNEA (100130)", date: "15-02-2025", totalAmount: 15592.00 },
    // { id: 8, name: "ARVIND BEGANA (100018)", date: "15-02-2025", totalAmount: 17496.42 }
  ];

  // Calculate TDS (5%) and Net Amount
  const calculateTDS = (amount) => (amount * 0.05).toFixed(2);
  const calculateNetAmount = (amount) => (amount - (amount * 0.05)).toFixed(2);

  // Updated filteredData logic to fix search issue
  const filteredData = orderList.filter(
    (item) =>
      item?.name?.toLowerCase().includes(searchInput.toLowerCase()) || // Matching name with search input
      item?.id.toString().includes(searchInput.toLowerCase()) // Matching ID with search input
  );

  // Pagination Logic
  // const indexOfLastEntry = currentPage * entriesPerPage;
  // const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(0, 10);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when entries per page changes
  };

  const title = "Recent Transactions";
  const headers = [
    "S.No",
    "Date",
    "Name",
    "FCID",
    "Total Amount",
    "TDS (5%)",
    "Net Amount",
  ];

  return (
    <div className="rounded-xl overflow-hidden space-y-5">
   
        <TableComponent
        showBackButton = {false}
        showPagination = {false}
          title={title}
          headers={headers}
          data={Array.isArray(currentEntries) ? currentEntries : [currentEntries]}
          searchKey="name, fcid, date"
          searchKeys={["name","fcid","date","totalAmount"]}
          renderRow={(item, index) => (
            <>
              <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{index + 1}</td>
              <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item?.date}</td>

              <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item?.name}</td>
              <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item?.fcid}</td>

              <td className='border-r border-b border-text-white/40 p-2 md:p-3'>₹{item?.totalAmount.toFixed(2)}</td>
              <td className='border-r border-b border-text-white/40 p-2 md:p-3'>₹{calculateTDS(item.totalAmount)}</td>
              <td className='border-r border-b border-text-white/40 p-2 md:p-3'>₹{calculateNetAmount(item.totalAmount)}</td>

            </>
          )}
        />
    
     
    </div>
  );
};

export default RecentOrders;
