const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return (
      <h1>{props.course.name}</h1>
    )
  }

  const Content = (props) => {
    const {parts} = props.course
    return (
      parts.map(part => <Part part={part} />)
    )
  }

  const Part = (props) => {
    const {part} = props
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }

  const Total = (props) => {
    const {parts} = props.course
    let sum = 0
    parts.forEach(part => sum += part.exercises)
    return (
      <p>Number of exercises {sum} </p>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course}/>
    </div>
  )
}

export default App
