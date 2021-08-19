import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button name={props.text} onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Statistics = ({ good, totalVotes, neutral, bad }) => {
  const average = 0 || (good - bad) / totalVotes
  const positiveAverage = 0 || (good / totalVotes) * 100
  return (
    <>
      <p>{good}</p>
      <p>{neutral}</p>
      <p>{bad}</p>
      <p>{totalVotes}</p>
      <p>{average}</p>
      <p>{positiveAverage}%</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (e) => {
    return e.target.name === 'Good'
      ? setGood(good + 1)
      : e.target.name === 'Neutral'
      ? setNeutral(neutral + 1)
      : setBad(bad + 1)
  }

  const all = good + neutral + bad

  return (
    <div>
      <div>
        <h2>Feedback</h2>
        <Button text="Good" onClick={handleClick} />
        <Button text="Neutral" onClick={handleClick} />
        <Button text="Bad" onClick={handleClick} />
      </div>
      <div>
        <h2>Statics</h2>

        {good === 0 && bad === 0 ? (
          'No feedback given'
        ) : (
          <Statistics
            totalVotes={all}
            good={good}
            neutral={neutral}
            bad={bad}
          />
        )}
      </div>
    </div>
  )
}

export default App
