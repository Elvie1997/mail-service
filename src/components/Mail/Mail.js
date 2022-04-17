import React from 'react'
import './Mail.scss'

function Mail({currentEmail, moveTo, currentFolder}) {
  console.log(currentFolder)
  console.log(moveTo)

  return (
    <div className='mail-wrapper'>
      {currentEmail ?
        <>
          <h2>{currentEmail && currentEmail.title}</h2>
          {currentEmail && currentEmail.name === 'sent' ?
          <>
            <p>{currentEmail && `От: elvie1997@amail.tat, ${currentEmail.time}`}</p>
            <p>{currentEmail && `Кому: ${currentEmail.sender}`}</p> 
          </> :
          <>
            <p>{currentEmail && `От: ${currentEmail.sender}, ${currentEmail.time}`}</p>
            <p>{currentEmail && 'Кому: elvie1997@amail.tat'}</p>
          </>
          }
          <p>{currentEmail && currentEmail.message}</p>
        </> :
        <div className='mail__empty-info'>  
          {currentFolder.folder === 'trash' ? 'Письмо удалено' : `Письмо перемещено в папку ${moveTo}`}
        </div>
     }
    </div>
  )
}

export default Mail