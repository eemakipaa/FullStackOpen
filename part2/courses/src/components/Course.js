// Components to render course information. Exports the component Course.

const Course = ({course}) => {
    return (
      <div>
        <Header header={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
      
    )
  }

const Header = ({header}) => {
    return (
      <div>
        <h1>{header}</h1>
      </div>
    )
}
  
const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part}/>)}
      </div>
    )
}

const Part = ({part}) => {
    return(
      <div>
       <p className="" >{part.name}: {part.exercises} exercises</p>
      </div>
    )
}
  
const Total = ({parts}) => {
    const exercises = parts.map(part => part.exercises)
    return (
      <div>
        <h2>
          Number of total exercises: {exercises.reduce((previousValue, currentValue) => previousValue + currentValue)}
        </h2>
      </div>
      )
}

export default Course