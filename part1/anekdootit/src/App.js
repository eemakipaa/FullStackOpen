/**
 * Full Stack open 2021 - anecdotes
 * Author: Eero Mäkipää
 * 
 * Application renders an anecdote. User can give a vote to the anecdote, or choose
 * next anecdote to show. Application shows the anecdote with most votes.
 */

import React, { useState } from 'react'

const App = () => {
  // Array of anecdotes
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
  ]
  
  // State hooks
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  // Event handlers
  const handleNextAnecdote = () => {
    const next = Math.floor(Math.random() * anecdotes.length)
    if (next === selected) {
        handleNextAnecdote()
    } else {
        return (setSelected(next))
    }
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    handleNextAnecdote()
  }

  // Return statement
  return (
    <div>
        <h1>Anecdote of the day</h1>
        <h3>{anecdotes[selected]}</h3>
        <h4>Has {points[selected]}points</h4>
        <button onClick={handleVote}>Vote</button>
        <button onClick={handleNextAnecdote}>Next anecdote</button>
        <br></br>
        <h1>Anecdote with most votes</h1>
        <h3>{anecdotes[points.indexOf(Math.max(...points))]}</h3>
    </div>
  )
}

export default App