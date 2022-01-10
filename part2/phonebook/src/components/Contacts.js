import React from "react"

// Component to show all contacts
const Contacts = (props) => {
  return (
    <div>
      {props.persons.map(person => 
        <Contact
          key={person.id}
          name={person.name}
          number={person.number}
          id={person.id}
          onClick={props.buttonClick}
        />
      )}
    </div>
  )
}

// Single contact line component
const Contact = (props) => {
  return(
    <div>
      {props.name}: {props.number} <button onClick={() => props.onClick(props)}>delete</button>
    </div>
  )
}

export default Contacts