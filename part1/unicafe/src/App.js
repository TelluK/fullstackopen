import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick} >{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  console.log("Statistics: ", good, neutral, bad)
  let sum = good + neutral + bad
  // the average score (good: 1, neutral: 0, bad: -1)
  let average = (good - bad) / sum
  let positive = (good / sum) * 100

  if (sum === 0) return (<p>No feedback given</p>)

  return (
    <>
      <table>
        <tbody>
          <tr><StatisticLine  text="good" value={good} /></tr>
          <tr><StatisticLine  text="neutral" value={neutral} /></tr>
          <tr><StatisticLine  text="bad" value={bad} /></tr>
          <tr><StatisticLine  text="all" value={sum} /></tr>
          <tr><StatisticLine  text="average" value={average.toFixed(1)} /></tr>
          <tr><StatisticLine  text="positive" value={positive.toFixed(1)} /></tr>
        </tbody>
      </table>
    </>
  )
}

const StatisticLine = ({text, value}) => {
  if (text === "positive") {
    return (
      <>
        <td>{text}</td>
        <td>{value} %</td>
      </>
    )
  }

  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App