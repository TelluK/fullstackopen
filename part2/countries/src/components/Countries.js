import Country from "./Country"

const Countries = (props) => {
  const {countries, handleSelected} = props
  const length = countries.length

  console.log('props', props)

  if (length > 10) return 'Too many matches, spesify another filter'

  if (length === 1) return <Country country={countries[0]} />

  return (
    <div>
      {countries.map(country => {
          return (
            <>
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => handleSelected(country.name.common)}>show</button>
            </li>
            </>
          )
        })
      }
    </div>
  )
}

export default Countries