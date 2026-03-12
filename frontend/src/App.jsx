import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.css';

function App() {
  const { isAuthenticated, loading, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/library" element={isAuthenticated ? <Library /> : <Navigate to="/login" />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;