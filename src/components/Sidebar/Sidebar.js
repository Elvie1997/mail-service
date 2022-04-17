import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './Sidebar.scss'
import Modal from '../Modal/Modal.js'


function Sidebar({ 
  emailsDataArr,
  emailsData,
  currentFolder,
  setCurrentFolder, 
  setIsMailOpened, 
  isModalActive, 
  setIsModalActive,
  newFolder,
  setNewFolder,
  setEmailsData,
  setInput,
  setIsInputClicked,
  setIsSearching
}) {

  const [isConMenuActive, setIsConMenuActive] = useState(false)
  const [x, setX] = useState(null)
  const [y, setY] = useState(null)
  const [selectedFol, setSelectedFol] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const folderElements = emailsDataArr.map(folder =>  (
    <Link to={`mail-service/${folder.name}`} key={folder.id} id={folder.id} 
          onClick={() => setCurrentFolder(folder.name)} 
          onContextMenu={(e) => {
            e.preventDefault()
            setIsConMenuActive(true)
            setX(e.clientX)
            setY(e.clientY)
            setSelectedFol(folder)
          }}
          >
      <li id={folder.id} style={{backgroundColor: currentFolder === folder.name ? '#889be5' : null}}>
        <span className='folder__title'>
        <FontAwesomeIcon icon={folder.icon} style={{width: '15px', marginRight: '8px'}} />
        {folder.title}
        </span>
        <span className='item-total'>
          {folder.emails.length > 0 && folder.name !== 'spam' && folder.name !== 'trash' && folder.emails.length}
          </span>
        <span id={folder.name} onClick={e => {
          const id = e.currentTarget.id
          e.stopPropagation()
          e.preventDefault()
          setEmailsData(prev => ({
            ...prev,
            [id]: {
              ...prev[id],
              emails: []
            }
          }))
        }}>{folder.delete}</span>
      </li>
    </Link>
  )
  )

  const keys = ['inbox', 'sent', 'drafts', 'spam', 'trash']
  const canNotDelete = keys.some(key => selectedFol.name === key)

  const edit = () => {
    if (canNotDelete) {
      return null
    } else {
    setIsModalActive(true)
    setNewFolder(selectedFol)
    setIsEditing(true)
    }
  }

  const remove = () => {
    const newEmailsData = {...emailsData}
    if (canNotDelete) {
      return null
    } else {
      Object.keys(newEmailsData).map(key => newEmailsData[key].id === selectedFol.id ? delete newEmailsData[key] : null)
      setEmailsData(newEmailsData)
    }
  }

  return (
    <div className='sidebar' onClick={() => {
      setIsMailOpened(false)
      setIsConMenuActive(false)
      setInput('')
      setIsInputClicked(false)
      setIsSearching(false)
      }}>
      <button className='sidebar__new-email' > + Новое письмо</button>
      <div className='sidebar__items'>

        <ul className='sidebar__folders'>
          {folderElements}
        </ul>

        <ul className='sidebar__context-menu' 
        style={{display: isConMenuActive ? 'block' : 'none', top: y + 10 +'px', left: x + 10 + 'px'}}>
          <li onClick={edit} className={!canNotDelete ? 'con-active' : 'con-disabled'} >
            <FontAwesomeIcon icon={faEdit} />
            Редактировать папку
          </li>
          <li onClick={remove} className={!canNotDelete ? 'con-active' : 'con-disabled'}>
            <FontAwesomeIcon icon={faTrashAlt} />
            Удалить папку
          </li>
        </ul>

      </div>
      <button className='sidebar__new-folder' onClick={() => setIsModalActive(true)}> + Новая папка</button>
      <Modal emailsDataArr={emailsDataArr}
             emailsData = {emailsData}
             setEmailsData={setEmailsData} 
             isModalActive={isModalActive}
             setIsModalActive={setIsModalActive} 
             newFolder={newFolder} 
             setNewFolder={setNewFolder}
             isEditing={isEditing}
             setIsEditing={setIsEditing}
             selectedFol={selectedFol}
          />
    </div>
  )
}

export default Sidebar


