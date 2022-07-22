import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
// personService (uses axios) handles communication with backend
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  // newName state is controlling the form input element
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [okMessage, setOkMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const okMessageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontStyle: 'bold',
    fontSize: 20,
    borderStyle: 'solid',
    padding: 10
  }

  const errorMessageStyle = {
    color: 'red',
    background: 'lightgrey',
    fontStyle: 'bold',
    fontSize: 20,
    borderStyle: 'solid',
    padding: 10
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialData => {
        // console.log('initialData', initialData)
        setPersons(initialData)
      })
  }, [])
  // console.log('render', persons.length, 'persons')
  // console.log('persons', persons)

  const addName = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: phoneNumber }

    // check if newName already exist in the phonebook
    if (persons.filter(person => person.name === newName).length > 0) {
      const person = persons.find(p => p.name === newName)
      const changedPerson = {...person, number: phoneNumber}
      // console.log('changed person:', changedPerson)

      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
        personService
          .update(changedPerson.id, changedPerson)
          .then(res => {
            // console.log('res', res)
            if (res.status === 200) {
              setPersons( persons.map(person => person.id !== changedPerson.id ? person : res.data))
              setNewName('')
              setPhoneNumber('')
              showSuccessMessage(`Replaced number for ${res.data.name}`)
            }
          })
          .catch(error => {
            console.log('error', error)
            showErrorMessage(`Information of ${changedPerson.name} has already been removed from server`)
          })
      }
    } else {
      console.log('add new person with name', newName)

      personService
        .create(newPerson)
        .then(personData => {
          // console.log('data', personData)
          setPersons(persons.concat(personData))
          showSuccessMessage(`Added ${personData.name}`)
        })
        .catch(error => console.log('error', error))

      setNewName('')
      setPhoneNumber('')
    }
  }

  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000);
  }

  const showSuccessMessage = (message) => {
    setOkMessage(message)
    setTimeout(() => {
      setOkMessage(null)
    }, 5000);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterValue(event.target.value)
  }

  const handleDelete = (id) => {
    // console.log('IN APP COMPONENT, handleDelete, person id:', id)
    const person = persons.find(p => p.id === id)
    // console.log('person to delete', person)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then(res => {
          // console.log('status:', res.status)
          if (res.status === 204) {
            // status 204 = No Content 
            showSuccessMessage(`Deleted ${person.name}`)
            setPersons(persons.filter(person => person.id !== id))
          }
        })
        .catch(error => {
          showErrorMessage(`Error in deleting person ${person.name}`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={okMessage} style={okMessageStyle} />
      <Notification message={errorMessage} style={errorMessageStyle} />
      <Filter filterValue={filterValue} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm 
        persons={persons}
        newName={newName} 
        phoneNumber={phoneNumber}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
        addName={addName}
      />
      <div>debug: {newName}</div>
      <h3>Numbers</h3>
      <Persons persons={persons} filterValue={filterValue} handleDelete={handleDelete} />
    </div>
  )
}

export default App