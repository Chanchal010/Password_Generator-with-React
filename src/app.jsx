import React, { useState, useCallback, useRef, useEffect} from 'react'


function App() {

const [length, setLength] = useState(8)
const [number, setNumber] = useState(false)
const [character, setCharacter] = useState(false)
const [password, setPassword] = useState("")

const passwordRef = useRef(null)

const passwordGenerator = useCallback(()=>{
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  if(number) str += "123456789"
  if(character) str += "!@#$%^&*{}[]+=-_`"

  for (let i = 1; i <= length ; i++) {
    let char = Math.floor(Math.random() * str.length + 1)    
    pass += str.charAt(char)
  }
  setPassword(pass)


}, [length, number, character, setPassword])

const copyPassword = useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0, 101)
  window.navigator.clipboard.writeText(password)
},[password])

useEffect(()=>{
  passwordGenerator()
}, [length, number, character, passwordGenerator])


  return (
    <>
<div className='w-full mx-w-md mx-auto shadow-md rounded-full px-4 my-8 text-orange-500 bg-gray-700'>
  <h1 className='text-white text-center my-3 font-medium text-2xl'>Password Generator</h1>
  <div className='flex shadow rounded-lg overfflow-hidden mb-4 justify-center text-xl'>
    <input 
    type="text" 
    value={password}
    className='outline-none w-full py-2 px-3 mx-1 my-2 overflow-hidden rounded-full'
    placeholder='password'
    readOnly
    ref={passwordRef}
    />
    <button 
    onClick={copyPassword}
    className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 mx-0.4 my-2 hover:bg-blue hover:text-black rounded-full'>copy</button>
  </div>
  <div className='flex text-sm gap-x-2 justify-center text-xl'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'

         onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1 justify-center text-xl">
      <input
          type="checkbox"
          defaultChecked={number}
          id="numberInput"
         onChange={()=>{setNumber((prev)=> !prev)}}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1 justify-center text-xl">
          <input
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
             onChange={()=>setCharacter((prev)=> !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
  </div>  
    </>
  )
}

export default App
