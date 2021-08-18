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
const Content = ({part1,part2,part3}) => {
  return <div>
    <Part name={part1.name} exercises={part1.exercises} />
    <Part name={part2.name} exercises={part2.exercises} />
    <Part name={part3.name} exercises={part3.exercises} />
  </div>
}

const Total = ({total}) => {
  return <div>
    <p> Number of exercises {total}</p>
  </div>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const total = part1.exercises+part2.exercises+part3.exercises

  return (
    <div>
      <Header curso={course} />
      <Content part1={part1}  part2={part2}  part3={part3}  />
      <Total total={total} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))