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
return (
  <div>
      <p>
       {props.partNo1} {props.exe1}
      </p>
      <p>
       {props.partNo2} {props.exe2}
      </p>
      <p>
       {props.partNo3} {props.exe3}
      </p>
    </div>
)
}

const Total = (props) => {
  return (
    <div>
      <p>
      Number of exercises {props.exeTotal}
      </p>
    </div>
    )

}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <h1><Header title={course} /></h1>
      <Content partNo1 ={part1} exe1 = {exercises1}
               partNo2 ={part2} exe2 = {exercises2}
               partNo3 ={part3} exe3 = {exercises3}/>
      <Total exeTotal = {exercises1 + exercises2 + exercises3} />
    </div>
  )
}



export default App