import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
  
    const total = course.parts.reduce((sum, part) => {
      return sum += part.exercises
    } , 0 )
  
    console.log(total)
  
    //const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises + course.parts[3].exercises
    return(
      <p><b>total of {total} exercises</b></p>
    ) 
  }
  
  const Part = ({name, exe}) => {
    return (
      <p>
        {name} {exe}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map( part =>
        <Part key={part.id} name={part.name} exe={part.exercises} />
        )}
      </div>
    )
  }
  
  const Course = ({courses}) =>{
  
    console.log(courses)
    return(
      <div>
        {courses.map((course) => 
        <>
        <Header course={course}/>
        <Content course={course} />
        <Total course={course} />
        </>
        )}
      </div>
    )
  }





export default Course