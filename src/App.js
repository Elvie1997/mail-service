import React, {useState} from 'react'
import { Routes, Route, useNavigate, } from "react-router-dom";
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import TopHeader from './components/TopHeader/TopHeader.js';
import EmailList from './components/EmailList/EmailList.js';
import Header from './components/Header/Header.js'
import Sidebar from './components/Sidebar/Sidebar.js';
import Mail from './components/Mail/Mail.js';
import { data} from './data.js'


function App() {

  const [emailsData, setEmailsData] = useState(data)
  const [currentFolder, setCurrentFolder] = useState('inbox')
  const [currentEmail, setCurrentEmail] = useState('')
  const [isMailOpened, setIsMailOpened] = useState(false)
  const [moveTo, setMoveTo] = useState('')

  // Turn object data into an array
  const emailsDataArr = Object.keys(emailsData).map(key => emailsData[key])

  // Header input
  const [input, setInput] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isInputClicked, setIsInputClicked] = useState(false)
  const [idx, setIdx] = useState(0)
  const [isSearching, setIsSearching] = useState(false)

  // Modal 
  const [isModalActive, setIsModalActive] = useState(false)
  const [newFolder, setNewFolder] = useState({
    id: '',
    name: '',
    emails: [],
    isSomeSelected: false,
    icon: faFolderOpen,
    title: '',
    total: '',
})

