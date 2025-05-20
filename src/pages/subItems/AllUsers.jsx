import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/TableComponent';
import { IoCheckmarkSharp } from "react-icons/io5";
import { ImBlocked } from "react-icons/im";
import { FaEye } from 'react-icons/fa6';
import { getAllUsersList, updateUser } from '../../api/admin-api';
import PageLoader from '../../components/ui/PageLoader';
import { Routers } from '../../constants/Routes';
import { useLocation, useNavigate } from 'react-router-dom';
// import SelectComponent from '../../components/SelectComponent'; // You can enable if needed

const AllUsers = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userStatus, setUserStatus] = useState('All');
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [filterUserList, setFilterUserList] = useState([]);

  useEffect(() => {
    fetchUsersList();
  }, []);

  useEffect(() => {
    if (userList.length) {
      handleFilter(userStatus);
    }
  }, [userStatus, userList]);

  const fetchUsersList = async () => {
    try {
      setLoading(true);
      const response = await getAllUsersList();

      if (response?.success) {
        // Sort users by newest first using createdAt
        const sortedUsers = [...response.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setUserList(sortedUsers);
        setFilterUserList(sortedUsers);
        setUserStatus(location.state || 'All');
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserStatus = async (id, newstatus) => {
    try {
      setLoading(true);
      const response = await updateUser(id, { status: newstatus });

      if (response.success) {
        await fetchUsersList();
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (status) => {
    setUserStatus(status);
    if (status === "All") {
      setFilterUserList(userList);
    } else if (status === "Active") {
      setFilterUserList(userList.filter((user) => user?.status === true));
    } else if (status === "In Active") {
      setFilterUserList(userList.filter((user) => user?.status === false));
    }
  };

  const headers = ['#', 'UserID', 'Name', 'Mobile', 'SponsorID', 'ReferredBy'];

  return (
    <>
      {loading && <PageLoader />}
      <div className='bg-white shadow-xl rounded-xl'>
        {/* Uncomment to enable status filter
        <div className='p-4'>
          <SelectComponent
            label="Filter by Status"
            placeholder="Select status"
            value={userStatus}
            onChange={(e) => handleFilter(e.target.value)}
            options={["All", "Active", "In Active"]}
          />
        </div>
        */}

        <TableComponent
          title="All Users"
          headers={headers}
          data={filterUserList}
          renderRow={(item, index) => (
            <>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">{index + 1}</td>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">{item?.email}</td>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3 capitalize">
                {item?.name?.toLowerCase()}
              </td>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">{item?.mobile}</td>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                {item?.sponsorId == null ? "Admin" : item?.sponsorId}
              </td>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                {item?.referralCode == null || index === 0 ? "Admin" : item?.referralCode}
              </td>

              {/* Enable if needed:
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white p-2 rounded text-sm" onClick={() => navigate(Routers.ViewProfile, { state: item._id })}><FaEye /></button>
                  {item.status ? (
                    <button className="bg-green-500 text-white p-2 rounded text-sm" onClick={() => handleUserStatus(item._id, false)}><IoCheckmarkSharp /></button>
                  ) : (
                    <button className="bg-red-500 text-white p-2 rounded text-sm" onClick={() => handleUserStatus(item._id, true)}><ImBlocked /></button>
                  )}
                </div>
              </td>
              */}
            </>
          )}
          searchKeys={['name', 'username']}
          searchKey="name"
        />
      </div>
    </>
  );
};

export default AllUsers;
