import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'
import logo from '../../assets/logo.svg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch, faCheckDouble, faDotCircle, faTrashAlt, faThumbsDown, faFolderOpen } from '@fortawesome/free-solid-svg-icons'

function Header({
  emailsData, 
  handleSelectAll,
  currentFolder, 
  moveToFolder,
  markAsRead,
  markAllAsRead,
  isMailOpened,
  setInput,
  input,
  search,
  setIsInputClicked,
  isInputClicked
}) {
  
  const [isDropDownVisible, setIsDropDownVisible] = useState(false)

  const countSelectedEmails = () => {
    const selected = []
    emailsData[currentFolder].emails.map(email => email.checked ? selected.push(email) : null)
    return selected.length
  }

  const selectBtn = (
    <div className='header__middle__section' onClick={handleSelectAll} >
      <FontAwesomeIcon icon={faCheckDouble} className='header__middle__icon' />
      <p>{emailsData[currentFolder].isSomeSelected ? `(${countSelectedEmails()}) Снять выделение` : 'Выделить все'}</p>
    </div>
  )

  const readAllBtn = (
    <div className={'header__middle__section'} onClick={markAllAsRead} >
      <FontAwesomeIcon icon={faDotCircle} className='header__middle__icon' />
      <p>Отметить все прочитанным</p>
    </div>
  )

  const deleteBtn = (
    <div className='header__middle__section' onClick={() => moveToFolder('trash')}>
      <FontAwesomeIcon icon={faTrashAlt} className='header__middle__icon' />
      <p>Удалить</p>
    </div>
  )

  const spamBtn = (
    <div className={currentFolder === 'spam' ? 'header__middle__section-disabled' : 'header__middle__section '} onClick={() => moveToFolder('spam')}>
      <FontAwesomeIcon icon={faThumbsDown} className='header__middle__icon' />
      <p>В спам</p>
    </div>
  )

  const folderBtn = (
    <div className='header__middle__section header__folder'
        onClick={() => setIsDropDownVisible(!isDropDownVisible)} 
        onBlur={() => setIsDropDownVisible(false)}>
      <FontAwesomeIcon icon={faFolderOpen} className='header__middle__icon' />
      <p>В папку</p>

        <ul className='header__folder__dropdown-menu' style={{visibility: isDropDownVisible ? 'visible' : 'hidden'}}>
        {Object.keys(emailsData).map(key =>  
          <li key={key} className={key === currentFolder ? 'li-disabled' : 'li-active'} onClick={() => moveToFolder(key)}>
            <FontAwesomeIcon icon={emailsData[key].icon} style={{width: '15px', marginRight: '3px', marginBottom: '4px'}}/> 
            {emailsData[key].title}
          </li>
          )}
        </ul>
    </div>
  )

  const readBtn = (
    <div className={currentFolder === 'sent' ? 'header__middle__section-disabled' : 'header__middle__section '} 
        onClick={markAsRead}
      >
      <FontAwesomeIcon icon={faDotCircle} className='header__middle__icon' />
      <p>Прочитать</p>
    </div>
  )

  return (
    <div className='header' >

        <div className="header__left">
            <img src={logo} height='20px' title='Почта Awesome Mail' />
        </div>

        <div className="header__middle" style={{display: isInputClicked  ? 'none' : 'flex'}}>

            {emailsData[currentFolder].emails.some(email => email.checked) ? 
            <>
              {selectBtn}
              {deleteBtn}
              {spamBtn}
              {folderBtn}
              {readBtn}
            </> : isMailOpened ?
            <>
              {deleteBtn}
              {spamBtn}
              {folderBtn}
            </> :
            <>
              {selectBtn}
              {readAllBtn}
            </>
            }
        </div>

        <div className="header__right" style={{flex: isInputClicked  ? '.85' : ''}}>
          <label className='header__right__input-label'>
            <input 
            placeholder={isInputClicked ? '' : 'Поиск по почте'} 
            onClick={() => setIsInputClicked(true)} 
            onChange={e => setInput(e.target.value)}
            value={input}
            />
            {isInputClicked ? 
            <div className='search-btn' onClick={search}>
              <Link to='mail-service/search'>Найти</Link></div> :
            <FontAwesomeIcon icon={faSearch} className='input-search'/>
            }
          </label>
        </div>

    </div>
  )
}

export default Header



