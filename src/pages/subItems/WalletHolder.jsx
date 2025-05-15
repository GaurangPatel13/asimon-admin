import React from 'react'
import TableComponent from '../../components/TableComponent'
import Button from '../../components/Button'
import { Routers } from '../../constants/Routes'
import { useNavigate } from 'react-router-dom'
import ButtonWithIcon from '../../components/ButtonWithIcon'
import { BiAddToQueue } from 'react-icons/bi'

const WalletHolder = () => {
  const headers = ["S.NO.", "Associate", "Amount"]
  const navigate = useNavigate();

  const data = [
    // {
    //   id: 1,
    //   associate: 'COMPANY ID (100001)',
    //   amount: '1000'
    // },
    // {
    //   id: 2,
    //   associate: 'COMPANY ID (100001)',
    //   amount: '1000'
    // },
    // {
    //   id: 3,
    //   associate: 'COMPANY ID (100001)',
    //   amount: '1000'
    // },
    // {
    //   id: 4,
    //   associate: 'COMPANY ID (100001)',
    //   amount: '1000'
    // },
  ]

  return (
    <div className=' bg-white shadow-xl rounded-xl'>
      <div className='px-5 pt-5'> 
        <ButtonWithIcon title="New Wallet" icon={<BiAddToQueue />} onClick={() => navigate(Routers.addfund)} />
      </div>
      <TableComponent title={"Wallet Holder"} headers={headers} data={data} renderRow={
        (item, index) => {
          return (
            <>
              <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{index + 1}</td>
              <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item.associate}</td>
              <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item.amount}</td>
            </>
          )
        }
      } searchKeys={["associate"]} />

    </div>
  )
}

export default WalletHolder
