import React from 'react'
import axios from 'axios'
import {useState,useEffect} from 'react'
import './styles.css'

function Todolist() {
    const [list,setList]=useState([{}]);
    const [content,setContent]=useState('');
    const [isLoading,setIsLoading]=useState(true);
    const [isEditing,setIsEditing]=useState(false)
    const [editContent,setEditContent]=useState('');
    const [editContentId,setEditContentId]=useState();
    const [trigger,setTrigger]=useState(false);
    const userName=localStorage.getItem('username');
    useEffect(()=>{
        getData()
    },[trigger])
    const getData=async (e)=>{
        await axios.get('https://6313a4d6a8d3f673ffce7266.mockapi.io/todos').then((response)=>{
            setList(response.data)
            setIsLoading(false)
            setTrigger(false)
        })
    }
    const AddTodo=async (e)=>{
        e.preventDefault()
        setTrigger(true)
        try{
            await axios.post('https://6313a4d6a8d3f673ffce7266.mockapi.io/todos',{
                content:content,
                isCompleted:false
            }).then(()=>{
                setTrigger(false)
                setContent('')
            });
        }catch(error)
        {
            alert(error)
        }
        
    }
    const editTodo = async (data)=>{
        setTrigger(true)
        const content={
            content:editContent
        }
        await axios.put(`https://6313a4d6a8d3f673ffce7266.mockapi.io/todos/${data}`,content).then(()=>setTrigger(false));
        setIsEditing(false)
    }
    const deleteTodo=async (data)=>{
            
            setTrigger(true)
            
            await axios.delete(`https://6313a4d6a8d3f673ffce7266.mockapi.io/todos/${data}`).then(()=>setTrigger(false));
    }
    const completedTodo = async ({id,isCompletedTodo})=>{
        setTrigger(true)
        let selectedTodoComplete=isCompletedTodo;
        if(selectedTodoComplete===true)
        {
            selectedTodoComplete=false
        }else{
            selectedTodoComplete=true
        }
        const todo={
            isCompleted:selectedTodoComplete
        }
        await axios.put(`https://6313a4d6a8d3f673ffce7266.mockapi.io/todos/${id}`,todo).then(()=>setTrigger(false));
    }
    if(!userName) return ''
  return (
    <>
    <h2>Welcome {userName}</h2>
    <div className='todo-container'>
        {!isEditing ? (      <form onSubmit={content.length>3 ? AddTodo : ''} style={{display:'flex',alignItems:'center'}}>
        <input 
        className="new-todo" 
        placeholder="What needs to be done?"
        disabled={isLoading}
        minLength='3'
         autoFocus 
         value={content} 
         onChange={(e)=>setContent(e.target.value)} />
        </form>):(
            <form onSubmit={()=>editTodo(editContentId)} style={{display:'flex',alignItems:'center'}}>
                   <input 
        className="new-todo" 
        placeholder="What needs to be done?"
        minLength='3'
        disabled={isLoading}
         autoFocus 
         value={editContent} 
         onChange={(e)=>setEditContent(e.target.value)} />
            </form>
        )}
        {
           isLoading ? 'Loading...' : list.map((data)=>(
                <div className={!data.isCompleted ? 'todos fadeInUp': 'todos todos-completed'} id={data.id}  onClick={(e)=>completedTodo({id:e.target.id,isCompletedTodo:data.isCompleted})} key={data.id}>
                    <span id={data.id}>{data.content} </span>
                    <div className='todos-buttons'>
                    <button className='todos-delete' id={data.id} onClick={()=>{setEditContent(data.content);setEditContentId(data.id);setIsEditing(true)}} ><img src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png" width={'40px'}  alt="" /></button>
                    <button className='todos-delete' id={data.id} onClick={(e)=>window.confirm('Are you Sure')? deleteTodo(e.target.id) : ''}>X</button>
                    
                    </div>
               
                </div>
            ))
        }
    </div>
    </>
  )
}

export default Todolist