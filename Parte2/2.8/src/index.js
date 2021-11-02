import ReactDOM from 'react-dom'
import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 123456789 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (!checkIfExists()) {
      setPersons([
        ...persons,
        {
          name: newName,
          number: newNumber,
        },
      ])
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const checkIfExists = () => {
    return persons.find((elem) => elem.name === newName)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({ name, number }) => {
        return (
          <p key={name}>
            {name} - {number}
          </p>
        )
      })}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
