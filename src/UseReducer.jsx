import React, { useReducer } from 'react'


const initialState = {
  data:[],
  loading:false,
  error:null
}

const reducer= (state,action) =>{
  console.log(state,"action",action)

  switch (action.type){

  case "FETCH_DATA_START":
    return {...state,loading:true}
  case "FETCH_DATA_SUCCESS":
    return{loading:false,error:null,data:action.payload}
  case "DELETE_DATA":
    return {...state,
      data:state.data.filter((item)=>item.id!==action.payload)
    }
  case "ADD_DATA":
    return {...state,data:[...state.data,action.payload]}
  case "FETCCH_DATA_ERROR":
    return{...state,loading:false,error:action.payload}
}
}
const UseReducer = () => {

  const [state,dispatch] = useReducer(reducer,initialState)
  
  const addData = (newData)=>{
    dispatch({type:"ADD_DATA",payload:newData})
  }

  const fetchData = async ()=>{
    dispatch({type:"FETCH_DATA_START"})
    try{
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await response.json();
      // console.log(data);
      dispatch({type:"FETCH_DATA_SUCCESS",payload:data})

    }
    catch(error){
      dispatch({type:"FETCCH_DATA_ERROR",payload:error.message})
    }


  }

  const deleteData = (id)=>{
    dispatch({type:"DELETE_DATA",payload:id})
  }
  return (
    <div>
        <button onClick={fetchData}>Fetch Data</button>
        {state.loading && <p>Loading....</p>}
        {state.error && <p>{state.error}</p>}
        <ul>
          {state.data.map((item)=>(
            // console.log(item.id, " id ",item.title)
            <li key={item.id}> {`${item.title}           `}  
            <button onClick={()=>(deleteData(item.id))}>Delete</button>
            <hr/>
              
            </li>
            
          ))}
        </ul>
        <form onSubmit={(e)=>{
          e.preventDefault();
          console.log(Date.now());
          addData({
            
            id:Date.now(),
            title:e.target.title.value
          })
        }}>
          <input type="text" name= "title" placeholder='Add Data here' />
          <button type="submit">Add</button>
        </form>
    </div>
  )
}

export default UseReducer