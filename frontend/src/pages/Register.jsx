import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/auth/register', {
        email: formData.email,
        username: formData.username,
        password: formData.password
      });

      // Guardar token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

W
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <img src="/antivago2.png" alt="Logo" className='mx-auto mb-5' />
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Crea tu Cuenta</h2>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-bold text-purple-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="w-full p-2 border rounded"                
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-purple-300 mb-2">
                Usuario
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="tuusuario"
                className="w-full p-2 border rounded"                  required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-purple-300 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full p-2 border rounded"                  required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-purple-300 mb-2">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full p-2 border rounded"                  required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700"
            >
              {loading ? '⏳ Registrando...' : '✨ Crear Cuenta'}
            </button>
          </form>

          {/* Link a Login */}
          <p className="text-center text-purple-300 text-sm mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="font-bold text-pink-400 hover:text-pink-300">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
  );
}