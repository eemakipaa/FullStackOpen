/**
 * Full Stack open 2021 - kurssitiedot
 * Author: Eero Mäkipää
 * eero.h.makipaa@gmail.com
 */
import React from 'react';

// Components
const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part = {props.parts[0]} />
      <Part part = {props.parts[1]}/>
      <Part part = {props.parts[2]}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of total exercises:
        {
          props.totalExNum[0].exercises +
          props.totalExNum[1].exercises +
          props.totalExNum[2].exercises
        }
      </p>
    </div>
    )
}

const Part = (props) => {
  return(
    <div>
      {props.part.name}: {props.part.exercises} exercises
    </div>
  )
}

// App Component
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total totalExNum={course.parts} />
    </div>
  )
}

export default App;