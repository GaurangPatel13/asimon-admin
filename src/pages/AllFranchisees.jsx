import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { fetchFranchisees } from '../api/admin-api';
import PageLoader from '../components/ui/PageLoader';
import SelectComponent from '../components/SelectComponent';
import { formatDateonly } from '../utils/dateFunctions';
import { Routers } from '../constants/Routes';
import TableComponent from '../components/TableComponent';

const AllFranchisees = () => {
    const [statusFilter, setStatusFilter] = useState('All');
    const [loading, setLoading] = useState(false);
    const [franchisees, setFranchisees] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const navigate = useNavigate();

    const headers = [
        '#',
        'Date',
        'Name',
        'Owner',
        'Mobile',
        'Location',
        'Status',
        'GST',
        '#Action'
    ];

    useEffect(() => {
        getAllFranchisee();
    }, []);

    useEffect(() => {
        handleFilter(statusFilter);
    }, [statusFilter, franchisees]);

    const getAllFranchisee = async () => {
        try {
            setLoading(true);
            const res = await fetchFranchisees();
            if (res.success) {
                setFranchisees(res.data);
                setFilteredList(res.data);
            }
        } catch (error) {
            console.error('Error fetching franchisees:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (status) => {
        if (status === 'All') {
            setFilteredList(franchisees);
        } else {
            const filtered = franchisees.filter((item) =>
                status === 'Active' ? item.status === true : item.status === false
            );
            setFilteredList(filtered);
        }
        setStatusFilter(status);
    };

    return (
        <>
            {loading && <PageLoader />}
            <div className="bg-white shadow-xl rounded-xl">
                <div className="p-4">
                    <SelectComponent
                        label="Filter by Status"
                        placeholder="Select status"
                        value={statusFilter}
                        onChange={(e) => handleFilter(e.target.value)}
                        options={['All', 'Active', 'In Active']}
                    />
                </div>

                <TableComponent
                    title="All Franchisees"
                    headers={headers}
                    data={filteredList}
                    renderRow={(item, index) => {
                        if (!item) return null;
                        return (
                            <>
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{formatDateonly(item?.createdAt)}</td>
                                <td className="border p-2">{item?.name}</td>
                                <td className="border p-2">{item?.ownerName}</td>
                                <td className="border p-2">{item?.mobile?.primary || 'N/A'}</td>
                                <td className="border p-2">{item?.location}</td>
                                <td className="border p-2">{item?.status ? 'Active' : 'In Active'}</td>
                                <td className="border p-2">{item?.gstNumber || 'N/A'}</td>
                                <td className="border p-2">
                                    <button
                                        className="bg-blue-500 text-white p-2 rounded text-sm"
                                        onClick={() =>
                                            navigate(Routers.ViewFranchisee, { state: item._id })
                                        }
                                    >
                                        <FaEye />
                                    </button>
                                </td>
                            </>
                        );
                    }}
                    searchKeys={['name', 'ownerName']}
                    searchKey="Franchisee name or owner"
                />
            </div>
        </>
    );
};

export default AllFranchisees;
