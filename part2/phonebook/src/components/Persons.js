import Person from "./Person"

const Persons = (props) => {
  // console.log('in Persons component, props:', props)
  const {persons} = props
  return (
    <>
      {persons.map(person => 
        <Person key={person.name} person={person} />
    )}
    </>
  )
}

export default Persons