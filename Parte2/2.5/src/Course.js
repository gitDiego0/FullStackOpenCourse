import React from 'react'

export default function Course({ course: { name, id, parts } }) {
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
