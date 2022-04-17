import React from 'react'

function SecondCell(props) {
  return (
    <td className='email-cell email-cell__sender' 
    width='25%' 
    style={{fontWeight: props.email.isRead ? '400' : '700'}}
    >
      {props.children}
    </td>

  )
}

export default SecondCell