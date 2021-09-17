const Person = ({ person }) =>  <span>{person.name}<br />{person.number} </span>

const Display = ({ persons, removePerson }) => (
  persons.map(person => (
    <p key={person.id}>
      <Person person={person} />
      <button onClick={() => removePerson(person.id)}>delete</button>
    </p>
  ))
);

export default Display;