import './App.css';
import UsersPage from './pages/UsersPage';
import CommentsPage from './pages/CommentsPage';
import ToDoPage from './pages/ToDoPage';
import NestedCheckboxes from './components/NestedCheckboxes';
import IndeterminateState from './components/IndeterminateState';
import { UserProvider } from './context/UserContext';
import { TodoProvider } from './context/TodoContext';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NestedFetchofJobs from './pages/NestedFetchofJobs';

function App() {
  return (
    <UserProvider>
      <TodoProvider>
      <Router>
      <div className="App">
        <Navbar/>
        <Routes>
           <Route path="/" element={<UsersPage />} />
           <Route path="/comments" element={<CommentsPage />} />  
           <Route path="/todos" element={<ToDoPage />} />  
           <Route path="/nested-checkboxes" element={<NestedCheckboxes />} />
           <Route path="/job-board" element={<NestedFetchofJobs />} />
           <Route path="/indeterminate-state" element={<IndeterminateState />} />
           <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </div>
      </Router>
      </TodoProvider>
    </UserProvider>
  );
}

export default App;
