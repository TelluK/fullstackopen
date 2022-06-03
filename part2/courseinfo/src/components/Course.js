import React from 'react'

const Header = (props) => <h2>{props.course.name}</h2>
  
const Content = (props) => {
    console.log(props)  
    const {parts} = props.course
    return (
        parts.map(part => <Part part={part} key={part.id} />)
    )
}
  
const Part = ({part}) => <p>{part.name} {part.exercises}</p>
  
const Total = (props) => {
    const {parts} = props.course
    const total = parts.reduce((sum, part) => {
        console.log('in reducer', sum, part)
        return sum + part.exercises 
    }, 0)

    return (
        <p><strong>Total of {total} exercises</strong></p>
    )
}

const Course = (props)  => {
    console.log(props)
    const {course} = props
    return (
        <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course}/>
        </>
    )
}


export default Course