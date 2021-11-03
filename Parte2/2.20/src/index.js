import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import personsService from './services/persons'
import './styles/styles.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsFiltered, setPersonsFiltered] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [success, setSuccess] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(false)
    personsService
      .getAll()
      .then((response) => setPersons(response.data))
      .catch((err) => console.log(err.message))
  }, [])

  useEffect(() => {
    setPersonsFiltered(persons)
  }, [persons])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleRemove = (id) => {
    if (window.confirm('Do you really want remove this person?')) {
      personsService.remove(id).catch((err) => {
        console.log(err.message)
      })
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const element = checkIfExists()
    if (!element) {
      personsService.create({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      })
      setSuccess(true)
      setShow(true)
    } else {
      personsService
        .update(element.id, { name: newName, number: newNumber })
        .then(() => {
          return alert('Person updated')
        })
        .catch((err) => {
          console.log(err.message)
          setSuccess(false)
          setShow(true)
        })
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
      <div className={show ? (success ? 'success' : 'error') : 'none'}>
        {success ? `Person added correctly` : `Person doesn't exists `}
      </div>
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
      {personsFiltered.map(({ name, number, id }) => {
        return (
          <div key={id}>
            <span key={name}>
              {name} - {number}
            </span>
            <button onClick={() => handleRemove(id)}>Delete</button>
          </div>
        )
      })}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
