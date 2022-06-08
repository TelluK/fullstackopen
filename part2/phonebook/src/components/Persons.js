import Person from "./Person"

const Persons = (props) => {
  console.log('in Persons component, props:', props)
  const {persons, filterValue, handleDelete } = props

//   <>
//   {persons.map(person => 
//     <Person key={person.name} person={person} />
// )}
// </>

// {persons.filter(person => {
//   person.name.toLowerCase().includes(filterValue.toLowerCase())
// })}


// {persons.filter(person => {
//   return person.name.toLowerCase().includes(filterValue.toLowerCase()).map(person => {
//     return <Person key={person.name} person={person} />
//   }
//   )
// })}



// {persons.map(person => 
//   <Person key={person.name} person={person} />
// )}

  return (
    <div>
      {filterValue === '' ? 
      persons.map(person => <Person key={person.name} person={person} handleDelete={() => handleDelete(person.id)}/>)
      : <div>
          {persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase())).map(person => {
            return <Person key={person.name} person={person} handleDelete={() => handleDelete(person.id)} />
          })
          }
        </div>
      }
    </div>
  )
}

export default Persons