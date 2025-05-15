import React from 'react'
import SubItemPageHeader from './SubItemPageHeader'
import SearchFilterBar from './SearchFilterBar'
import TableComponent from '../../components/TableComponent';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import { MdDoNotDisturb } from "react-icons/md";
import { FcAcceptDatabase } from "react-icons/fc";


const MQC = () => {
  const headers = ['#', 'Ref ID', 'Date', 'FCID', 'Name', 'Fund', 'End Date', 'Action'];

  const data = [
    // {
    //   refId: 3046,
    //   date: '29-09-2024, 6:51 PM',
    //   id: '100521',
    //   name: 'PRADEEP ANJANA',
    //   fund: '₹1550000',
    //   endDate: '27-01-2025',
    // },
    // {
    //   refId: 3045,
    //   date: '28-09-2024, 2:13 PM',
    //   id: '100047',
    //   name: 'ANJALI LOKHANDE',
    //   fund: '₹1550000',
    //   endDate: '26-01-2025',
    // },
    // Add more rows here
  ];
  const renderRow = (item, index) => (
    <>
      <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{index + 1}</td>
      <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item.refId}</td>
      <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item.date}</td>
      <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item.id}</td>
      <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item.name}</td>
      <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item.fund}</td>
      <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item.endDate}</td>
      <td className='border-r border-b border-text-white/40 p-2 md:p-3'>
        <div className="flex gap-2">
          <ButtonWithIcon title="Accept" icon={<FcAcceptDatabase/>} bgcolor={"bg-red-600"} onClick={()=>handleAction("accept")}/>
          <ButtonWithIcon title="Decline" icon={<MdDoNotDisturb />} bgcolor={"bg-green-600"} onClick={()=>handleAction("decline")}/>
        </div>
      </td>
    </>
  );
const handleAction=(action)=>{
console.log(action)
}

  return (
    <>
      <div className=''>
        <SearchFilterBar />
      </div>
      <div className='bg-white shadow-xl rounded-xl' >
        <TableComponent
          title="Challenge Request"
          headers={headers}
          data={data}
          renderRow={renderRow}
          searchKeys={['refId', 'id', 'name']}
          searchKey="Ref ID / Name"
        />
      </div>
    </>

  )
}

export default MQC
