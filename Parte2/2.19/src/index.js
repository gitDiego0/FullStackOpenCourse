import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import './styles/styles.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [personsFiltered, setPersonsFiltered] = useState(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [success, setSuccess] = useState(false)

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
      setPersonsFiltered([
        ...persons,
        {
          name: newName,
          number: newNumber,
        },
      ])
      setSuccess(true)
    } else {
      alert(`${newName} is already added to phonebook`)
      setSuccess(false)
    }
  }

  const checkIfExists = () => {
    return persons.find((elem) => elem.name === newName)
  }

  const filter = (event) => {
    return setPersonsFiltered(
      persons.filter(function (el) {
        return (
          el.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
        )
      })
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter: <input onChange={filter} />{' '}
      </div>

      <div>
        <h2>add new</h2>
      </div>
      <div className={success ? 'success' : 'none'}>Person added correctly</div>
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
      {personsFiltered.map(({ name, number }) => {
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
