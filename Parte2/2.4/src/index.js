import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({ course: { name, id, parts } }) => {
  const total = parts.reduce((s, p) => {
    s += p.exercises
    return s
  }, 0)

  console.log(total)

  return (
    <div>
      <h1>{name}</h1>
      <div>
        {parts.map((part) => {
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  return courses.map((course) => {
    return <Course key={course.id} course={course} />
  })
}

ReactDOM.render(<App />, document.getElementById('root'))
