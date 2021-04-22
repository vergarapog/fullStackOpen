import React, { useState } from 'react'

const Header = (props) =>{
  return(
    <h1>
      {props.text}
    </h1>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Score = (props) =>{
  return(
    <div>
      has {props.score} votes
    </div>
  )
}

const BestQuote = (props) =>{
  return(
    <div>
      {props.text}
      <Score score={props.score} />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(6).fill(0))

  
  //console.log(points)

  var x

  const generate = () => { 
  x = Math.floor((Math.random() * anecdotes.length - 1) + 1)
  //console.log(x)
  setSelected(x)
  }

  const vote = () => {
   const copy = [...points]
   
   copy[selected] += 1 
   setPoints(copy)
   console.log(copy)
  }
  
  return (
    <div>
      <Header text='Anecdote of the day' />
      {anecdotes[selected]}
      <Score score={points[selected]}/>
      <br></br>
      <Button handleClick={() => vote()} text='Vote'/>
      <Button handleClick={() => generate()} text='Next Quote'/>

      <Header text ='Anecdote with most votes' />

      <BestQuote text ={anecdotes[points.indexOf(Math.max(...points))]} score={Math.max(...points)} />
      
    </div>
    
  )
}

export default App