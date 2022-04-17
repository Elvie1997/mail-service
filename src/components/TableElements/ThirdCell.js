import React from 'react'

function ThirdCell(props) {
  return (
    <td  className='email-cell email-cell__title' width='68%' >
      {props.children}
    </td>

  )
}

export default ThirdCell