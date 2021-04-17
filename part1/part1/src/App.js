import React from 'react'

const App = () => {
  const now = new Date()
  const a = 5
  const b = 20

    return (
  <div>
    <p>Hello world, time is now {now.toString()}</p>
    <p> {a} + {b} is {a + b} </p>
    <Hello name="Brian" age={b} />
    <Hello name="M" age={a + b} />
  </div>
  
  )
  }

  const Hello = (props) => {
    return (
      <div>
        <p>Hotdog {props.name}, you are {props.age} years old </p>
      </div>
    )
  }



export default App