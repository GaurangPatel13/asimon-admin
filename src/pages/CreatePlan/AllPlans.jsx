import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import { IoCheckmarkSharp } from "react-icons/io5";
import { ImBlocked } from "react-icons/im";
import { FaEye } from "react-icons/fa6";
import { getAllPlansList, updatePlan, deletePlan } from "../../api/admin-api";

import PageLoader from "../../components/ui/PageLoader";
import { Routers } from "../../constants/Routes";
import { useLocation, useNavigate } from "react-router-dom";
import SelectComponent from "../../components/SelectComponent";
import { formatDateonly } from "../../utils/dateFunctions";
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';
import { FaPencilAlt } from "react-icons/fa";


const AllPlans = () => {
  const location = useLocation();
  const [userStatus, setUserStatus] = useState("all");
  const headers = [
    "#",
    "Name",
    "Price",
    "Description",
    "Active/Inactive",
    "Action",
  ];
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [filterUserList, setFilterUserList] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  

  useEffect(() => {
    fetchPlansList();
  }, []);
  useEffect(() => {
    handleFilter(userStatus);
  }, [userStatus]);
  const fetchPlansList = async () => {
    try {
      setLoading(true);
      const response = await getAllPlansList();
      console.log(response);
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
    };
    
    const handleEditClick = (plan) => {
    setEditRowId(plan._id);
    setEditFormData({
      name: plan.name,
      description: plan.description,
      amount: plan.amount,
      isActive: plan.isActive,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "amount"
          ? parseInt(value, 10)
          : value,
    }));
  };

  const handleSave = async (id) => {
    try {
      setLoading(true);
      const response = await updatePlan(id, editFormData);
      if (response.success) {
        setEditRowId(null);
        setEditFormData({});
        fetchPlansList();
      }
    } catch (error) {
      console.error("Error updating plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    try {
      setLoading(true);
      const response = await deletePlan(id);
      if (response.success) {
        fetchPlansList();
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserStatus = async (id, newstatus) => {
    try {
      setLoading(true);
      const response = await updateUser(id, { status: newstatus });
      if (response.success) {
        fetchPlansList();
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    } finally {
      setLoading(false);
    }
  };

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
  };
  const navigate = useNavigate();
  return (
    <>
      {loading && <PageLoader />}
      <div className="bg-white shadow-xl rounded-xl">
        

        <TableComponent
          title="All Plans"
          headers={headers}
          data={filterUserList}
          renderRow={(item, index) => (
            <>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                {index + 1}
              </td>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                {editRowId === item._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    className="border px-2 py-1 w-full"
                  />
                ) : (
                  item?.name
                )}
              </td>

              <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                {editRowId === item._id ? (
                  <input
                    type="number"
                    name="amount"
                    value={editFormData.amount}
                    onChange={handleEditChange}
                    className="border px-2 py-1 w-full"
                  />
                ) : (
                  item?.amount
                )}
              </td>

              <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                {editRowId === item._id ? (
                  <input
                    type="text"
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    className="border px-2 py-1 w-full"
                  />
                ) : (
                  item?.description
                )}
              </td>

              <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                {editRowId === item._id ? (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={editFormData.isActive}
                      onChange={handleEditChange}
                      className="toggle-checkbox"
                    />
                    {editFormData.isActive ? "Active" : "Inactive"}
                  </label>
                ) : item?.isActive ? (
                  "Active"
                ) : (
                  "Inactive"
                )}
              </td>

              {/* <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                {item?.referralCode == null || index === 0
                  ? "Admin"
                  : item?.referralCode}
              </td> */}
              {/* <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                {item?.key ? item.key : 'NA'}
              </td> */}

              <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                <div className="flex gap-2">
                  {editRowId === item._id ? (
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                      onClick={() => handleSave(item._id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white p-2 rounded text-sm"
                      onClick={() => handleEditClick(item)}
                    >
                      <FaPencilAlt />
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white p-2 rounded text-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </td>
            </>
          )}
          searchKeys={["name", "username"]}
          searchKey="name and FCID"
        />
      </div>
    </>
  );
};

export default AllPlans;
