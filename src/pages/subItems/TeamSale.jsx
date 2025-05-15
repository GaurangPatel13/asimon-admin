import React from 'react'
import TableComponent from '../../components/TableComponent'

const TeamSale = () => {
  const headers = ["S.NO.", "Name","Mobile","DOJ","Sponsor","Rank","Total Sale"]

  const data = [
   
  ]
  return (
    <div className='bg-white shadow-xl rounded-xl'>
      <TableComponent title={"Team Sale"} headers={headers} data={data} renderRow={
        (item, index) => {
          return (
            <>
              <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{index + 1}</td>
              <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item.associate}</td>
              <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item.mobile}</td>
              <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item.date}</td>
              <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item.sponsor}</td>
              <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item.rank}</td>
              <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item.amount}</td>
            </>
          )
        }
      } searchKeys={["associate"]} />
    </div>
  )
}

export default TeamSale;
