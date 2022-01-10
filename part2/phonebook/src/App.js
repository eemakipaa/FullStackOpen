/**
 * Full Stack 2021 - phonebook
 * Author: Eero Mäkipää
 * 
 * Phonebook application that saves contact information to json-server.
 * User can create new contacts by giving the contact name and phone number.
 * User can search, edit or delete contacts. Application gives user feedback based
 * on wheteher operation was successfull or not.
 */
import React, {useState, useEffect} from 'react'
import phonebookService from './services/phonebook'
import Contacts from './components/Contacts'
import Search from './components/Search'
import Form from './components/Form'
import Notification from './components/Notification'

// App component
const App = () => {
  // State hooks
  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameQuery, setNameQuery] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  // css-classnames
  const notificationTypeSuccess = "success"
  const notificationTypeError = "error"

  // Effect hook to get data from json-server
  useEffect(() => {
      phonebookService
        .getAll()
        .then(personsData => {
          setPersons(personsData)
          setPersonsToShow(personsData)
        })
        .catch( () => {
          setNotificationType(notificationTypeError)
          setNotificationMessage("Could not get data from server!")
        })
  },[])

  // Functions to clean up code
  const eraseNotification = () => {
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 4000)
  }

  const eraseInputFields = () => {
    setNewName('')
    setNewNumber('')
    setNameQuery('')
  }

  // Event handlers
  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  /* Search logic that changes the state of which contacts Contacts component shows
   * and updates the searh input field
   */
  const handleSearchChange = (event) => {
    setNameQuery(event.target.value)
    setPersonsToShow(
      persons.filter( person => 
          person.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
      )
    )
  }

  /* Handler adds new contacts after submitting the form or opts editing the number
   * of existing contact
   */ 
  const handleFormSubmit = (event) => {
    event.preventDefault()
    // If contact exists ask option to edit the number of existing contact
    if (persons.map(person => person.name.toLocaleLowerCase()).includes(newName.toLocaleLowerCase())) {
      if (window.confirm(`${newName} is already added to the contacts. Replace the old number with a new one?`)) {
        const personToEdit = persons.find(
          person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
        )
        const editedPerson = {
          name: newName,
          number: newNumber,
          id: personToEdit.id
        }
        phonebookService
          .edit(editedPerson)
          .then( returnedContact => {
            setNotificationType(notificationTypeSuccess)
            setNotificationMessage(`${newName} was succesfully edited!`)
            setPersons(persons.map(person => person.id !== returnedContact.id ? person : returnedContact))
            setPersonsToShow(personsToShow.map(person => person.id !== returnedContact.id ? person : returnedContact))
            eraseNotification()
            eraseInputFields()
          })
          .catch( error => {
            setNotificationType(notificationTypeError)
            setNotificationMessage(
              `${newName} does not exist on server`
            )
            eraseNotification()
            eraseInputFields()
            setPersons(persons.filter(person => person.name.toLocaleLowerCase() !== newName.toLocaleLowerCase()))
            setPersonsToShow(personsToShow.filter(person => person.name.toLocaleLowerCase() !== newName.toLocaleLowerCase()))
          })
      }

    }
    // Add new contact to the phonebook
    else {
      const contactObject = {
        name: newName,
        number: newNumber,
      }
      phonebookService
        .create(contactObject)
        .then(returnedContact => {
          setNotificationType(notificationTypeSuccess)
          setNotificationMessage(`${newName} was added to your contacts!`)
          setPersons(persons.concat(returnedContact))
          setPersonsToShow(persons.concat(returnedContact))
          eraseNotification()
          eraseInputFields()
        })
        .catch(error => {
          setNotificationType(notificationTypeError)
          setNotificationMessage("Something went wrong!")
          eraseNotification()
        })
    }
  }

  /**
   * Handler to delete contacts. Handler deletes a contact from server using
   * phonebookService. Handler deletes contact from app states persons and
   * personsToShow. Delete confirmation asked with window.confirm() 
   */
  const handleContactDelete = (contact) => {
    if (window.confirm(`Delete ${contact.name} from your contacts?`)) {
      phonebookService
        .deleteContact(contact.id)
        .then( () => {
          setNotificationType(notificationTypeSuccess)
          setNotificationMessage(`${contact.name} was deleted from your contacts!`)
          setPersons(persons.filter(c => c.id !== contact.id))
          setPersonsToShow(personsToShow.filter(c => c.id !== contact.id))
          eraseNotification()
        })
        .catch(error => {
          setPersons(persons.filter(c => c.id !== contact.id))
          setPersonsToShow(personsToShow.filter(c => c.id !== contact.id))
        })
    }
  }

  // App return statement
  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={nameQuery} onChange={handleSearchChange} />
      <Notification message={notificationMessage} type={notificationType} />
      <h2>add a new contact</h2>
      <Form 
        onSubmit={handleFormSubmit}
        nameValue={newName}
        nameChange={handleNameChange}
        numberValue={newNumber}
        numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Contacts persons={personsToShow} buttonClick={handleContactDelete} />
    </div>
  )
}

export default App