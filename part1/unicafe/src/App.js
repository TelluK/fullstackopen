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
      <StatisticLine  text="good" value={good} />
      <StatisticLine  text="neutral" value={neutral} />
      <StatisticLine  text="bad" value={bad} />
      <StatisticLine  text="all" value={sum} />
      <StatisticLine  text="average" value={average} />
      <StatisticLine  text="positive" value={positive} />
    </>
  )
}

const StatisticLine = ({text, value}) => {
  if (text === "positive") return (<p>{text} {value} %</p>)
  
  return (<p>{text} {value}</p>)
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App