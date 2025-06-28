import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock, CheckCircle, AlertTriangle, LogOut, Camera, Bell, MessageSquare, Calendar, History, Package, DollarSign, Image, XCircle } from 'lucide-react'

const PromotorDashboard = ({ user, onLogout }) => {
  const [activities, setActivities] = useState([])
  const [notifications, setNotifications] = useState([])
  const [mentorFeedback, setMentorFeedback] = useState(null)
  const [visitedStores, setVisitedStores] = useState([])
  const [upcomingVisits, setUpcomingVisits] = useState([])
  const [ruptureHistory, setRuptureHistory] = useState([])
  const [productPrices, setProductPrices] = useState([])

  useEffect(() => {
    fetchPromoterData()
  }, [user.id])

  const fetchPromoterData = async () => {
    try {
      const [activitiesRes, notificationsRes, mentorRes, visitedRes, upcomingRes, ruptureRes, pricesRes] = await Promise.all([
        fetch(`/api/promoter/activities/${user.id}`).then(res => res.json()),
        fetch(`/api/promoter/notifications/${user.id}`).then(res => res.json()),
        fetch(`/api/promoter/mentor_feedback/${user.id}`).then(res => res.json()),
        fetch(`/api/promoter/visited_stores/${user.id}`).then(res => res.json()),
        fetch(`/api/promoter/upcoming_visits/${user.id}`).then(res => res.json()),
        fetch(`/api/promoter/rupture_history/${user.id}`).then(res => res.json()),
        fetch(`/api/promoter/product_prices/${user.id}`).then(res => res.json())
      ])

      if (activitiesRes.success) setActivities(activitiesRes.activities)
      if (notificationsRes.success) setNotifications(notificationsRes.notifications)
      if (mentorRes.success) setMentorFeedback(mentorRes.feedback)
      if (visitedRes.success) setVisitedStores(visitedRes.visited_stores)
      if (upcomingRes.success) setUpcomingVisits(upcomingRes.upcoming_visits)
      if (ruptureRes.success) setRuptureHistory(ruptureRes.rupture_history)
      if (pricesRes.success) setProductPrices(pricesRes.product_prices)

    } catch (error) {
      console.error('Erro ao carregar dados do promotor:', error)
      // Dados de exemplo para demonstração (igual à versão aprovada)
      setActivities([
        {
          id: 1,
          pdv: 'Supermercado Exemplo',
          address: 'Rua das Flores, 123',
          time: '14:00',
          status: 'pending',
          checklist: true
        },
        {
          id: 2,
          pdv: 'Mercado Central',
          address: 'Av. Principal, 456',
          time: '16:30',
          status: 'completed',
          checklist: true
        }
      ])
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Concluída</Badge>
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800">Pendente</Badge>
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Atrasada</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getNotificationBadge = (type) => {
    switch (type) {
      case 'alert':
        return <Badge className="bg-red-100 text-red-800">Alerta</Badge>
      case 'feedback':
        return <Badge className="bg-purple-100 text-purple-800">Feedback</Badge>
      case 'message':
        return <Badge className="bg-blue-100 text-blue-800">Mensagem</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">TradeLite</h1>
            <p className="text-blue-100">Olá, {user.name}!</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/promotor/notificacoes">
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0 min-w-[16px] h-4">
                  3
                </Badge>
              </Button>
            </Link>
            <Link to="/promotor/agenda">
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                <Calendar className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700" onClick={onLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Check-in Button */}
        <div className="mb-6">
          <Link to="/checkin">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg">
              <MapPin className="w-6 h-6 mr-2" />
              FAZER CHECK-IN
            </Button>
          </Link>
        </div>

        {/* Atividades de Hoje */}
        <h2 className="text-lg font-semibold mb-4">Atividades de Hoje</h2>

        {/* Mentor PDV Feedback */}
        {mentorFeedback && (
          <Card className="mb-4 border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-500" />
                Feedback do Mentor PDV
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-2">{mentorFeedback.message}</p>
              {mentorFeedback.recommendations && (
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {mentorFeedback.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              )}
              <div className="flex justify-end mt-3">
                <Button size="sm" variant="outline">
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notifications */}
        {notifications.length > 0 && (
          <Card className="mb-4 border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-500" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {notifications.slice(0, 3).map((notif) => (
                  <div key={notif.id} className="flex items-center justify-between p-2 bg-orange-50 rounded">
                    <span className="text-sm">{notif.message}</span>
                    {getNotificationBadge(notif.type)}
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-3">
                <Button size="sm" variant="outline">
                  Ver Todas
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Activities Section */}
        <h2 className="text-lg font-semibold mb-4">Atividades de Hoje</h2>
        <div className="space-y-3 mb-4">
          {activities.length === 0 ? (
            <p className="text-gray-500 text-center">Nenhuma atividade agendada para hoje.</p>
          ) : (
            activities.map((activity) => (
              <Card key={activity.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{activity.pdv}</h3>
                      <p className="text-sm text-gray-600">{activity.address}</p>
                    </div>
                    {getStatusBadge(activity.status)}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {activity.time}
                      {activity.checklist && (
                        <span className="ml-2 text-blue-600">Checklist</span>
                      )}
                    </div>

                    {activity.status === 'pending' && (
                      <Link to={`/checklist/${activity.id}`}>
                        <Button size="sm" variant="outline">
                          Iniciar
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Upcoming Visits */}
        <h2 className="text-lg font-semibold mb-4">Próximas Visitas</h2>
        <div className="space-y-3 mb-4">
          {upcomingVisits.length === 0 ? (
            <p className="text-gray-500 text-center">Nenhuma visita futura agendada.</p>
          ) : (
            upcomingVisits.map((visit) => (
              <Card key={visit.id} className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{visit.pdv}</h3>
                      <p className="text-sm text-gray-600">{visit.address}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Agendada</Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(visit.date).toLocaleDateString()} às {visit.time}
                  </div>
                  {visit.deadline_alert && (
                    <div className="flex items-center text-sm text-red-600 mt-1">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Prazo limite: {new Date(visit.deadline_alert).toLocaleDateString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>        {/* Histórico de Lojas Visitadas */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Histórico de Lojas Visitadas</h2>
          <Link to="/promotor/historico">
            <Button variant="outline" size="sm">
              Ver Histórico Completo
            </Button>
          </Link>
        </div>     <div className="space-y-3 mb-4">
          {visitedStores.length === 0 ? (
            <p className="text-gray-500 text-center">Nenhuma loja visitada ainda.</p>
          ) : (
            visitedStores.map((store) => (
              <Card key={store.id} className="border-l-4 border-l-gray-300">
                <CardContent className="p-4">
                  <h3 className="font-semibold">{store.name}</h3>
                  <p className="text-sm text-gray-600">Última visita: {new Date(store.last_visit).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Total de visitas: {store.total_visits}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Rupture History */}
        <h2 className="text-lg font-semibold mb-4">Histórico de Rupturas</h2>
        <div className="space-y-3 mb-4">
          {ruptureHistory.length === 0 ? (
            <p className="text-gray-500 text-center">Nenhuma ruptura registrada recentemente.</p>
          ) : (
            ruptureHistory.map((rupture) => (
              <Card key={rupture.id} className="border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <h3 className="font-semibold">{rupture.product_name}</h3>
                  <p className="text-sm text-gray-600">PDV: {rupture.pdv_name}</p>
                  <p className="text-sm text-gray-600">Data: {new Date(rupture.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Status: {rupture.status}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Product Prices and Promotions */}
        <h2 className="text-lg font-semibold mb-4">Preços e Promoções</h2>
        <div className="space-y-3 mb-4">
          {productPrices.length === 0 ? (
            <p className="text-gray-500 text-center">Nenhum preço ou promoção registrado.</p>
          ) : (
            productPrices.map((item) => (
              <Card key={item.id} className="border-l-4 border-l-yellow-500">
                <CardContent className="p-4">
                  <h3 className="font-semibold">{item.product_name}</h3>
                  <p className="text-sm text-gray-600">PDV: {item.pdv_name}</p>
                  <p className="text-sm text-gray-600">Preço Atual: R$ {item.current_price?.toFixed(2)}</p>
                  {item.promotion_details && (
                    <p className="text-sm text-blue-600">Promoção: {item.promotion_details}</p>
                  )}
                  {item.validity_date && (
                    <p className="text-sm text-red-600">Validade: {new Date(item.validity_date).toLocaleDateString()}</p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{activities.filter(a => a.status === 'completed').length}</p>
              <p className="text-sm text-gray-600">Concluídas</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{activities.filter(a => a.status === 'pending' || a.status === 'overdue').length}</p>
              <p className="text-sm text-gray-600">Pendentes</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PromotorDashboard


