import { act, useReducer, useState } from 'react'
import UseReducer from './UseReducer'


const reducer = (state,action)=>{
  // console.log(state,action);
  if(action.type === "incr"){
    if(state.count === "error value"){
      return {count:0}
    }
    return {count:state.count+1}
  }
  if(action.type === "decr"){
    if(state.count === "error value"){
      return {count:0}
    }
    return {count:state.count-1}
  }
  else{
    return{count:"error value"}
    // throw new Error('Unsupported type function')
  }

}
function App() {
  // const [count, setCount] = useState(0)
  // console.log(count);
  // console.log(setCount);


  // dispatch triggers the action method of reducer
  const handleInc = ()=>{
    // setCount((prev)=>prev+1);
    // console.log(state.count);
    dispatch({type:"incr"});
  }
  const handleDec = ()=>{
    // setCount((prev)=>prev-1);
    dispatch({type:"decr"})
  }

  const handleErr = () =>{
    dispatch({type:"err"})
  }
  const [state,dispatch] = useReducer(reducer,{ count:0 })

  // reducer is a pure function 
  // state and action two inputs
  // no useEffect



  return (
    <>
      {/* <h1>useReducer: {state.count}</h1>
      <button onClick={handleInc}>Add</button>
      <button onClick={handleDec}>Sub</button>
      <button onClick={handleErr}>Error</button> */}
      <UseReducer/>
    </>
  )
}

export default App
