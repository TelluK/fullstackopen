const Filter = (props) => {
  const {filterValue, handleFilter } = props

  return (
    <div>
        filter shown with <input value={filterValue} onChange={handleFilter} />
      </div>
  )
}

export default Filter