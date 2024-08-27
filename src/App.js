
import { useState, useReducer } from "react";
import './App.css';
import TodoForm from "./Todosdetail/TodoForm";
import TodoList from "./Todosdetail/TodoList";
import TodoFooter from "./Todosdetail/TodoFooter";


function reducer(state, action) {
  if(action.type === "add") {
    return [
      ...state,
      {
        id: Math.random(),
        text: action.payload,
        isCompleted: false
      }
    ];
  } else if(action.type === "delete") {
    return state.filter((t) => t.id !== action.payload.id);
  } else if(action.type === "clear-completed") {
    return state.filter((todo) => !todo.isCompleted);
  } else if(action.type === "newtodo") {
    return state.map((todo) => {
      if(todo.id === action.payload.id) {
        return action.payload;
      }
      return todo;
    });
  }
}

function App() {

  const [todos, dispatch] = useReducer(reducer, [
    {
      id: Math.random(),
      text: "Learn JS",
      isCompleted: false
    },
    {
      id: Math.random(),
      text: "Learn CSS",
      isCompleted: false
    },
    {
      id: Math.random(),
      text: "Learn React",
      isCompleted: false
    }
  ]);


  return (
    <div className="App">
      <header>
        <h1 className="todoAppTitle">todos</h1>
      </header>

      <TodoForm onAdd={(text) => {
        dispatch({
          type: 'add',
          payload: text
        });
      }} />
      <TodoList
        todos={todos}
        onDelete={(todo) => {
          dispatch({
            type: "delete",
            payload: todo
          });
        }}
        onChange={(newTodo) => {
          dispatch({
            type: "newtodo",
            payload: newTodo
          });
        }}
      />
      <TodoFooter todos={todos}
        onClearCompleted={() => {
          dispatch({
            type: "clear-completed"
          });
        }} />
    </div>
  );
}

export default App;