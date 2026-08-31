const TodoList = ({ todo, onchange }) => {
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