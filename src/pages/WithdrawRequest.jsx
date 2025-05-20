import React, { useEffect, useState } from "react";
import {
  getWithdrawRequest,
  approveWithdrawal,
  rejectWithdrawal,
} from "../api/admin-api";
import PageLoader from "../components/ui/PageLoader";
import Swal from "sweetalert2";

const WithdrawRequest = () => {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [withdrawalList, setWithdrawalList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWithdrawalList = async () => {
      try {
        setIsLoading(true);
        const response = await getWithdrawRequest();
        setWithdrawalList(response?.withdrawals || []);
      } catch (error) {
        console.error("Error fetching withdrawal list:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWithdrawalList();
  }, []);

  // Sort: pending → approved → rejected
  const sortedList = [...withdrawalList].sort((a, b) => {
    const statusOrder = { pending: 0, approved: 1, rejected: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const filteredData = sortedList.filter(
    (item) =>
      item?.userId?.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
      item?.userId?.email?.toLowerCase().includes(searchInput.toLowerCase()) ||
      item?._id?.toLowerCase().includes(searchInput.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handleStatusChange = async (id, newStatus) => {
    const currentWithdrawal = withdrawalList.find((item) => item._id === id);
    if (!currentWithdrawal) return;

    const isApproved = newStatus === "approved";
    const inputLabel = isApproved ? "Enter Transaction ID:" : "Enter Rejection Reason:";

    const confirmResult = await Swal.fire({
      title: `Are you sure you want to ${newStatus}?`,
      input: "text",
      inputLabel,
      inputPlaceholder: isApproved ? "Transaction ID" : "Reason",
      showCancelButton: true,
      confirmButtonText: "Submit",
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage("This field is required");
        }
        return value;
      },
    });

    if (!confirmResult.isConfirmed) return;

    const inputValue = confirmResult.value;

    try {
      setIsLoading(true);
      if (isApproved) {
        await approveWithdrawal(id, inputValue);
      } else {
        await rejectWithdrawal(id, inputValue);
      }

      setWithdrawalList((prevList) =>
        prevList.map((item) =>
          item._id === id
            ? {
                ...item,
                status: newStatus,
                transactionId: isApproved ? inputValue : null,
              }
            : item
        )
      );

      Swal.fire({
        icon: "success",
        title: `Withdrawal ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)} Successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(`Failed to ${newStatus} withdrawal:`, error);
      Swal.fire({
        icon: "error",
        title: `Error ${isApproved ? "approving" : "rejecting"} withdrawal`,
        text: error?.response?.data?.message || error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (isoString) => new Date(isoString).toLocaleString();

  return (
    <>
      {isLoading && <PageLoader />}
      <div className="space-y-7">
        <div className="p-5 bg-white rounded-xl overflow-hidden space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium text-gray-800">All Withdrawal Requests</h2>
            <input
              type="text"
              placeholder="Search by User"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full max-w-xs p-2 border border-gray-300 rounded-md outline-none text-sm"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm text-left">
              <thead>
                <tr>
                  <th className="border p-2 text-center">SL</th>
                  <th className="border p-2 text-center">Name</th>
                  <th className="border p-2 text-center">Email</th>
                  <th className="border p-2 text-center">Account Holder</th>
                  <th className="border p-2 text-center">Bank Name</th>
                  <th className="border p-2 text-center">Account No.</th>
                  <th className="border p-2 text-center">IFSC Code</th>
                  <th className="border p-2 text-center">Amount</th>
                  <th className="border p-2 text-center">Status</th>
                  <th className="border p-2 text-center">Transaction ID</th>
                  <th className="border p-2 text-center">Requested At</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={item._id}>
                    <td className="border p-2 text-center">{startIndex + index + 1}</td>
                    <td className="border p-2 text-center capitalize">
                      {item?.userId?.name || "N/A"}
                    </td>
                    <td className="border p-2 text-center">{item?.userId?.email || "N/A"}</td>
                    <td className="border p-2 text-center capitalize">
                      {item?.bankDetails?.accountHolder || "N/A"}
                    </td>
                    <td className="border p-2 text-center capitalize">
                      {item?.bankDetails?.bankName || "N/A"}
                    </td>
                    <td className="border p-2 text-center">
                      {item?.bankDetails?.accountNumber || "N/A"}
                    </td>
                    <td className="border p-2 text-center">
                      {item?.bankDetails?.ifscCode || "N/A"}
                    </td>
                    <td className="border p-2 text-center">₹{item?.amount}</td>
                    <td className="border p-2 text-center">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        disabled={item.status !== "pending"}
                        className={`border rounded px-2 py-1 
                          ${item.status === "pending" ? "text-yellow-500" : ""}
                          ${item.status === "approved" ? "text-green-500" : ""}
                          ${item.status === "rejected" ? "text-red-500" : ""}
                          ${item.status !== "pending" ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="border p-2 text-center">{item?.transactionId || "N/A"}</td>
                    <td className="border p-2 text-center">{formatDate(item?.requestedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Rows per page: {rowsPerPage}</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-2 py-1 border rounded hover:bg-gray-100"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-2 py-1 border rounded ${
                    currentPage === i + 1
                      ? "bg-gray-800 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-2 py-1 border rounded hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithdrawRequest;
