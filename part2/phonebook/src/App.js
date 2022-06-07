import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  // newName state is controlling the form input element
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([...persons])
  console.log(filteredPersons)

  const addName = (event) => {
    event.preventDefault()
    const person = { name: newName, number: phoneNumber }

    // check if newName already exist in the phonebook
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      console.log('add person with name', newName)
      setPersons(persons.concat(person))
      setNewName('')
      setPhoneNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log('handle', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('phone', event.target.value)
    setPhoneNumber(event.target.value)
  }

  const handleFilter = (event) => {
    // console.log('filterValue:', event.target.value)
    setFilterValue(event.target.value)

    let newFilteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
    // console.log('newFilteredPersons:', newFilteredPersons)
    setFilteredPersons(newFilteredPersons ? newFilteredPersons : [])
    // console.log(filteredPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filterValue} onChange={handleFilter} />
      </div>
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
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App