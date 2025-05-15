import React from 'react';
import TableComponent from '../../components/TableComponent';

const headers = [
  '#',
  'ID',
  'Date',
  'Associate',
  'Bank',
  'IFSC',
  'Acc. No.',
  'Total Amount',
  'TDS (5%)',
  'Net Commision',
];

const data = [
 
];

const renderRow = (item, index) => (
  <>
    <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{index + 1}</td>
    <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item.id}</td>
    <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item.date}</td>
    <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3 uppercase">{item.associate}</td>
    <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item.bank}</td>
    <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item.ifsc}</td>
    <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item.account}</td>
    <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item.total}</td>
    <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item.tds}</td>
    <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item.net}</td>
  </>
);

const TransactionReport = () => {
  return (
    <div className="bg-white shadow-xl rounded-xl">
      <TableComponent
        title="Transactional Summary"
        headers={headers}
        data={data}
        renderRow={renderRow}
        searchKeys={['id', 'associate', 'bank', 'ifsc', 'account']}
        searchKey="associate"
      />
    </div>
  );
};

export default TransactionReport;
