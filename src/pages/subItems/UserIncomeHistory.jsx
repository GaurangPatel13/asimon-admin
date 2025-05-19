import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import { getIncomeHistory } from "../../api/admin-api"; // Update this path if needed

const UserIncomeHistory = () => {
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
    console.log("Search triggered with filters:", filters);
    // Optional: Add filter logic for dates or member ID if needed
  };

  const getAllIncomeHistory = async () => {
    try {
      const response = await getIncomeHistory();
      const transformed = (response?.history || []).map((entry) => {
        const isTeamBonus = entry.type === "team_bonus";

        return {
          type: entry.type,
          level: entry.level ?? "N/A",
          amount: isTeamBonus ? "N/A" : entry.amount,
          teamBonus: isTeamBonus ? entry.amount : "N/A",
          description: entry.description,
          receiveDate: new Date(entry.createdAt).toLocaleString(),
          userName: entry.user?.name ?? "N/A",
          userEmail: entry.user?.email ?? "N/A",
          userSponsorId: entry.user?.sponsorId ?? "N/A",
          fromUserName: isTeamBonus ? "N/A" : entry.fromUser?.name ?? "N/A",
          fromUserEmail: isTeamBonus ? "N/A" : entry.fromUser?.email ?? "N/A",
          fromUserSponsorId: isTeamBonus ? "N/A" : entry.fromUser?.sponsorId ?? "N/A",
        };
      });

      setData(transformed);
    } catch (error) {
      console.error("Error fetching income history:", error);
    }
  };

  useEffect(() => {
    getAllIncomeHistory();
  }, []);

  const headers = [
    "#",
    "Type",
    "Level",
    "Amount",
    "Team Bonus",
    "Description",
    "Receive Date",
    "User Name",
    "User Email",
    "User Sponsor ID",
    "From User Name",
    "From User Email",
    "From User Sponsor ID",
  ];

  return (
    <>
      {/* Filter UI can be enabled if needed
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
      */}

      <div className="bg-white shadow-xl rounded-xl mt-4">
        <TableComponent
          title="User Income History"
          headers={headers}
          data={data}
          searchKeys={["userName", "userEmail"]}
          searchKey="User Name or Email"
          renderRow={(item, index) => (
            <>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2 capitalize">{item.type.replace(/_/g, " ")}</td>
              <td className="border p-2">{item.level}</td>
              <td className="border p-2">
                {item.amount !== "N/A" ? `₹${item.amount}` : "N/A"}
              </td>
              <td className="border p-2">
                {item.teamBonus !== "N/A" ? `₹${item.teamBonus}` : "N/A"}
              </td>
              <td className="border p-2">{item.description}</td>
              <td className="border p-2">{item.receiveDate}</td>
              <td className="border p-2 capitalize">{item.userName.toLowerCase()}</td>
              <td className="border p-2">{item.userEmail}</td>
              <td className="border p-2">{item.userSponsorId}</td>
              <td className="border p-2 capitalize">{item.fromUserName.toLowerCase()}</td>
              <td className="border p-2">{item.fromUserEmail}</td>
              <td className="border p-2">{item.fromUserSponsorId}</td>
            </>
          )}
        />
      </div>
    </>
  );
};

export default UserIncomeHistory;
