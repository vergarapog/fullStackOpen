import React from 'react'

const Header = (props) => {
    return (
    <div>
      <p>
       {props.title}
      </p>
    </div>
    )
}

const Content = (props) => {
  
  console.log(props)
  const[first, second, third] = props.parts
return (
  <div>
      <Part part={first.name} exe={first.exercises} />
      <Part part={second.name} exe={second.exercises} />
      <Part part={third.name} exe={third.exercises} />
    </div>
)
}

const Part = (props) => {
  return (
    <>
      <p>
      {props.part} {props.exe}
      </p>
    </>
    )

}

const Total = (props) => {

  const[first, second, third] = props.parts
  return (
    <div>
      <p>
      Number of exercises {first.exercises + second.exercises + third.exercises}
      </p>
    </div>
    )

}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  

  return (
    <div>
      <h1><Header title={course} /></h1>
      <Content parts={parts}/>
      <Total parts={parts} />
    </div>
  )
}



export default App