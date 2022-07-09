const Person = (props) => {
  const {person, handleDelete} = props
  // console.log('Person props', props)
  // console.log('handleDelete', handleDelete)
  return (
    <p>
      {person.name} {person.number} 
      <button onClick={handleDelete} >delete</button>
    </p>
  )
}
export default Person