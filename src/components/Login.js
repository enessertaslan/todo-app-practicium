import React from 'react'
import {useState} from 'react'
import TodoList from './Todolist'

function Login() {
const [userName,setUserName]=useState(localStorage.getItem('username'))
const [userNameInput,setUserNameInput]=useState()
  console.log(userName)
    const createUser=()=>{
      setUserName(userNameInput)
      localStorage.setItem('username',userNameInput)
    }
    
  return (
    !userName ? <div className='todo-login'>
        <form onSubmit={createUser}>
           Username <br /> <input type="text" value={userNameInput} onChange={(e)=>setUserNameInput(e.target.value)} />
           {userName}
        </form>
    </div> : <TodoList username={userName} ></TodoList>
  )
}

export default Login