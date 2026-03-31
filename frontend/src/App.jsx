import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';
import Home from './pages/Home';
import Login from './pages/Login';
import Library from './pages/Library/Library';
import Logros from './pages/Logros/Logros';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Register';

export function App() {
  const { isAuthenticated, loading, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}  />
        <Route path="/library" element={isAuthenticated ? <Library /> : <Navigate to="/login" />} />
        <Route path="/logros" element={isAuthenticated ? <Logros /> : <Navigate to="/login" />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;