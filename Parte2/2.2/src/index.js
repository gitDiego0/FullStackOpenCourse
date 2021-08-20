import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({ course: { name, id, parts } }) => {
  let total = 0
  return (
    <div>
      <h1>{name}</h1>
      <div>
        {parts.map((part) => {
          total += part.exercises
          return (
            <p key={part.id}>
              {part.name} {part.exercises}
            </p>
          )
        })}
        <h4>Total of exercises is {total}</h4>
      </div>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))
