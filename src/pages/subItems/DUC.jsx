import React from 'react';
import TableComponent from '../../components/TableComponent';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import { FcAcceptDatabase } from 'react-icons/fc';
import { MdDoNotDisturb } from 'react-icons/md';

const DUC = () => {
  const headers = ['#', 'Ref ID', 'Date', 'ID', 'Name', 'Fund', 'End Date', 'Action'];
  const data = [];

  const handleAction=(action)=>{
console.log(action)
}

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
          <ButtonWithIcon title="Decline" icon={<MdDoNotDisturb/>} bgcolor={"bg-green-600"} onClick={()=>handleAction("decline")}/>
        </div>
      </td>
    </>
  );

  return (
    <div className="bg-white shadow-xl rounded-xl">
      <TableComponent
        title="Challenge Request"
        headers={headers}
        data={data}
        renderRow={renderRow}
        searchKeys={['refId', 'id', 'name']}
        searchKey="Ref ID / Name"
      />
    </div>
  );
};

export default DUC;
