import  { createContext, useContext, useState, useMemo } from 'react';
import useFetch from '../hooks/useFetch';

const URL = "https://jsonplaceholder.typicode.com/todos";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {

    const { data, isLoading, error, setData } = useFetch({ URL });

    const completedTodos = useMemo(() => {
        return data.filter(todo => todo.completed)
    }, [data]);

    const onChange = (todoId) => {
      setData(prevData => prevData.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ));
    }

    const contextValue = useMemo(() =>({
        data, isLoading, error, completedTodos, onChange
    }), [data, isLoading, error, completedTodos]);

    return(
        <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
    )
}

export const useTodos = () => useContext(TodoContext);