import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import Pagination from './Pagination';
import BackButton from './BackButton';
import notfoundImg from "../assets/images/notfound.jpg";
const TableComponent = ({showPagination=true, showBackButton=true, title, headers, data, renderRow, searchKeys = [], searchKey, showSearch = true }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const filteredData = data?.filter((item) => {
        const search = searchQuery.toLowerCase();
        return searchKeys.some((key) =>
            item[key]?.toString().toLowerCase().includes(search)
        );
    });

    const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredData?.slice(startIndex, startIndex + itemsPerPage);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div>
            <div className='space-y-4 bg-[#ffffff13] backdrop-blur-md p-4 rounded-xl overflow-hidden'>
                <div className='flex flex-col md:flex-row justify-between gap-4'>
                    <div className='flex items-center gap-3 '>
                       {showBackButton && (<BackButton />)} 
                        <h1 className='text-sm md:text-lg font-medium'>{title}</h1>
                    </div>
                    {showSearch && <div className="flex items-center gap-2 px-4  rounded-lg border w-full md:w-auto text-black bg-white">
                        <input
                            type="text"
                            placeholder={`Search by ${searchKey || 'value'}`}
                            value={searchQuery}
                            onChange={handleSearch}
                            className="flex-1 p-2 text-sm text-gray-600 rounded-lg outline-none"
                        />
                        <IoSearch className="text-black" />
                    </div>}

                </div>
                <div className='overflow-x-auto'>
                    <table className='w-full text-sm whitespace-nowrap'>
                        <thead>
                            <tr className=' text-left'>
                                {headers.map((header, index) => (
                                    <th key={index} className='p-2 border border-white/30'>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems?.length === 0 ? (
                                <tr>
                                    <td colSpan="100%" className="text-center">
                                        <img src={notfoundImg} alt="Not found" className="w-60 h-60 mx-auto mt-4" />
                                    </td>
                                </tr>
                            ) : (
                                currentItems?.map((item, index) => (
                                    <tr key={index}>
                                        {renderRow(item, startIndex + index)}
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
          {showPagination &&   <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />}
        </div>
    );
};

export default TableComponent