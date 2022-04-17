import React, {useState} from 'react'
import './Modal.scss'

function Modal({
    emailsDataArr, 
    emailsData,
    setEmailsData, 
    isModalActive, 
    setIsModalActive, 
    newFolder, 
    setNewFolder,
    isEditing,
    setIsEditing,
    selectedFol
}) {

  
  const [doubleFol, setDoubleFol] = useState(false)

    const handleInput = (e) => {
      if(isEditing) {
        setNewFolder(prev => ({
          ...prev,
          name: e.target.value,
          title: e.target.value
        }))
    
      } else {
        setNewFolder(prev => ({
          ...prev,
          id: emailsDataArr.length + 1,
          name: e.target.value,
          title: e.target.value
      }))
    }
    }


    const addEditFol = () => {
      const newEmailsData={...emailsData}
      const exists = Object.keys(emailsData).some(key=> emailsData[key].title === newFolder.title)
    
      if (exists) {
        setDoubleFol(true)
        return
      }
      else if (isEditing) {
          Object.keys(newEmailsData).map(key=> {
            if(newEmailsData[key].id === selectedFol.id) {
              delete newEmailsData[key]
              newEmailsData[newFolder.title] = newFolder
            }
          })
          setEmailsData(newEmailsData)
          console.log(newFolder)
      } 
      else  {
          setIsModalActive(false)
          setEmailsData(prev => ({
            ...prev,
            [newFolder.title]: newFolder
          }))
          console.log(newFolder)

      }
        setNewFolder(prev => ({
          ...prev,
          name: '',
          title: ''
        }))
        setIsEditing(false) 
        setIsModalActive(false)
    }

    const handleCancel = () => {
      setIsModalActive(false)
      setDoubleFol(false)
      setNewFolder(prev => ({
        ...prev,
        name: '',
        title: ''
      }))
    }

  return (
    <div className='modal' style={{display: isModalActive ? 'flex' : 'none'}}>
    <div className='modal__content'>
        <div className='modal__title'>
          <h2>{isEditing ? 'Редактировать' : 'Новая папка'}</h2>
          <div className='modal__close' onClick={handleCancel}>&#x2717;</div>
        </div>
        <label>
          <input style={{margin: doubleFol ? '0' : '20px 0'}}placeholder='Название' maxLength='30' value={newFolder.title} onChange={e => handleInput(e)} />
        </label>
        <p style={{display: doubleFol ? 'flex' : 'none'}}>Папка с таким названием уже существует</p>
        <div className='modal__btns'>
          <button className='button__add' onClick={addEditFol}>{isEditing ? 'Сохранить' : 'Добавить папку'}</button>
          <button className='button__cancel' onClick={handleCancel}>Отменить</button>
        </div>
    </div>
  </div>

  )
}

export default Modal