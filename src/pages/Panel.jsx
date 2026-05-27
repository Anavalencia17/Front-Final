import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { auth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import ReservationCard from '../components/ReservationCard';
import ReservationForm from '../components/ReservationForm';
import FilterBar from '../components/FilterBar';
import Spinner from '../components/Spinner';

export default function Panel() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const navigate = useNavigate();
  const user = auth.getUser();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (activeFilter === 'Todos') {
      setFilteredExpenses(expenses);
    } else {
      setFilteredExpenses(expenses.filter(e => e.category === activeFilter));
    }
  }, [activeFilter, expenses]);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await api.getExpenses();
      setExpenses(res.data);
    } catch (err) {
      console.error("Error al cargar base de datos", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (newExpense) => {
    const res = await api.createExpense(newExpense);
    setExpenses([res.data, ...expenses]);
  };

  const handleDelete = async (id) => {
    await api.deleteExpense(id);
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">GastApp Pro</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Usuario: <strong>{user?.username}</strong></span>
          <button onClick={handleLogout} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer">Cerrar Sesión</button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ReservationForm onAdd={handleAdd} />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <FilterBar active={activeFilter} onChange={setActiveFilter} />
          {loading ? <Spinner /> : (
            <div className="space-y-3">
              {filteredExpenses.map(e => (
                <ReservationCard key={e.id} expense={e} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}