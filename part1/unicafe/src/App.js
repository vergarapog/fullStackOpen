import React, { useState } from 'react'

const Header = ({header}) => {
  return(
    <h2>
      {header}
    </h2>
  )
}

const Button = ({func, text}) =>{
  return(
    <button onClick={func}>
      {text}
    </button>
  )
}

const Title = ({title}) => {
  return(
    <div>
      {title}
    </div>
  )
}

const Stats = ({text, data, end}) =>{

  

  return(
    <tr>
      <td>{text}</td>
      <td>{data}</td>
      <td>{end}</td> 
    </tr>
  )

}

const StatsBody = ({good, neutral, bad}) => {


  if(good + neutral + bad === 0){
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return(
  <table>
    <tbody>
      <Stats text='Good' data={good} />
      <Stats text='Neutral' data={neutral} />
      <Stats text='Bad' data={bad} />      

      <Stats text='All Feedbacks:' data={good + neutral + bad} />

      <Stats text='Average:' data={(good + -bad) / (good + neutral + bad)}/>

      <Stats text='Positive:' data={100*(good) / (good + neutral + bad)} end='%' />

      </tbody>
  </table>
    
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () =>{
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header='give feedback'/>
      <br></br>
      <Button func = {handleGood} text ='good'/>
      <Button func = {handleNeutral} text ='neutral'/>
      <Button func = {handleBad} text ='bad'/>
      <br></br>
      <br></br>
      <Header header='statistics'/>
      <br></br>
      <StatsBody good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App