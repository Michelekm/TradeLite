import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import PromotorDashboard from './components/PromotorDashboard'
import GestorDashboard from './components/GestorDashboard'
import AdminDashboard from './components/AdminDashboard'
import CheckIn from './components/CheckIn'
import Checklist from './components/Checklist'
import VisitDetails from './components/VisitDetails'
import HistoricoPromotor from './components/HistoricoPromotor'
import HistoricoGestor from './components/HistoricoGestor'
import NotificacoesPromotor from './components/NotificacoesPromotor'
import AgendaPromotor from './components/AgendaPromotor'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={
            user.role === 'promotor' ? <Navigate to="/promotor" /> :
            user.role === 'gestor' ? <Navigate to="/gestor" /> :
            user.role === 'admin' ? <Navigate to="/admin" /> :
            <Navigate to="/login" />
          } />
          
          {user.role === 'promotor' && (
            <>
              <Route path="/promotor" element={<PromotorDashboard user={user} onLogout={handleLogout} />} />
              <Route path="/promotor/historico" element={<HistoricoPromotor user={user} />} />
              <Route path="/promotor/notificacoes" element={<NotificacoesPromotor user={user} />} />
              <Route path="/promotor/agenda" element={<AgendaPromotor user={user} />} />
              <Route path="/checkin" element={<CheckIn user={user} />} />
              <Route path="/checklist/:pdvId" element={<Checklist user={user} />} />
            </>
          )}
          
          {user.role === 'gestor' && (
            <>
              <Route path="/gestor" element={<GestorDashboard user={user} onLogout={handleLogout} />} />
              <Route path="/gestor/historico" element={<HistoricoGestor user={user} />} />
              <Route path="/visita/:visitId" element={<VisitDetails user={user} />} />
            </>
          )}
          
          {user.role === 'admin' && (
            <>
              <Route path="/admin" element={<AdminDashboard user={user} onLogout={handleLogout} />} />
            </>
          )}
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App



