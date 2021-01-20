import './App.css'
import React, { useState, useEffect } from 'react'
import 'katex/dist/katex.min.css'
import TeX from '@matejmazur/react-katex'
import io from 'socket.io-client'
import styled from 'styled-components'

const _ = String.raw
const ENDPOINT = 'http://localhost:3000/'
const socket = io(ENDPOINT)

const Splitview = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
`

const Header = styled.div`
  width: 100wv;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Pacifico', cursive;
  font-size: 26px;
`

const TextArea = styled.textarea`
  height: calc(100vh - 100px);
  flex: 1;
`

function App () {
  const [response, setResponse] = useState('x^n + y^n = z^n')

  useEffect(() => {
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
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link href='https://fonts.googleapis.com/css2?family=Pacifico&display=swap' rel='stylesheet' />
      <Header>Airtex react</Header>

      <Splitview>
        <TextArea onChange={(e) => send(e.target.value)} value={response} />

        <TeX
          style={{ flex: 1 }}
          block
          className='output'
        // you can change directly KaTeX options!
          settings={{ macros: { '*': _`\cdot` } }}
        >
          {response}
        </TeX>
      </Splitview>
    </div>
  )
}

export default App
