import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({curso}) => {
  return <div>
    <h1>{curso}</h1>
  </div>
}

const Part = ({name,exercises}) => {
  console.log(exercises)
  return <p> {name} {exercises}</p>
}
const Content = ({parts}) => {

  console.log(parts)

  return(
    <div>
      {parts.map(part => {
        return <Part name={part.name} exercises={part.exercises} />
      })}
    </div>
  )
  // return <div>
  //   <Part name={part1.name} exercises={part1.exercises} />
  //   <Part name={part2.name} exercises={part2.exercises} />
  //   <Part name={part3.name} exercises={part3.exercises} />
  // </div>
}

const Total = ({parts}) => {
  let totalCalc = 0
  parts.map( (part) => {
    totalCalc +=  part.exercises
    return totalCalc
  })
  return <div>
    <p> Number of exercises {totalCalc} </p>
  </div>
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header curso={course} />
      <Content parts={parts}  />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))