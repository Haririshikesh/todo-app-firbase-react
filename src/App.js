import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from "./Todo";
import { db } from './firebase';

const style={
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container:`bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading:`text-3xl font-bold text-center text-gray-800 p-2`,
  form: 'flex justify-between',
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`
}
function App() {

  const [todos,setTodos] = useState([]);
  const [input,setInput] =useState('');


  //Create todo From Firebase
  const createTodo =async(e)=>{
    e.preventDefault(e)
    if(input===''){
      alert('Please enter a valid Task')
      return //Continuously GEnerates  Untill return is found or may even enters empty text
    }
    await addDoc(collection(db,'todos'),{
    text: input,
    completed: false,
  })
  setInput('')
  }



  //Read todo From Firebase
  useEffect (()=>{
    const q=query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q,(QuerySnapshot)=>{
      let todosArr=[]
      QuerySnapshot.forEach((doc)=>{
        todosArr.push({...doc.data(),id: doc.id})
      });
      setTodos(todosArr)
    })
    return ()=> unsubscribe()
  },[])



    //Updatetodo in firebase
    const toggleComplete = async(todo) =>{
      await updateDoc(doc(db, 'todos', todo.id), {
        completed: !todo.completed
      })
    }
  
    //Delete Todo From Firebase
    const deleteTodo =async(id) => {
      await deleteDoc(doc(db,'todos',id))
    }
  
  
  return (
    <div className={style.bg}>
      <div className={style.container}>
      <h3 className={style.heading}>To Do List</h3>
      <form onSubmit={createTodo} className={style.form}>
        <input value={input} onChange={(e)=> setInput(e.target.value)} className={style.input} type="text" placeholder="Add Task" />
        <button className={style.button}>
          <AiOutlinePlus size={30} />
          </button>
      </form>
      <ul>
        {todos.map((todo, index)=>(
          <Todo key={index}
           todo={todo}
           toggleComplete={toggleComplete}
           deleteTodo={deleteTodo}
           />
        ))}
      </ul>
      {todos.length<1 ? null : <p className={style.count}>{`You have ${todos.length} todos`}</p>}
      </div>
    </div>
  );
}

export default App;
