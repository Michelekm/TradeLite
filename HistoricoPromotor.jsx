import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, MapPin, Package, DollarSign, AlertTriangle, Calendar, Clock, CheckCircle } from 'lucide-react'

const HistoricoPromotor = ({ user }) => {
  const [visitHistory, setVisitHistory] = useState([])
  const [productHistory, setProductHistory] = useState([])
  const [priceHistory, setPriceHistory] = useState([])
  const [ruptureHistory, setRuptureHistory] = useState([])

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
          address: 'Rua das Flores, 123',
          date: '2024-06-27',
          time: '14:00',
          status: 'Concluída',
          score: 92,
          photos: 5,
          duration: '45 min'
        },
        {
          id: 2,
          store: 'Mercado Central',
          address: 'Av. Principal, 456',
          date: '2024-06-26',
          time: '16:30',
          status: 'Concluída',
          score: 88,
          photos: 3,
          duration: '38 min'
        },
        {
          id: 3,
          store: 'Loja Norte',
          address: 'Rua Norte, 789',
          date: '2024-06-25',
          time: '09:00',
          status: 'Concluída',
          score: 75,
          photos: 4,
          duration: '52 min'
        }
      ])

      setProductHistory([
        {
          id: 1,
          product: 'Coca-Cola 2L',
          store: 'Supermercado Exemplo',
          date: '2024-06-27',
          action: 'Verificado',
          status: 'Disponível',
          quantity: 25
        },
        {
          id: 2,
          product: 'Pepsi 350ml',
          store: 'Mercado Central',
          date: '2024-06-26',
          action: 'Ruptura Reportada',
          status: 'Indisponível',
          quantity: 0
        },
        {
          id: 3,
          product: 'Água Mineral 500ml',
          store: 'Loja Norte',
          date: '2024-06-25',
          action: 'Verificado',
          status: 'Disponível',
          quantity: 15
        }
      ])

      setPriceHistory([
        {
          id: 1,
          product: 'Coca-Cola 2L',
          store: 'Supermercado Exemplo',
          date: '2024-06-27',
          price: 'R$ 8,99',
          promotion: 'Leve 2 Pague 1',
          validity: '2024-06-30'
        },
        {
          id: 2,
          product: 'Pepsi 350ml',
          store: 'Mercado Central',
          date: '2024-06-26',
          price: 'R$ 3,50',
          promotion: null,
          validity: null
        },
        {
          id: 3,
          product: 'Água Mineral 500ml',
          store: 'Loja Norte',
          date: '2024-06-25',
          price: 'R$ 2,00',
          promotion: '20% OFF',
          validity: '2024-07-01'
        }
      ])

      setRuptureHistory([
        {
          id: 1,
          product: 'Pepsi 350ml',
          store: 'Mercado Central',
          date: '2024-06-26',
          time: '16:45',
          status: 'Reportada',
          resolved: false
        },
        {
          id: 2,
          product: 'Suco de Laranja 1L',
          store: 'Loja Norte',
          date: '2024-06-24',
          time: '10:30',
          status: 'Resolvida',
          resolved: true
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
          <div>
            <h1 className="text-xl font-bold">Histórico</h1>
            <p className="text-blue-100">Visualize seu histórico de atividades</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="visitas" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
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
          </TabsList>

          <TabsContent value="visitas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Histórico de Visitas
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
                            <p className="text-sm text-gray-600">{visit.address}</p>
                          </div>
                          <div className="text-right">
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
                          <div className="flex items-center gap-2">
                            <span>{visit.photos} fotos</span>
                            <span>{visit.duration}</span>
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
                            <p className="text-sm text-gray-600">{product.store}</p>
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
                          <span>Qtd: {product.quantity}</span>
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
                  Histórico de Preços
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
                            <p className="text-sm text-gray-600">{price.store}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-green-600">{price.price}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(price.date).toLocaleDateString()}
                            </span>
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
                  Histórico de Rupturas
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
                            <p className="text-sm text-gray-600">{rupture.store}</p>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(rupture.status)}
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
                          {rupture.resolved && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
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

export default HistoricoPromotor

