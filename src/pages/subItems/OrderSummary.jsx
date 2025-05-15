import React from 'react';
import TableComponent from '../../components/TableComponent';

const headers = ['#', 'FCID', 'Name', 'Rank', 'Total Sale'];

const data = [
  // {
  //   fcid: '100008',
  //   name: 'KAMLESH GURJAR',
  //   rank: 'DU',
  //   totalSale: '₹ 521.42'
  // },
  // {
  //   fcid: '100009',
  //   name: 'DEEPAK',
  //   rank: 'DU',
  //   totalSale: '₹ 173.42'
  // },
  // {
  //   fcid: '100010',
  //   name: 'RAMDAYAL GURJAR',
  //   rank: 'DU',
  //   totalSale: '₹ 173.42'
  // },
  // {
  //   fcid: '100011',
  //   name: 'SUDESH DEVI',
  //   rank: 'MQ',
  //   totalSale: '₹ 176.41'
  // },
  // {
  //   fcid: '100013',
  //   name: 'KRISHNPAL CHOUDHARY',
  //   rank: 'MQ',
  //   totalSale: '₹ 176.41'
  // },
  // {
  //   fcid: '100017',
  //   name: 'ANIL PATIDAR',
  //   rank: 'MQ',
  //   totalSale: '₹ 176.41'
  // },
  // {
  //   fcid: '100018',
  //   name: 'ARVIND BEGANA',
  //   rank: 'MQ',
  //   totalSale: '₹ 176.41'
  // },
  // {
  //   fcid: '100019',
  //   name: 'GAYATRI MAKWANA',
  //   rank: 'MQ',
  //   totalSale: '₹ 176.41'
  // },
  // {
  //   fcid: '100021',
  //   name: 'BANTI GANGRADE',
  //   rank: 'CT',
  //   totalSale: '₹ 185.38'
  // },
];

const renderRow = (item, index) => (
  <>
    <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{index + 1}</td>
    <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item.fcid}</td>
    <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3 uppercase">{item.name}</td>
    <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item.rank}</td>
    <td className="border-r whitespace-nowrap border-b border-text-white/40 p-2 md:p-3">{item.totalSale}</td>
  </>
);

const OrderSummary = () => {
  return (
    <div className=" bg-white shadow-xl rounded-xl">
      <TableComponent
        title="Sales History"
        headers={headers}
        data={data}
        renderRow={renderRow}
        searchKeys={['name', 'fcid', 'rank']}
        searchKey="name"
      />
    </div>
  );
};

export default OrderSummary;
