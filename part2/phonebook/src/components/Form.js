const Form = (props) => (
  <form onSubmit={props.handleForm}>
    <div> name: <input value={props.newName} onChange={props.handleName}/> </div>
    <div> number: <input value={props.newNumber} onChange={props.handleNumber}/> </div>
    <div> <button type="submit">add</button> </div>
  </form>
);

export default Form;