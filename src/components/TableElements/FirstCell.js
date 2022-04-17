import React from 'react'
import Checkbox from '../Checkbox/Checkbox.js'

function FirstCell(props) {
  return (
    <td className='email-cell email-cell__checkbox' width='2%' onClick={e => e.stopPropagation()}>
        <Checkbox handleCheckBox={props.handleCheckBox} email={props.email} isModalActive={props.isModalActive} />
    </td>
  )
}

export default FirstCell