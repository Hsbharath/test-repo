import type { Todo } from '../context/TodoContext';

interface TodoListProps {
  todo: Todo;
  onchange: (todoId: number) => void;
}

const TodoList = ({ todo, onchange }: TodoListProps) => {
  return (
    <li>
        <strong>{todo.id}</strong>
        <div>
          <input type="checkbox" checked={todo.completed} onChange={() => onchange(todo.id)} />
          <p>{todo.title}</p></div>
    </li>
   );
}

export default TodoList;
