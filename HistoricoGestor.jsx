import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, MapPin, Package, DollarSign, AlertTriangle, Calendar, Clock, CheckCircle, Users, TrendingUp, TrendingDown, Eye } from 'lucide-react'

const HistoricoGestor = ({ user }) => {
  const [visitHistory, setVisitHistory] = useState([])
  const [productHistory, setProductHistory] = useState([])
  const [priceHistory, setPriceHistory] = useState([])
  const [ruptureHistory, setRuptureHistory] = useState([])
  const [promoterHistory, setPromoterHistory] = useState([])

  useEffect(() => {
    fetchHistoryData()
  }, [user.id])

  const fetchHistoryData = async () => {
    try {
      // Simulando dados de exemplo para demonstração
      setVisitHistory([
        {
          id: 1,
          store: 'Supermercado Exemplo',
          promoter: 'João Silva',
          date: '2024-06-27',
          time: '14:00',
          status: 'Concluída',
          score: 92,
          photos: 5,
          duration: '45 min',
          issues: 0
        },
        {
          id: 2,
          store: 'Mercado Central',
          promoter: 'Maria Santos',
          date: '2024-06-27',
          time: '16:30',
          status: 'Concluída',
          score: 88,
          photos: 3,
          duration: '38 min',
          issues: 1
        },
        {
          id: 3,
          store: 'Loja Norte',
          promoter: 'Pedro Costa',
          date: '2024-06-27',
          time: '09:00',
          status: 'Concluída',
          score: 75,
          photos: 4,
          duration: '52 min',
          issues: 2
        }
      ])

      setProductHistory([
        {
          id: 1,
          product: 'Coca-Cola 2L',
          store: 'Supermercado Exemplo',
          promoter: 'João Silva',
          date: '2024-06-27',
          action: 'Verificado',
          status: 'Disponível',
          quantity: 25,
          target: 30
        },
        {
          id: 2,
          product: 'Pepsi 350ml',
          store: 'Mercado Central',
          promoter: 'Maria Santos',
          date: '2024-06-26',
          action: 'Ruptura Reportada',
          status: 'Indisponível',
          quantity: 0,
          target: 20
        },
        {
          id: 3,
          product: 'Água Mineral 500ml',
          store: 'Loja Norte',
          promoter: 'Pedro Costa',
          date: '2024-06-25',
          action: 'Verificado',
          status: 'Disponível',
          quantity: 15,
          target: 25
        }
      ])

      setPriceHistory([
        {
          id: 1,
          product: 'Coca-Cola 2L',
          store: 'Supermercado Exemplo',
          promoter: 'João Silva',
          date: '2024-06-27',
          price: 'R$ 8,99',
          suggested_price: 'R$ 9,50',
          promotion: 'Leve 2 Pague 1',
          validity: '2024-06-30',
          compliance: 'Conforme'
        },
        {
          id: 2,
          product: 'Pepsi 350ml',
          store: 'Mercado Central',
          promoter: 'Maria Santos',
          date: '2024-06-26',
          price: 'R$ 3,50',
          suggested_price: 'R$ 3,20',
          promotion: null,
          validity: null,
          compliance: 'Acima'
        }
      ])

      setRuptureHistory([
        {
          id: 1,
          product: 'Pepsi 350ml',
          store: 'Mercado Central',
          promoter: 'Maria Santos',
          date: '2024-06-26',
          time: '16:45',
          status: 'Reportada',
          resolved: false,
          priority: 'Alta',
          estimated_loss: 'R$ 150,00'
        },
        {
          id: 2,
          product: 'Suco de Laranja 1L',
          store: 'Loja Norte',
          promoter: 'Pedro Costa',
          date: '2024-06-24',
          time: '10:30',
          status: 'Resolvida',
          resolved: true,
          priority: 'Média',
          estimated_loss: 'R$ 80,00'
        }
      ])

      setPromoterHistory([
        {
          id: 1,
          name: 'João Silva',
          visits_today: 2,
          visits_week: 12,
          avg_score: 92,
          total_photos: 25,
          issues_reported: 1,
          performance_trend: 'up'
        },
        {
          id: 2,
          name: 'Maria Santos',
          visits_today: 1,
          visits_week: 8,
          avg_score: 88,
          total_photos: 18,
          issues_reported: 3,
          performance_trend: 'stable'
        },
        {
          id: 3,
          name: 'Pedro Costa',
          visits_today: 1,
          visits_week: 6,
          avg_score: 75,
          total_photos: 12,
          issues_reported: 5,
          performance_trend: 'down'
        }
      ])
    } catch (error) {
      console.error('Erro ao carregar histórico:', error)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Concluída':
        return <Badge className="bg-green-100 text-green-800">Concluída</Badge>
      case 'Disponível':
        return <Badge className="bg-green-100 text-green-800">Disponível</Badge>
      case 'Indisponível':
        return <Badge className="bg-red-100 text-red-800">Indisponível</Badge>
      case 'Reportada':
        return <Badge className="bg-orange-100 text-orange-800">Reportada</Badge>
      case 'Resolvida':
        return <Badge className="bg-green-100 text-green-800">Resolvida</Badge>
      case 'Conforme':
        return <Badge className="bg-green-100 text-green-800">Conforme</Badge>
      case 'Acima':
        return <Badge className="bg-yellow-100 text-yellow-800">Acima</Badge>
      case 'Abaixo':
        return <Badge className="bg-red-100 text-red-800">Abaixo</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getScoreBadge = (score) => {
    if (score >= 90) return <Badge className="bg-green-100 text-green-800">A</Badge>
    if (score >= 75) return <Badge className="bg-blue-100 text-blue-800">B</Badge>
    if (score >= 60) return <Badge className="bg-yellow-100 text-yellow-800">C</Badge>
    return <Badge className="bg-red-100 text-red-800">D</Badge>
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Alta':
        return <Badge className="bg-red-100 text-red-800">Alta</Badge>
      case 'Média':
        return <Badge className="bg-yellow-100 text-yellow-800">Média</Badge>
      case 'Baixa':
        return <Badge className="bg-green-100 text-green-800">Baixa</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center gap-4">
          <Link to="/gestor">
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Histórico Gerencial</h1>
            <p className="text-blue-100">Análise completa de atividades e performance</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="visitas" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="visitas" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Visitas
            </TabsTrigger>
            <TabsTrigger value="produtos" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="precos" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Preços
            </TabsTrigger>
            <TabsTrigger value="rupturas" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Rupturas
            </TabsTrigger>
            <TabsTrigger value="promotores" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Promotores
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visitas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Histórico de Visitas da Equipe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {visitHistory.map((visit) => (
                    <Card key={visit.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{visit.store}</h3>
                            <p className="text-sm text-gray-600">Promotor: {visit.promoter}</p>
                          </div>
                          <div className="text-right flex gap-2">
                            {getStatusBadge(visit.status)}
                            {getScoreBadge(visit.score)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(visit.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {visit.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span>{visit.photos} fotos</span>
                            <span>{visit.duration}</span>
                            <span className={visit.issues > 0 ? 'text-red-600' : 'text-green-600'}>
                              {visit.issues} problemas
                            </span>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
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

          <TabsContent value="produtos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Histórico de Produtos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {productHistory.map((product) => (
                    <Card key={product.id} className="border-l-4 border-l-green-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{product.product}</h3>
                            <p className="text-sm text-gray-600">{product.store} - {product.promoter}</p>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(product.status)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(product.date).toLocaleDateString()}
                            </span>
                            <span>{product.action}</span>
                          </div>
                          <div className="text-right">
                            <span className={product.quantity < product.target ? 'text-red-600' : 'text-green-600'}>
                              {product.quantity}/{product.target}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="precos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Histórico de Preços e Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {priceHistory.map((price) => (
                    <Card key={price.id} className="border-l-4 border-l-yellow-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{price.product}</h3>
                            <p className="text-sm text-gray-600">{price.store} - {price.promoter}</p>
                          </div>
                          <div className="text-right flex gap-2">
                            <span className="font-bold text-green-600">{price.price}</span>
                            {getStatusBadge(price.compliance)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(price.date).toLocaleDateString()}
                            </span>
                            <span>Sugerido: {price.suggested_price}</span>
                          </div>
                          <div className="text-right">
                            {price.promotion && (
                              <div className="text-blue-600 font-medium">{price.promotion}</div>
                            )}
                            {price.validity && (
                              <div className="text-xs">Válido até: {new Date(price.validity).toLocaleDateString()}</div>
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

          <TabsContent value="rupturas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Histórico de Rupturas e Perdas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ruptureHistory.map((rupture) => (
                    <Card key={rupture.id} className="border-l-4 border-l-red-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{rupture.product}</h3>
                            <p className="text-sm text-gray-600">{rupture.store} - {rupture.promoter}</p>
                          </div>
                          <div className="text-right flex gap-2">
                            {getStatusBadge(rupture.status)}
                            {getPriorityBadge(rupture.priority)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(rupture.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {rupture.time}
                            </span>
                          </div>
                          <div className="text-right flex items-center gap-2">
                            <span className="text-red-600 font-medium">{rupture.estimated_loss}</span>
                            {rupture.resolved && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
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

          <TabsContent value="promotores" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Performance dos Promotores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {promoterHistory.map((promoter) => (
                    <Card key={promoter.id} className="border-l-4 border-l-purple-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{promoter.name}</h3>
                            <p className="text-sm text-gray-600">Score médio: {promoter.avg_score}</p>
                          </div>
                          <div className="text-right flex items-center gap-2">
                            {getScoreBadge(promoter.avg_score)}
                            {getTrendIcon(promoter.performance_trend)}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <span>Visitas hoje: {promoter.visits_today}</span><br />
                            <span>Visitas semana: {promoter.visits_week}</span>
                          </div>
                          <div>
                            <span>Fotos: {promoter.total_photos}</span><br />
                            <span className={promoter.issues_reported > 3 ? 'text-red-600' : 'text-green-600'}>
                              Problemas: {promoter.issues_reported}
                            </span>
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

export default HistoricoGestor

