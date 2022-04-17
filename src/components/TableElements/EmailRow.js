import React, {useState} from 'react'
import './TableElements.scss'

function EmailRow(props) {
  return (
        <tr className={`email-row`} onClick={() => {
          props.openMail(props.email)
          props.setIsInputClicked(false)
          props.setInput('')
        }}
          style={{backgroundColor: props.email.checked && '#ccd1e7'}}
          draggable={true}
          >
          {props.children}
        </tr>  
  )
}

export default EmailRow