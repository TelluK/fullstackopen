import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import countryService from './services/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    countryService
    .getAll()
    .then(initialData => {
      console.log('got data')
      setCountries(initialData)
    })
  }, [])

  // console.log('countries.length:', countries.length, 'countries')
  // if (countries.length > 0) {
  //   console.log('here is 1 country ', countries[0])
  //   console.log('common name:', countries[0].name.common)
  // }

  const handleFilter = (event) => {
    setFilterValue(event.target.value)
  }

  const handleSelected = (selectedCountryName) => {
    console.log('Country:', selectedCountryName)
    setFilterValue(selectedCountryName)
  }

  return (
    <>
      <div>
        find countries<input value={filterValue} onChange={handleFilter}/>
      </div>
      <Countries 
        handleSelected={handleSelected} 
        countries={countries.filter(country => country.name.common.toLowerCase().includes(filterValue.toLowerCase()))}
      />
    </>
  );
}

export default App;
