import React, {useState} from 'react'
import './Checkbox.scss'

function Checkbox(props) {
 
  return (
    <>
        <label className="checkbox-wrapper" style={{display: props.isModalActive ? 'none' : 'block'}}> 
            <input type="checkbox" 
            name={props.name}
            checked={props.email.checked}
            onChange={ () => props.handleCheckBox(props.email.id)}
            />
            <span className='checkmark'></span>
        </label>
        {props.children}
    </>
  )
}

export default Checkbox