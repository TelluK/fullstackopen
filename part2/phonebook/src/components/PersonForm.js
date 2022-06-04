const PersonForm = (props) => {
  console.log('PersonForm component, props', props)

  const {newName, handleNameChange, phoneNumber, handleNumberChange, addName} = props

  return (
    <>
    <form onSubmit={addName}>
    <div>
      name: <input value={newName} onChange={handleNameChange} required/>
    </div>
    <div>
      number: <input value={phoneNumber} onChange={handleNumberChange} required/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
    </>
  )
}

export default PersonForm