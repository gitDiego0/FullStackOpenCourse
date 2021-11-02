import ReactDOM from 'react-dom'
import React, { useState } from 'react'

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

  const filter = (event) => {
    return setPersonsFiltered(
      persons.filter(function (el) {
        return (
          el.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
        )
      })
    )
  }

  return <div></div>
}

ReactDOM.render(<App />, document.getElementById('root'))
