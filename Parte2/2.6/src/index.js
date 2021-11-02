import ReactDOM from 'react-dom'
import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    setPersons([
      ...persons,
      {
        name: newName,
      },
    ])
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button onClick={checkIfExists}>add</button>{' '}
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({ name }) => {
        return <p key={name}>{name}</p>
      })}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
