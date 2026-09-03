import './App.css';
import { UserProvider } from './context/UserContext';
import { TodoProvider } from './context/TodoContext';
import Sidebar from './components/Sidebar';
import PageLayout from './components/PageLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { pages } from './pages.config';

function App() {
  return (
    <UserProvider>
      <TodoProvider>
        <Router basename={import.meta.env.BASE_URL}>
          <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
            <Sidebar />
            <main className="h-full min-w-0 flex-1 overflow-hidden">
              <Routes>
                {pages.map(({ path, title, question, Component }) => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <PageLayout title={title} question={question}>
                        <Component />
                      </PageLayout>
                    }
                  />
                ))}
                <Route path="*" element={<p className="p-6">Page Not Found</p>} />
              </Routes>
            </main>
          </div>
        </Router>
      </TodoProvider>
    </UserProvider>
  );
}

export default App;
