import React, { useState, useMemo } from 'react';
import { useTodos } from '../context/TodoContext';
import TodoList from '../components/TodoList';

const PAGE_SIZE = 10;

const ToDoPage = () => {

    const { data, isLoading, error, onChange } = useTodos();
    const [ currentPage, setCurrentPage] = useState(1);

    const totalPages = useMemo(() => {
        if(!data || !data.length) return 0;
        return Math.ceil(data.length / PAGE_SIZE);
    }, [data]);

    const currentTodos = useMemo(() => {
      if(!data || !data.length) return [];
      const START_INDEX = (currentPage - 1) * PAGE_SIZE;
      const END_INDEX = START_INDEX + PAGE_SIZE;
      return data.slice(START_INDEX, END_INDEX);
    }, [data, currentPage]);

    const handleTodoChange = (todoId) => {
      onChange(todoId);
    }

    if(isLoading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>{error}</p>
    }
    
    if(!data || !data.length){
        return <p>No todos found</p>
    }

  return (
    <div>
      {currentTodos.map((todo) => (
        < TodoList key={todo.id} todo={todo} onchange={handleTodoChange}/>
      ))}  
      {currentTodos.length > 0 && (
        <div>
          <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span> Page {currentPage} </span>
          <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage * PAGE_SIZE >= data.length}>
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default ToDoPage
