import { NavLink } from 'react-router-dom';
import { useTodos } from '../context/TodoContext';
import { pages } from '../pages.config';

const Sidebar = () => {
  const { data, completedTodos } = useTodos();
  const remaining = data ? data.length - completedTodos.length : 0;

  return (
    <aside className="flex h-screen w-[200px] shrink-0 flex-col bg-[#0f1116] text-[#a0a5b1]">
      <div className="shrink-0 border-b border-white/10 px-4 py-4">
        <span className="text-sm font-bold tracking-wide text-white">Practice</span>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto py-2">
        {pages.map((page) => (
          <NavLink
            key={page.path}
            to={page.path}
            end={page.path === '/'}
            className={({ isActive }) =>
              [
                'block truncate px-4 py-2.5 text-sm border-l-2 transition-colors',
                isActive
                  ? 'border-[#2ec866] bg-white/5 text-white font-medium'
                  : 'border-transparent hover:bg-white/5 hover:text-white',
              ].join(' ')
            }
          >
            {page.navLabel}
          </NavLink>
        ))}
      </nav>

      <div className="shrink-0 border-t border-white/10 px-4 py-3 text-xs leading-relaxed">
        <div className="flex justify-between">
          <span>Todos</span>
          <span className="text-white">{remaining}</span>
        </div>
        <div className="flex justify-between">
          <span>Completed</span>
          <span className="text-[#2ec866]">{completedTodos.length}</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
