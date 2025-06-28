import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Bell, AlertTriangle, Info, CheckCircle, Clock, MessageSquare, Calendar, Star } from 'lucide-react'

const NotificacoesPromotor = ({ user }) => {
  const [notifications, setNotifications] = useState([])
  const [alerts, setAlerts] = useState([])
  const [messages, setMessages] = useState([])
  const [updates, setUpdates] = useState([])

  useEffect(() => {
    fetchNotifications()
  }, [user.id])

  const fetchNotifications = async () => {
    try {
      // Simulando dados de exemplo para demonstração
      setNotifications([
        {
          id: 1,
          type: 'alert',
          title: 'Ruptura Detectada',
          message: 'Produto Coca-Cola 2L em falta no Supermercado Exemplo',
          time: '16:45',
          date: '2024-06-27',
          read: false,
          priority: 'high',
          action_required: true
        },
        {
          id: 2,
          type: 'info',
          title: 'Visita Agendada',
          message: 'Nova visita agendada para Mercado Central às 18:00',
          time: '14:30',
          date: '2024-06-27',
          read: false,
          priority: 'medium',
          action_required: false
        },
        {
          id: 3,
          type: 'success',
          title: 'Checklist Aprovado',
          message: 'Seu checklist do Supermercado Exemplo foi aprovado pelo gestor',
          time: '12:15',
          date: '2024-06-27',
          read: true,
          priority: 'low',
          action_required: false
        }
      ])

      setAlerts([
        {
          id: 1,
          title: 'Produto em Ruptura',
          message: 'Pepsi 350ml - Mercado Central',
          time: '16:45',
          severity: 'high',
          resolved: false
        },
        {
          id: 2,
          title: 'Check-in Pendente',
          message: 'Loja Norte - Visita agendada para 17:00',
          time: '16:30',
          severity: 'medium',
          resolved: false
        }
      ])

      setMessages([
        {
          id: 1,
          from: 'Gestor Maria',
          subject: 'Feedback sobre visita',
          message: 'Excelente trabalho no Supermercado Exemplo! Continue assim.',
          time: '15:20',
          read: false
        },
        {
          id: 2,
          from: 'Sistema TradeLite',
          subject: 'Nova funcionalidade disponível',
          message: 'Agora você pode anexar fotos diretamente no checklist.',
          time: '10:30',
          read: true
        }
      ])

      setUpdates([
        {
          id: 1,
          title: 'Atualização do Sistema',
          message: 'Nova versão 2.1.0 disponível com melhorias de performance',
          time: '09:00',
          version: '2.1.0',
          required: false
        },
        {
          id: 2,
          title: 'Manutenção Programada',
          message: 'Sistema ficará indisponível das 02:00 às 04:00 para manutenção',
          time: '08:00',
          scheduled: '2024-06-28 02:00',
          required: true
        }
      ])
    } catch (error) {
      console.error('Erro ao carregar notificações:', error)
    }
  }

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'message':
        return <MessageSquare className="w-5 h-5 text-purple-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
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

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">Crítico</Badge>
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Moderado</Badge>
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Baixo</Badge>
      default:
        return <Badge variant="secondary">{severity}</Badge>
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

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
              <Bell className="w-6 h-6" />
              Notificações
            </h1>
            <p className="text-blue-100">
              {unreadCount > 0 ? `${unreadCount} não lidas` : 'Todas as notificações lidas'}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-blue-700"
              onClick={markAllAsRead}
            >
              Marcar todas como lidas
            </Button>
          )}
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="todas" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="todas" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Todas
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white text-xs px-1 py-0 min-w-[16px] h-4">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="alertas" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Alertas
            </TabsTrigger>
            <TabsTrigger value="mensagens" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Mensagens
            </TabsTrigger>
            <TabsTrigger value="atualizacoes" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Atualizações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="todas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Todas as Notificações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <Card 
                      key={notification.id} 
                      className={`border-l-4 ${
                        notification.type === 'alert' ? 'border-l-red-500' :
                        notification.type === 'info' ? 'border-l-blue-500' :
                        notification.type === 'success' ? 'border-l-green-500' :
                        'border-l-gray-500'
                      } ${!notification.read ? 'bg-blue-50' : ''}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                            {getNotificationIcon(notification.type)}
                            <div>
                              <h3 className={`font-semibold ${!notification.read ? 'text-blue-900' : ''}`}>
                                {notification.title}
                              </h3>
                              <p className="text-sm text-gray-600">{notification.message}</p>
                            </div>
                          </div>
                          <div className="text-right flex flex-col gap-2">
                            {getPriorityBadge(notification.priority)}
                            {!notification.read && (
                              <Badge className="bg-blue-100 text-blue-800">Nova</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {notification.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(notification.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {notification.action_required && (
                              <Button size="sm" variant="outline">
                                Ação Necessária
                              </Button>
                            )}
                            {!notification.read && (
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => markAsRead(notification.id)}
                              >
                                Marcar como lida
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alertas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Alertas Críticos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <Card key={alert.id} className="border-l-4 border-l-red-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            <div>
                              <h3 className="font-semibold">{alert.title}</h3>
                              <p className="text-sm text-gray-600">{alert.message}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            {getSeverityBadge(alert.severity)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {alert.time}
                          </span>
                          <div className="flex gap-2">
                            {!alert.resolved && (
                              <Button size="sm" variant="outline">
                                Resolver
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mensagens" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Mensagens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {messages.map((message) => (
                    <Card key={message.id} className={`border-l-4 border-l-purple-500 ${!message.read ? 'bg-purple-50' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                            <MessageSquare className="w-5 h-5 text-purple-500" />
                            <div>
                              <h3 className={`font-semibold ${!message.read ? 'text-purple-900' : ''}`}>
                                {message.subject}
                              </h3>
                              <p className="text-sm text-gray-600">De: {message.from}</p>
                              <p className="text-sm text-gray-700 mt-1">{message.message}</p>
                            </div>
                          </div>
                          {!message.read && (
                            <Badge className="bg-purple-100 text-purple-800">Nova</Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {message.time}
                          </span>
                          <Button size="sm" variant="outline">
                            Responder
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="atualizacoes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Atualizações do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {updates.map((update) => (
                    <Card key={update.id} className="border-l-4 border-l-yellow-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                            <Star className="w-5 h-5 text-yellow-500" />
                            <div>
                              <h3 className="font-semibold">{update.title}</h3>
                              <p className="text-sm text-gray-600">{update.message}</p>
                              {update.version && (
                                <p className="text-xs text-blue-600 mt-1">Versão: {update.version}</p>
                              )}
                              {update.scheduled && (
                                <p className="text-xs text-red-600 mt-1">
                                  Agendado para: {new Date(update.scheduled).toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                          {update.required && (
                            <Badge className="bg-red-100 text-red-800">Obrigatório</Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {update.time}
                          </span>
                          {update.version && (
                            <Button size="sm" variant="outline">
                              Atualizar Agora
                            </Button>
                          )}
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

export default NotificacoesPromotor

