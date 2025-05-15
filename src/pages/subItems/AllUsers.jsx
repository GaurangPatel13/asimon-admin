import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/TableComponent';
import { IoCheckmarkSharp } from "react-icons/io5";
import { ImBlocked } from "react-icons/im";
import { FaEye } from 'react-icons/fa6';
import { getAllUsersList, updateUser, updateUserRank } from '../../api/admin-api';
import PageLoader from '../../components/ui/PageLoader';
import { Routers } from '../../constants/Routes';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectComponent from '../../components/SelectComponent';
import { formatDateonly } from '../../utils/dateFunctions';


const AllUsers = () => {
  const location = useLocation();
  const [userStatus, setUserStatus] = useState('all');
  const headers = ['#', 'UserID', 'Name', 'Mobile', 'SponsorID', 'ReferredBy'];
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [filterUserList, setFilterUserList] = useState([]);
  


  useEffect(() => {
    fetchUsersList();
  }, [])
  useEffect(() => {
    handleFilter(userStatus);
  }, [userStatus])
  const fetchUsersList = async () => {
    try {
      setLoading(true);
      const response = await getAllUsersList();
      console.log(response)
      if (response?.success) {
        setUserList(response?.data);
      }
      setUserStatus(location.state);
      setFilterUserList(response?.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleUserStatus = async (id, newstatus) => {
    try {
      setLoading(true);
      const response = await updateUser(id, { status: newstatus });
      if (response.success) {
        fetchUsersList();
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleFilter = (status) => {
    setUserStatus(status);
    if (status == "All") {
      return setFilterUserList(userList);
    }
    if (status == "Active") {
      const filterUsers = userList.filter((user) => user?.status === true);
      setFilterUserList(filterUsers);
    }
    if (status == "In Active") {
      const filterUsers = userList.filter((user) => user?.status === false);
      setFilterUserList(filterUsers);
    }
  }
  const navigate = useNavigate();
  return (
    <>
      {loading && <PageLoader />}
      <div className='bg-white shadow-xl rounded-xl'>
        <div className='p-4'>
          <SelectComponent
            label="Filter by Status"
            placeholder="Select status"
            value={userStatus}
            onChange={(e) => handleFilter(e.target.value)}
            options={["All", "Active", "In Active"]}
          />
        </div>

        <TableComponent
          title="All Users"
          headers={headers}
          data={filterUserList}
          renderRow={(item, index) => (
            <>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                {index + 1}
              </td>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">{item?.email}</td>

              <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                {item?.name}
              </td>

              <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                {item?.mobile}
              </td>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                {item?.sponsorId == null
                  ? "Admin"
                  : item?.sponsorId}

              </td>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                {item?.referralCode == null || index === 0
                  ? "Admin"
                  : item?.referralCode}
              </td>
              {/* <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                {item?.key ? item.key : 'NA'}
              </td> */}

              {/* <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white p-2 rounded text-sm" onClick={() => navigate(Routers.ViewProfile, { state: item._id })}><FaEye /></button>
                  {item.status ? (
                    <button className="bg-green-500 text-white p-2 rounded text-sm" onClick={() => handleUserStatus(item._id, false)}><IoCheckmarkSharp /></button>
                  ) : (
                    <button className="bg-red-500 text-white p-2 rounded text-sm" onClick={() => handleUserStatus(item._id, true)}><ImBlocked /></button>
                  )}
                </div>
              </td> */}

            </>
          )}
          searchKeys={['name', 'username']}
          searchKey="name and FCID"
        />

      </div>
    </>

  )
}

export default AllUsers
