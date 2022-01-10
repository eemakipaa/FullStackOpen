/**
 * Full Stack open 2021 - Unicafe
 * Author: Eero Mäkipää
 * 
 * Simple feedback giving application. User can give good, neutral or bad feedback.
 * Application presents statistical data on given feedback.
 */
import React, {useState} from "react";

// Components

const Button = ({handleClick, text}) => {
  return(<button onClick={handleClick} >{text}</button>)
}
 
const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}: {value}</td>
    </tr>
  )
}

/*
 * Component renders a table to show feedback given by user. If any feedback
 * isn't given, component renders "No feedback given" line
 */
const Statistics = ({good, neutral, bad}) => {
  const countAverage = () => {
    let sum = good * 1 + bad * -1
    return (sum / (good + neutral + bad))
  }
  if (good + neutral + bad === 0) {
    return (
      <div>
        <h3>No feedback given</h3>
      </div>
    )
  } 
  else {
    return (
      <table>
        <thead style={{textAlign: 'left'}}>
          <tr>
            <th>Statistics</th>
          </tr>    
        </thead>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"}  value={bad}/>
          <StatisticLine text={"all"} value={good + neutral + bad} />
          <StatisticLine text={"average"} value={countAverage()} />
          <StatisticLine text={"positive"} value={good / (good + neutral + bad) * 100 + ' %'} />
        </tbody>
      </table>
    )
  } 
}

// App component
const App = () => {
  // State hooks
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
      <div>
          <h1>Give feedback</h1>
          <Button text="Good" handleClick={() => setGood(good + 1)} />
          <Button text="Neutral" handleClick={() => setNeutral(neutral + 1)} />
          <Button text="Bad" handleClick={() => setBad(bad + 1)} />
          <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
  )
}

export default App