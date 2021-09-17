import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Display from './components/Display';
import Form from './components/Form';
import Notification from './components/Notification';
import personServices from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    personServices
      .get()
      .then(allPersons => {
        setPersons(allPersons);
      })
  }, [])

  const personsToShow = !searchText ? persons : persons.filter(person => person.name.toLowerCase().includes(searchText));

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const alreadyRemoved = (error, newName) => {
    setError(true)
    setMessage(`Information of ${newName} has already been removed from server`)

    setTimeout(
      () => { setMessage("") },
      3000
    )
  }

  const addPerson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    };

    let added = false;
    const personInServer = persons.find(person => person.name === newName);
    if(personInServer) {
      if(window.confirm(`${personInServer.name} is already added to phonebook, replace the old number with the new one?`)) {
        personServices
          .update(personInServer.id, newPerson)
          .then(() => {
            setPersons(persons.map(person => person.name === newName ? newPerson : person));
          })
          .catch(
            () => alreadyRemoved(error, newName),
            3000
          )
        added = true;
      }
    } else {
        personServices
          .create(newPerson)
          .then((newObject) => {
            setPersons(persons.concat(newObject))
            setNewName("");
            setNewNumber("");
          });
        added = true;
    }

    if(added) { 
      setError(false);
      setMessage(`Added ${newName}`);

      setTimeout(
        () => { setMessage("") },
        3000
      )
    }
  }

  const searchBook = (e) => {
    setSearchText(e.target.value.toLowerCase());
  }

  const removePerson = (id) => {
    const person = persons.find(person => person.id === id);
    if(window.confirm(`Delete ${person.name}?`)) {
      personServices
        .remove(id)
        .catch(
          () => alreadyRemoved(error, person.name),
          3000
        )
      setPersons(persons.filter(person => person.id !== id));
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />

      <Filter onClick={searchBook} />

      <h2>add a new</h2>
      <Form 
        handleForm={addPerson} handleName={handleNameChange} handleNumber={handleNumberChange}
        newName= {newName} newNumber= {newNumber} />

      <h2>Numbers</h2>
      <Display persons={personsToShow} removePerson={removePerson}/>
    </div>
  );
}

export default App;
