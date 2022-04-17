import React from 'react'

function FourthCell(props) {
  return (
    <td  className='email-cell email-cell__time' width='5%'>
      {props.children}
    </td>
  )
}

export default FourthCell