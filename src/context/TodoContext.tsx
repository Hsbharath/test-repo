import { createContext, useContext, useMemo, type ReactNode } from 'react';
import useFetch from '../hooks/useFetch';

const URL = "https://jsonplaceholder.typicode.com/todos";

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

interface TodoContextValue {
  data: Todo[];
  isLoading: boolean;
  error: string | null;
  completedTodos: Todo[];
  onChange: (todoId: number) => void;
}

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {

    const { data, isLoading, error, setData } = useFetch<Todo[]>({ URL, initialData: [] });

    const completedTodos = useMemo(() => {
        return data.filter(todo => todo.completed)
    }, [data]);

    const onChange = (todoId: number) => {
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

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};
