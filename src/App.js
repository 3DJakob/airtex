import './App.css'
import React, { useState, useEffect } from 'react'
// import socketIOClient from 'socket.io-client'

import io from 'socket.io-client'
const ENDPOINT = 'http://localhost:3000/'
// const socket = io(ENDPOINT, {
//   withCredentials: true,
//   extraHeaders: {
//     'my-custom-header': 'abcd'
//   }
// })
const socket = io(ENDPOINT)

function App () {
  const [response, setResponse] = useState('')

  useEffect(() => {
    // const socket = io(ENDPOINT, {
    //   withCredentials: true,
    //   extraHeaders: {
    //     'my-custom-header': 'abcd'
    //   }
    // })

    socket.on('refresh', data => {
      setResponse(data)
      console.log(data)
    })
  }, [])

  const send = (val) => {
    socket.emit('document', val)
    setResponse(val)
  }

  return (
    <div className='App'>
      <p>Airtex react</p>
      <p>{response}</p>
      <textarea onChange={(e) => send(e.target.value)} value={response} />
    </div>
  )
}

export default App
