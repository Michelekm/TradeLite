import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Calendar, Clock, MapPin, User, Plus, Edit, Trash2, CheckCircle, AlertTriangle } from 'lucide-react'

const AgendaPromotor = ({ user }) => {
  const [todaySchedule, setTodaySchedule] = useState([])
  const [weekSchedule, setWeekSchedule] = useState([])
  const [monthSchedule, setMonthSchedule] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    fetchScheduleData()
  }, [user.id])

  const fetchScheduleData = async () => {
    try {
      // Simulando dados de exemplo para demonstração
      setTodaySchedule([
        {
          id: 1,
          store: 'Supermercado Exemplo',
          address: 'Rua das Flores, 123',
          time: '14:00',
          duration: '45 min',
          status: 'Concluída',
          manager: 'Carlos Silva',
          phone: '(11) 99999-9999',
          priority: 'high',
          checklist_items: 12
        },
        {
          id: 2,
          store: 'Mercado Central',
          address: 'Av. Principal, 456',
          time: '16:30',
          duration: '40 min',
          status: 'Pendente',
          manager: 'Fernanda Costa',
          phone: '(21) 88888-8888',
          priority: 'medium',
          checklist_items: 8
        },
        {
          id: 3,
          store: 'Loja Norte',
          address: 'Rua Norte, 789',
          time: '18:00',
          duration: '35 min',
          status: 'Agendada',
          manager: 'Roberto Santos',
          phone: '(31) 77777-7777',
          priority: 'low',
          checklist_items: 6
        }
      ])

      setWeekSchedule([
        {
          date: '2024-06-28',
          visits: [
            {
              id: 4,
              store: 'Shopping Center',
              time: '10:00',
              status: 'Agendada',
              priority: 'high'
            },
            {
              id: 5,
              store: 'Mercado Sul',
              time: '15:00',
              status: 'Agendada',
              priority: 'medium'
            }
          ]
        },
        {
          date: '2024-06-29',
          visits: [
            {
              id: 6,
              store: 'Loja Oeste',
              time: '09:00',
              status: 'Agendada',
              priority: 'low'
            }
          ]
        }
      ])

      setMonthSchedule([
        {
          week: 'Semana 1 (24-30 Jun)',
          total_visits: 8,
          completed: 3,
          pending: 5,
          stores: ['Supermercado Exemplo', 'Mercado Central', 'Loja Norte']
        },
        {
          week: 'Semana 2 (01-07 Jul)',
          total_visits: 6,
          completed: 0,
          pending: 6,
          stores: ['Shopping Center', 'Mercado Sul', 'Loja Oeste']
        }
      ])
    } catch (error) {
      console.error('Erro ao carregar agenda:', error)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Concluída':
        return <Badge className="bg-green-100 text-green-800">Concluída</Badge>
      case 'Pendente':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
      case 'Agendada':
        return <Badge className="bg-blue-100 text-blue-800">Agendada</Badge>
      case 'Cancelada':
        return <Badge className="bg-red-100 text-red-800">Cancelada</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">Alta</Badge>
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Média</Badge>
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Baixa</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Concluída':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'Pendente':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'Agendada':
        return <Clock className="w-5 h-5 text-blue-500" />
      default:
        return <Calendar className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center gap-4">
          <Link to="/promotor">
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Agenda
            </h1>
            <p className="text-blue-100">Gerencie suas visitas e compromissos</p>
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-1" />
            Nova Visita
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="hoje" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hoje" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Hoje
            </TabsTrigger>
            <TabsTrigger value="semana" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Esta Semana
            </TabsTrigger>
            <TabsTrigger value="mes" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Este Mês
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hoje" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Agenda de Hoje - {new Date().toLocaleDateString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.map((visit) => (
                    <Card key={visit.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(visit.status)}
                            <div>
                              <h3 className="font-semibold text-lg">{visit.store}</h3>
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {visit.address}
                              </p>
                            </div>
                          </div>
                          <div className="text-right flex flex-col gap-2">
                            {getStatusBadge(visit.status)}
                            {getPriorityBadge(visit.priority)}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div>
                            <span className="flex items-center gap-1 text-gray-600">
                              <Clock className="w-4 h-4" />
                              Horário: {visit.time}
                            </span>
                            <span className="flex items-center gap-1 text-gray-600">
                              <User className="w-4 h-4" />
                              Gerente: {visit.manager}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Duração: {visit.duration}</span><br />
                            <span className="text-gray-600">Itens: {visit.checklist_items}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            <span>Contato: {visit.phone}</span>
                          </div>
                          <div className="flex gap-2">
                            {visit.status === 'Agendada' && (
                              <Link to={`/checkin?store=${visit.store}`}>
                                <Button size="sm" variant="default">
                                  Iniciar Check-in
                                </Button>
                              </Link>
                            )}
                            {visit.status === 'Pendente' && (
                              <Link to={`/checklist/${visit.id}`}>
                                <Button size="sm" variant="default">
                                  Continuar
                                </Button>
                              </Link>
                            )}
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MapPin className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="semana" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Agenda da Semana
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weekSchedule.map((day) => (
                    <Card key={day.date} className="border-l-4 border-l-green-500">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-3">
                          {new Date(day.date).toLocaleDateString('pt-BR', { 
                            weekday: 'long', 
                            day: 'numeric', 
                            month: 'long' 
                          })}
                        </h3>
                        <div className="space-y-2">
                          {day.visits.map((visit) => (
                            <div key={visit.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="font-medium">{visit.time}</span>
                                <span>{visit.store}</span>
                              </div>
                              <div className="flex gap-2">
                                {getStatusBadge(visit.status)}
                                {getPriorityBadge(visit.priority)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Visão Mensal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthSchedule.map((week, index) => (
                    <Card key={index} className="border-l-4 border-l-purple-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{week.week}</h3>
                            <p className="text-sm text-gray-600">
                              {week.stores.join(', ')}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">{week.total_visits}</div>
                            <div className="text-xs text-gray-600">Total de visitas</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="p-2 bg-green-50 rounded">
                            <div className="text-lg font-semibold text-green-600">{week.completed}</div>
                            <div className="text-xs text-gray-600">Concluídas</div>
                          </div>
                          <div className="p-2 bg-yellow-50 rounded">
                            <div className="text-lg font-semibold text-yellow-600">{week.pending}</div>
                            <div className="text-xs text-gray-600">Pendentes</div>
                          </div>
                          <div className="p-2 bg-blue-50 rounded">
                            <div className="text-lg font-semibold text-blue-600">
                              {Math.round((week.completed / week.total_visits) * 100)}%
                            </div>
                            <div className="text-xs text-gray-600">Progresso</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AgendaPromotor

