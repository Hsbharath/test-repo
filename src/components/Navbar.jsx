import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTodos } from '../context/TodoContext';

const Navbar = () => {

  const { data, completedTodos } = useTodos();

  return (
    <>
    <nav>
      <NavLink to="/" style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}>
        Users
      </NavLink>
        <NavLink to="/comments" style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}>
            Comments
        </NavLink>
        <NavLink to="/todos" style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}>Todos</NavLink>
        <NavLink to="/nested-checkboxes" style={({isActive}) => ({ color: isActive ? 'red' : 'blue'})}>Nested Checkboxes</NavLink>
        <NavLink to="/job-board" style={({isActive}) => ({ color: isActive ? 'red' : 'blue'})}>Job Board</NavLink>
        <NavLink to="/indeterminate-state" style={({isActive}) => ({ color: isActive ? 'red' : 'blue'})}>Indeterminate State</NavLink>
    </nav>
    <span>Todos : {data ? data.length - completedTodos.length : 0}</span>
     <span>Completed Todos : {completedTodos.length}</span>
    </>
  )
}

export default Navbar
