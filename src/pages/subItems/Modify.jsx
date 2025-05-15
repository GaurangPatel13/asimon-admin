import React, { useEffect, useState } from 'react'
import TableComponent from '../../components/TableComponent';
import { Routers } from '../../constants/Routes';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import SelectComponent from '../../components/SelectComponent';
import { deleteUser, getAllUsersList, updateUserRank } from '../../api/admin-api';
import Swal from 'sweetalert2';
import PageLoader from '../../components/ui/PageLoader';
import { formatDateonly } from '../../utils/dateFunctions';

const Modify = () => {
  const headers = ['ID', 'Date', 'FCID', 'Associate', 'Mobile', 'Sponsor', 'DOP', 'Rank', '#Action'];
  const [userList, setUserList] = useState([]);
  const [rankMap, setRankMap] = useState({});
  const [loading, setLoading] = useState(false);

  const labels = ['FC', 'FI', 'FR', 'BR', 'BD', 'CT', 'MQ', 'DU'];
  const options = labels.map(label => ({ label, value: label }));

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersList = async () => {
      const response = await getAllUsersList();

      if (response?.success) {
        setUserList(response?.data);
      }
      const initialRanks = {};
      response?.data?.forEach(user => {
        initialRanks[user._id] = user?.selectRank || '';
      });
      setRankMap(initialRanks);
    }

    fetchUsersList();
  }, []);
  console.log(userList)

  const handleRankChange = (userId, value) => {
    setRankMap(prev => ({
      ...prev,
      [userId]: value
    }));

    updateUserRank(userId, { "rank": value });
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteUser(id);
      const updatedUserList = userList.filter(user => user._id !== id);
      setUserList(updatedUserList);
      Swal.fire({
        title: 'User deleted successfully',
        icon: 'success',
      })
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {loading && (
        <PageLoader />
      )}
      <div className='bg-white shadow-xl rounded-xl'>
        <TableComponent
          title="Modify"
          headers={headers}
          data={userList}
          renderRow={(item, index) => (
            <>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">{index + 1}</td>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">{formatDateonly(item?.createdAt)}</td>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">{item?.username}</td>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                {(item?.name?.firstName || '') + ' ' + (item?.name?.middleName || '') + ' ' + (item?.name?.lastName || '')}
              </td>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">{item?.mobile}</td>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">{item?.referrCode == null ? "Admin" : item?.referredBy?.name}</td>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">{item?.lastPurchaseDate || "N/A"}</td>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                <SelectComponent
                  options={options}
                  value={rankMap[item._id] || ''}
                  onChange={(e) => handleRankChange(item._id, e.target.value)}
                  name="status"
                  placeholder="Rank Upgrade"
                />
              </td>
              <td className="border-r border-b border-text-white/40 p-2 md:p-3">
                <div className='flex gap-2'>
                  <button className="bg-green-500 text-white p-2 rounded text-sm" onClick={() => navigate(Routers.ProfileUpdate, { state: item._id })}><FaEdit /></button>
                  <button className="bg-red-500 text-white p-2 rounded text-sm" onClick={() => handleDelete(item._id)}><FaTrashAlt /></button>
                </div>
              </td>
            </>
          )}
          searchKeys={['name', 'username', 'mobile', 'selectRank']}
          searchKey="name , fcid , mobile ,rank"
        />
      </div>
    </>

  )
}

export default Modify;
