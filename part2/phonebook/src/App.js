import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const Filter = (props) => {

  return (
    <div>
      <div>
        Filter shown: <input value={props.search} onChange={props.onChange} onKeyUp={props.onKeyUp} />
      </div>
      {props.personList.map(person =>
        <Person key={person.name} name={person.name} number={person.number} />
      )
      }
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addNote}>
        <div>
          Name: <input value={props.newName} onChange={props.onChangeName} />
        </div>
        <div>
          Number: <input value={props.newNumber} onChange={props.onChangeNum} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = (props) => {

  
  return (
    <div>
      {props.persons.map((person, i) =>
        <Person key={i} name={person.name} number={person.number}
        deleteFunc={() => props.handleDelete(person.id)} />
      )
      }
    </div>
  )
}

const Person = (props) => {
  return (
    <div>
      {props.name} {props.number}
      <button onClick={props.deleteFunc}>Delete</button>
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([

  ])
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchList, setList] = useState([])
  const [message, setMessage] = useState('')
  const [messType, setMessType] = useState('')

  useEffect(() => {
    personService.getAll().then(persons =>
      setPersons(persons)
    )
  }, [])



  const addNote = (event) => {
    event.preventDefault()
    console.log(persons)
    
    let allNames = persons.map(person => person.name)


    if (allNames.includes(newName)) {
      if(window.confirm(`${newName} is already added to phonebook replace old number with a new one?`)){
        const idReplace = (persons.find(person => person.name === newName).id)
        const newPerson = {
          name: newName,
          number: newNumber
        }
        personService.editNumFunc(idReplace, newPerson)
                     .then(response => {
                      setPersons(persons.map(person => 
                        person.id === idReplace ?
                        response.data : person
                      ))
                     }).catch(error => {
                       
                       setMessage(`Information of ${newName} has been already removed from server`)
                       setMessType('error')
                       setTimeout(() => {
                        setMessage(null)
                        setMessType(null)
                       },4000)
                       setPersons(persons.filter(person => person.id !== idReplace))
                     })

      }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setMessage(null)
          setMessType(null)
        },4000)
        setMessage(`Added ${newName}`)
        setMessType('success')
      })

  }

  const handleDelete = (id) =>{
    console.log(`${id} needs to be deleted`)

    const name = persons.find(p => p.id === id).name

    if(window.confirm(`delete ${name} ?`)){
    personService.deleteFunc(id)
                 .then(response => {
                  let filtered = persons
                  .filter(person => person.id !== id)
                  setPersons(filtered)
                 })
            }
  }

  const handleUpdate = (id) => {

  }

  const HandleEmptySearch = () => {
    if (!search.trim().length) {
      setList([])
    }
  }

  const HandleSearchChange = (event) => {
    setSearch(event.target.value)
    if (!search.trim().length) {
      return
    }

    const newList = persons.filter(person => {
      return person.name.trim().toUpperCase().includes(search.toUpperCase().trim())
    }
    )

    setList(newList)
  }

  const HandleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const HandleNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messType}/>
      <Filter search={search} onChange={HandleSearchChange} onKeyUp={HandleEmptySearch} personList={searchList} />
      <h2>Add New Person</h2>
      <PersonForm addNote={addNote} newName={newName} onChangeName={HandleNameChange} newNumber={newNumber} onChangeNum={HandleNumChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App