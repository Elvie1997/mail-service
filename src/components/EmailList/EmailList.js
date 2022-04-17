import React from 'react'
import { Link } from 'react-router-dom'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import EmailRow from '../TableElements/EmailRow.js'
import FirstCell from '../TableElements/FirstCell.js'
import SecondCell from '../TableElements/SecondCell.js'
import ThirdCell from '../TableElements/ThirdCell.js'
import FourthCell from '../TableElements/FourthCell.js'

function EmailList({
  emails, 
  handleCheckBox, 
  openMail, 
  setCurrentFolder, 
  setIsInputClicked, 
  setInput, 
  isModalActive,
  isSearching
}) {
  const emailElements = emails.map(email => 
    <Link to={`/${email.id}`} key={email.id} >
    <EmailRow email={email} 
              setCurrentFolder={setCurrentFolder} 
              openMail={openMail} 
              setIsInputClicked={setIsInputClicked}
              setInput={setInput}
              >
      
      <FirstCell email={email} handleCheckBox={handleCheckBox} isModalActive={isModalActive}> </FirstCell>

      <SecondCell email={email}> {email.sender || email.addressee}</SecondCell>

      <ThirdCell> 
         <span style={{fontWeight: email.isRead ? '400' : '700'}}>
          {email.title}</span> <span className='email-message'>{email.message}</span>    
      </ThirdCell>
      
      <FourthCell email={email}> {email.time} </FourthCell>
      
    </EmailRow>
    </Link>
  )
  return (
    <>
    {emails.length ?
      <table className='email-table'>
      <tbody>
        {emailElements}
      </tbody>
    </table> :  
    isSearching ? 
        <div className='not-found'> Ничего не найдено  ¯\_(ツ)_/¯</div> :
        <div className='no-messages-section'>
          <FontAwesomeIcon icon={faFolderOpen} style={{height: '70px', width: '70px', color: '#6279d2'}}/>
          <div className='no-messages-text'>В папке нет писем</div>
        </div>
  } 
    </>
  )
}

export default EmailList