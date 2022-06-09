const Country = ({country}) => {
  // console.log('country.language:', country.languages)

  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {
          Object.entries(country.languages).map(lan => {
            return <li key={lan[1]}>{lan[1]}</li>
          })
        }
      </ul>
      <img alt={`flag of ${country.name.common}`} src={country.flags.png} width="200"></img>
    </>
  )
}

export default Country