// Handle browser's back/forward and reload buttons

  const navigate = useNavigate()
  window.onload = () => {
    navigate('/inbox')
  }

  window.onpopstate = e => {
   
   if(idx <= e.state.idx) {
     setIsMailOpened(false)
     setIdx(prev => prev - 1)
   } else {
     setIsMailOpened(true)
     setIdx(prev => prev + 1)
   }

 }

  const search = () => {
    const found = []
    const keys = ['title', 'sender', 'message']
 
    emailsDataArr.map(item => 
     keys.map(key => item.emails.map(email => {
      if(email[key].toLowerCase().includes(input.toLowerCase())) {
        found.push(email)
      }
    })))

    const unique = [...new Set(found)]
    setSearchResults(unique)
    setIsSearching(true)
  }

  const handleCheckBox = (id) => {
    const newEmailsData = {...emailsData}
    newEmailsData[currentFolder].emails.map(email => email.id === id ? email.checked = !email.checked : null)
    setEmailsData(newEmailsData)
  }

  const handleSelectAll = () => {
    const newEmailsData = {...emailsData}
    
    newEmailsData[currentFolder].isSomeSelected = !newEmailsData[currentFolder].isSomeSelected
    newEmailsData[currentFolder].emails.map(email => {
      if(newEmailsData[currentFolder].isSomeSelected) {
        email.checked = true
       
      } else {
        email.checked = false
      }
    })

    setEmailsData(newEmailsData) 
  }

  // if some email is selected manually, change header info ("Выделить все" into "Снять выделение" and vice-versa)
  const newEmailsData = {...emailsData}
  const isAlreadyChecked = emailsData[currentFolder].emails.length && emailsData[currentFolder].emails.some(email => email.checked)
  
  if (isAlreadyChecked) {
    newEmailsData[currentFolder].isSomeSelected = true
  } else {
    newEmailsData[currentFolder].isSomeSelected = false
  }

  // if an email is opened, mark it as read
  currentEmail && newEmailsData[currentFolder].emails.map(email => email.id === currentEmail.id ? email.isRead = true : null)

  const moveToFolder = (folder) => {
    
    const newEmailsData = {...emailsData}
    // filter for checekd emails
    const selected = newEmailsData[currentFolder].emails.filter(email => email.checked)
    const notSelected = newEmailsData[currentFolder].emails.filter(email => !email.checked)
    // filter for opened email
    const filtered = newEmailsData[currentFolder].emails.filter(email => email !== currentEmail)

    if (isMailOpened && !currentEmail) {
      return null
    }

    else if (isMailOpened && currentFolder === 'trash' && folder === 'trash') {
      newEmailsData[currentFolder].emails = filtered
      setCurrentEmail(null)
    }

    else if (isMailOpened && currentFolder !== 'trash') {
      newEmailsData[currentFolder].emails = filtered
      newEmailsData[folder].emails = [currentEmail, ...newEmailsData[folder].emails]
      setCurrentEmail(null)
    }

    else if (isMailOpened && currentFolder === 'trash') {
      newEmailsData.trash.emails = filtered
      newEmailsData[folder].emails = [currentEmail, ...newEmailsData[folder].emails]
      setCurrentEmail(null)
    }

    else if (currentFolder === 'trash' && folder === 'trash') {
    newEmailsData.trash.emails = notSelected
    setCurrentEmail(null)
    } 
    
    else if (currentFolder === folder) {
      return null
    }

    else {
    newEmailsData[currentFolder].emails = notSelected
    newEmailsData[folder].emails = [selected, newEmailsData[folder].emails].flat()
    newEmailsData[folder].emails.map(email => email.checked = false)
    setCurrentEmail(null)
    }
    setMoveTo(newEmailsData[folder].title)
    setEmailsData(newEmailsData)
  }

  const markAsRead = () => {
    const newEmailsData = {...emailsData}
    const selected = newEmailsData[currentFolder].emails.filter(email => email.checked)
    selected.map(email => email.isRead = true)

    setEmailsData(newEmailsData)
  }

  const markAllAsRead = () => {
    const newEmailsData = {...emailsData}
    newEmailsData[currentFolder].emails.map(email => email.isRead = true)
    setEmailsData(newEmailsData)
  }

  const openMail = (email) => {
    setCurrentEmail(email)
    setIsMailOpened(true)
  }

  return (
      <div className="app">
        <TopHeader />
        <Header 
          emailsData={emailsData}
          setEmailsData={setEmailsData}
          currentFolder={currentFolder}
          handleSelectAll={handleSelectAll}
          moveToFolder={moveToFolder}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          isMailOpened={isMailOpened}
          setIsMailOpened={setIsMailOpened}
          setInput={setInput}
          input={input}
          search={search}
          setIsInputClicked={setIsInputClicked}
          isInputClicked={isInputClicked}
        />

        <div className='main'>

          <Sidebar emailsDataArr={emailsDataArr} 
            emailsData={emailsData}
            currentFolder={currentFolder}
            setCurrentFolder={setCurrentFolder} 
            setIsMailOpened={setIsMailOpened} 
            isModalActive={isModalActive}
            setIsModalActive={setIsModalActive}
            newFolder={newFolder}
            setNewFolder={setNewFolder}
            setEmailsData={setEmailsData}
            setIsSearching={setIsSearching}
            setInput={setInput}
            setIsInputClicked={setIsInputClicked}
            />

          <Routes>
            {emailsDataArr.map(item => 
              <Route key={item.name} path={`mail-service/${item.name}`} exact 
              element={<EmailList emails={item.emails} 
              handleCheckBox={handleCheckBox} 
              setCurrentFolder={setCurrentFolder} 
              openMail={openMail}
              setIsInputClicked={setIsInputClicked}
              setInput={setInput}
              isModalActive={isModalActive}
              isSearching={isSearching}
              />} 
              />
            )}
            {emailsDataArr.map(item => item.emails.map(email => 
               <Route path={`mail-service/${email.id}`} element={<Mail currentEmail={currentEmail} 
               currentFolder={currentFolder} moveTo={moveTo} />} />
            ))}
             <Route path='mail-service/search' element={<EmailList emails={searchResults} 
                handleCheckBox={handleCheckBox} 
                setCurrentFolder={setCurrentFolder} 
                openMail={openMail}
                setIsInputClicked={setIsInputClicked}
                setInput={setInput}
                isModalActive={isModalActive}
                isSearching={isSearching}
                />}/>
          </Routes>
        </div>
      </div>
  );
}

export default App;
