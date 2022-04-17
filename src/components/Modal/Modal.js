import React from 'react'
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
      if (isEditing) {
          Object.keys(newEmailsData).map(key=> {
            if(newEmailsData[key].id === selectedFol.id) {
              delete newEmailsData[key]
              newEmailsData[newFolder.title] = newFolder
            }
          })
          setEmailsData(newEmailsData)
      } 
      else  {
          setIsModalActive(false)
          setEmailsData(prev => ({
            ...prev,
            [newFolder.title]: newFolder
          }))
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
          <div className='modal__close' onClick={() => setIsModalActive(false)}>&#x2717;</div>
        </div>
        <label>
          <input placeholder='Название' maxLength='30' value={newFolder.title} onChange={e => handleInput(e)} />
        </label>
        <div className='modal__btns'>
          <button className='button__add' onClick={addEditFol}>{isEditing ? 'Сохранить' : 'Добавить папку'}</button>
          <button className='button__cancel' onClick={handleCancel}>Отменить</button>
        </div>
    </div>
  </div>

  )
}

export default Modal