import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { Eye, Download, LogOut, AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown, Bot, Star, Award, Target, Bell, Users, User, Calendar, MapPin, Package, DollarSign, MessageSquare } from 'lucide-react'
import MentorPDV from './MentorPDV'

const GestorDashboard = ({ user, onLogout }) => {
  const [visits, setVisits] = useState([])
  const [promoterPerformance, setPromoterPerformance] = useState([])
  const [pendingStores, setPendingStores] = useState([])
  const [notifications, setNotifications] = useState([])
  const [showMentor, setShowMentor] = useState(false)
  const [selectedVisit, setSelectedVisit] = useState(null)

  // Dados de exemplo para o dashboard do gestor
  const gestorData = {
    totalVisits: 120,
    completedVisits: 100,
    pendingVisits: 20,
    alerts: 5,
    kpis: [
      { name: 'Conformidade de Checklist', value: 92, unit: '%', target: 90, status: 'success' },
      { name: 'Ruptura Detectada', value: 8, unit: '%', target: 5, status: 'danger' },
      { name: 'Material de Merchandising', value: 85, unit: '%', target: 90, status: 'warning' },
      { name: 'Produtividade Promotores', value: 1.5, unit: 'visitas/dia', target: 1.2, status: 'success' }
    ],
    recentVisits: [
      { id: 1, store: 'Supermercado Exemplo', date: '2025-06-26', promoter: 'João Silva', status: 'Concluída', score: 95, alerts: 0, photos: 5, products: 10, checkin: '09:00', checkout: '09:45' },
      { id: 2, store: 'Mercado Central', date: '2025-06-26', promoter: 'Maria Oliveira', status: 'Concluída', score: 88, alerts: 1, photos: 3, products: 8, checkin: '10:15', checkout: '11:00' },
      { id: 3, store: 'Atacadão Preço Bom', date: '2025-06-26', promoter: 'Pedro Souza', status: 'Pendente', score: 0, alerts: 0, photos: 0, products: 0, checkin: '14:00', checkout: '' },
      { id: 4, store: 'Loja da Esquina', date: '2025-06-25', promoter: 'João Silva', status: 'Concluída', score: 70, alerts: 2, photos: 4, products: 12, checkin: '08:30', checkout: '09:15' },
      { id: 5, store: 'Hortifruti Saudável', date: '2025-06-25', promoter: 'Maria Oliveira', status: 'Concluída', score: 98, alerts: 0, photos: 6, products: 7, checkin: '13:00', checkout: '13:40' }
    ],
    promoterPerformance: [
      { name: 'João Silva', visits: 50, score: 92, alerts: 2, photos: 200 },
      { name: 'Maria Oliveira', visits: 45, score: 88, alerts: 5, photos: 180 },
      { name: 'Pedro Souza', visits: 25, score: 75, alerts: 8, photos: 100 }
    ],
    pendingStores: [
      { id: 1, name: 'Supermercado Exemplo', address: 'Rua das Flores, 123', time: '14:00', promoter: 'João Silva' },
      { id: 2, name: 'Mercado Central', address: 'Av. Principal, 456', time: '16:30', promoter: 'Maria Oliveira' }
    ],
    notifications: [
      { id: 1, type: 'alert', message: 'Ruptura detectada no produto X no Supermercado Exemplo.', date: '2025-06-26 10:30', read: false },
      { id: 2, type: 'message', message: 'Nova funcionalidade de relatório disponível.', date: '2025-06-25 09:00', read: true },
      { id: 3, type: 'update', message: 'Sistema atualizado para a versão 2.0.', date: '2025-06-24 18:00', read: true }
    ]
  }

  useEffect(() => {
    // Simula o carregamento de dados do backend
    setVisits(gestorData.recentVisits)
    setPromoterPerformance(gestorData.promoterPerformance)
    setPendingStores(gestorData.pendingStores)
    setNotifications(gestorData.notifications)
  }, [])

  const chartData = [
    { name: 'Seg', visitas: 4, score: 85 },
    { name: 'Ter', visitas: 6, score: 78 },
    { name: 'Qua', visitas: 8, score: 82 },
    { name: 'Qui', visitas: 7, score: 88 },
    { name: 'Sex', visitas: 9, score: 91 },
    { name: 'Sáb', visitas: 5, score: 76 },
    { name: 'Dom', visitas: 3, score: 80 }
  ]

  const storeRanking = [
    { store: 'Loja A', score: 92, trend: 'up', promotor: 'João' },
    { store: 'Supermercado Central', score: 88, trend: 'up', promotor: 'Maria' },
    { store: 'Mercado Norte', score: 85, trend: 'stable', promotor: 'Pedro' },
    { store: 'Loja B', score: 75, trend: 'down', promotor: 'Maria' },
    { store: 'Loja C', score: 68, trend: 'down', promotor: 'João' }
  ]

  const kpiData = [
    { name: 'Excelente (90-100)', value: 2, color: '#10B981' },
    { name: 'Bom (75-89)', value: 3, color: '#3B82F6' },
    { name: 'Regular (60-74)', value: 2, color: '#F59E0B' },
    { name: 'Crítico (<60)', value: 1, color: '#EF4444' }
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Concluída':
        return <Badge variant="success">{status}</Badge>
      case 'Pendente':
        return <Badge variant="warning">{status}</Badge>
      case 'Alerta':
        return <Badge variant="danger">{status}</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <div className="w-4 h-4" />
    }
  }

  const handleMentorAnalysis = (visit) => {
    setSelectedVisit(visit)
    setShowMentor(true)
  }

  const handleAssignResponsibility = async (promoterId, store, productSku) => {
    try {
      const response = await fetch('/api/manager/assign_responsibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promoter_id: promoterId, store, product_sku: productSku, manager_id: user.id })
      })
      const data = await response.json()
      if (data.success) {
        alert('Responsabilidade atribuída com sucesso!')
        // fetchGestorData()
      } else {
        alert(`Erro ao atribuir responsabilidade: ${data.error}`)
      }
    } catch (error) {
      console.error('Erro ao atribuir responsabilidade:', error)
    }
  }

  const handleScheduleReevaluation = async (store, promoterId) => {
    try {
      const response = await fetch('/api/manager/schedule_reevaluation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ store, promoter_id: promoterId, manager_id: user.id })
      })
      const data = await response.json()
      if (data.success) {
        alert('Reavaliação agendada com sucesso!')
        // fetchGestorData()
      } else {
        alert(`Erro ao agendar reavaliação: ${data.error}`)
      }
    } catch (error) {
      console.error('Erro ao agendar reavaliação:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">DASHBOARD EXECUTIVO</h1>
            <p className="text-blue-100">Bem-vindo, {user.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="relative">
              <Bell className="w-6 h-6" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </Button>
            <Button variant="ghost" onClick={onLogout}>
              <LogOut className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* KPIs Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {gestorData.kpis.map((kpi, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {kpi.name}
                </CardTitle>
                {kpi.status === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                {kpi.status === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                {kpi.status === 'danger' && <AlertTriangle className="h-4 w-4 text-red-500" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}{kpi.unit}</div>
                <p className="text-xs text-muted-foreground">
                  Meta: {kpi.target}{kpi.unit}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="visao-geral" className="space-y-4">
          <TabsList>
            <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="alertas">Alertas</TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
            <Link to="/gestor/historico">
              <TabsTrigger value="historico">Histórico Completo</TabsTrigger>
            </Link>
          </TabsList>

          <TabsContent value="visao-geral" className="space-y-4">
            {/* Visits Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Visitas Recentes</CardTitle>
                <CardDescription>
                  Visitas realizadas nos últimos dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visitas" stroke="#8884d8" name="Visitas" />
                    <Line type="monotone" dataKey="score" stroke="#82ca9d" name="Score Médio" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Visits Table */}
            <Card>
              <CardHeader>
                <CardTitle>Detalhes das Visitas Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loja</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promotor</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alertas</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fotos</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {visits.map((visit) => (
                        <tr key={visit.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{visit.store}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visit.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visit.promoter}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(visit.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visit.score}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visit.alerts}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visit.photos}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="outline" size="sm" className="mr-2" onClick={() => handleMentorAnalysis(visit)}>
                              <Bot className="w-4 h-4 mr-1" /> Análise Mentor
                            </Button>
                            <Link to={`/visit-details/${visit.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" /> Ver Detalhes
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Pending Stores */}
            <Card>
              <CardHeader>
                <CardTitle>Lojas Pendentes de Visita</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loja</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endereço</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horário Previsto</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promotor</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pendingStores.map((store) => (
                        <tr key={store.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{store.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.address}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.promoter}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="outline" size="sm" onClick={() => handleScheduleReevaluation(store.name, user.id)}>
                              <Clock className="w-4 h-4 mr-1" /> Agendar Reavaliação
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            {/* Promoter Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Performance dos Promotores</CardTitle>
                <CardDescription>
                  Métricas de desempenho individuais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={promoterPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="visits" fill="#8884d8" name="Visitas" />
                    <Bar dataKey="score" fill="#82ca9d" name="Score Médio" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {promoterPerformance.map((promoter, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium">{promoter.name}</span>
                      <Badge variant="secondary">Score: {promoter.score}</Badge>
                      <Badge variant="secondary">Visitas: {promoter.visits}</Badge>
                      <Badge variant="secondary">Alertas: {promoter.alerts}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Store Ranking */}
            <Card>
              <CardHeader>
                <CardTitle>Ranking de Lojas por Performance</CardTitle>
                <CardDescription>
                  Lojas com melhor e pior desempenho
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loja</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promotor</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tendência</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {storeRanking.map((store, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{store.store}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.score}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.promotor}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {getTrendIcon(store.trend)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alertas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Alertas Ativos</CardTitle>
                <CardDescription>
                  Alertas importantes que exigem atenção
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {gestorData.notifications.filter(n => n.type === 'alert').length > 0 ? (
                    gestorData.notifications.filter(n => n.type === 'alert').map((alert) => (
                      <div key={alert.id} className="flex items-center p-3 rounded-md bg-red-50 text-red-800">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        <span>{alert.message} - {alert.date}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Nenhum alerta ativo no momento.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notificacoes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>
                  Todas as suas notificações e mensagens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <Card key={notification.id} className={notification.read ? 'bg-gray-100' : 'bg-white'}>
                        <CardContent className="p-3 flex items-center justify-between">
                          <span>{notification.message}</span>
                          {notification.read ? (
                            <span className="text-xs text-gray-500">Lida</span>
                          ) : (
                            <span className="text-xs text-blue-600">Não Lida</span>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-gray-500">Nenhuma notificação.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relatorios" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios e Exportação</CardTitle>
                <CardDescription>
                  Gere relatórios detalhados das visitas e performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Relatório de Visitas (PDF)
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Relatório de Performance (Excel)
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Alertas (CSV)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {showMentor && selectedVisit && (
          <MentorPDV visit={selectedVisit} onClose={() => setShowMentor(false)} />
        )}
      </div>
    </div>
  )
}

export default GestorDashboard


