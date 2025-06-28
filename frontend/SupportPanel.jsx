import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  HelpCircle, MessageCircle, FileText, AlertTriangle, 
  Smartphone, Wifi, MapPin, Clock, User, Camera,
  CheckCircle, XCircle, AlertCircle, Phone
} from 'lucide-react'

const SupportPanel = ({ userType = 'promotor', userId = '1' }) => {
  const [userInfo, setUserInfo] = useState(null)
  const [faqItems, setFaqItems] = useState([])
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('faq')

  useEffect(() => {
    loadSupportData()
  }, [userId, userType])

  const loadSupportData = async () => {
    try {
      setLoading(true)
      
      // Carregar informações técnicas do usuário
      const userResponse = await fetch(`/api/support/user_info/${userId}?type=${userType}`)
      const userData = await userResponse.json()
      
      // Carregar FAQ
      const faqResponse = await fetch('/api/support/faq')
      const faqData = await faqResponse.json()
      
      // Carregar tickets
      const ticketsResponse = await fetch(`/api/support/tickets/${userId}`)
      const ticketsData = await ticketsResponse.json()
      
      if (userData.success) setUserInfo(userData)
      if (faqData.success) setFaqItems(faqData.faq_items)
      if (ticketsData.success) setTickets(ticketsData.tickets)
      
    } catch (error) {
      console.error('Erro ao carregar dados de suporte:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTicket = async (ticketData) => {
    try {
      const response = await fetch('/api/support/create_ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...ticketData, user_id: userId })
      })
      
      const result = await response.json()
      if (result.success) {
        setTickets([result.ticket, ...tickets])
        alert('Chamado criado com sucesso!')
      }
    } catch (error) {
      console.error('Erro ao criar chamado:', error)
    }
  }

  const startChat = async () => {
    try {
      const response = await fetch('/api/support/chat/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: userId, 
          message: 'Olá, preciso de ajuda com o aplicativo' 
        })
      })
      
      const result = await response.json()
      if (result.success) {
        alert('Chat iniciado! Conectando com suporte...')
      }
    } catch (error) {
      console.error('Erro ao iniciar chat:', error)
    }
  }

  const requestUrgentSupport = async () => {
    try {
      const response = await fetch('/api/support/urgent_support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId })
      })
      
      const result = await response.json()
      if (result.success) {
        alert(`Atendimento urgente solicitado! ${result.message}`)
      }
    } catch (error) {
      console.error('Erro ao solicitar atendimento urgente:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Carregando informações de suporte...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Central de Suporte</h1>
        <Button onClick={requestUrgentSupport} variant="destructive" className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Atendimento Urgente
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">Autoatendimento</TabsTrigger>
          <TabsTrigger value="chat">Chat/Suporte</TabsTrigger>
          <TabsTrigger value="tickets">Meus Chamados</TabsTrigger>
          <TabsTrigger value="technical">Info Técnica</TabsTrigger>
        </TabsList>

        {/* Autoatendimento Inteligente */}
        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Autoatendimento Inteligente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {faqItems.map((item) => (
                  <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{item.icon}</span>
                        <h3 className="font-semibold text-sm">{item.title}</h3>
                      </div>
                      <div className="space-y-2">
                        {item.steps.slice(0, 2).map((step, index) => (
                          <p key={index} className="text-xs text-gray-600">
                            {index + 1}. {step}
                          </p>
                        ))}
                        {item.steps.length > 2 && (
                          <p className="text-xs text-blue-600">
                            +{item.steps.length - 2} passos adicionais
                          </p>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full mt-3"
                        onClick={() => alert('Abrindo tutorial completo...')}
                      >
                        Ver Tutorial
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-center text-sm text-gray-600 mb-3">
                  Não encontrou solução para seu problema?
                </p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={startChat} className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Falar com Suporte
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Chat e Suporte */}
        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat com Suporte
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Converse diretamente com nossa equipe de suporte. 
                  Primeira resposta por assistente virtual, depois atendimento humano.
                </p>
                <Button onClick={startChat} className="w-full">
                  Iniciar Chat
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Abrir Chamado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Descreva seu problema detalhadamente. 
                  Resposta esperada em até 2h úteis.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    const subject = prompt('Assunto do chamado:')
                    const description = prompt('Descrição do problema:')
                    if (subject && description) {
                      handleCreateTicket({
                        title: subject,
                        description,
                        category: 'Geral',
                        priority: 'Média'
                      })
                    }
                  }}
                >
                  Criar Chamado
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contato Direto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Phone className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold">Telefone</h3>
                  <p className="text-sm text-gray-600">(11) 3000-0000</p>
                  <p className="text-xs text-gray-500">Seg-Sex 8h-18h</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-semibold">WhatsApp</h3>
                  <p className="text-sm text-gray-600">(11) 99999-0000</p>
                  <p className="text-xs text-gray-500">24h disponível</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
                  <h3 className="font-semibold">Urgente</h3>
                  <p className="text-sm text-gray-600">Problemas críticos</p>
                  <p className="text-xs text-gray-500">Resposta em 15min</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Meus Chamados */}
        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Chamados</CardTitle>
            </CardHeader>
            <CardContent>
              {tickets.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Nenhum chamado encontrado
                </p>
              ) : (
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">#{ticket.id}</span>
                          <Badge variant={
                            ticket.status === 'Resolvido' ? 'default' :
                            ticket.status === 'Em Andamento' ? 'secondary' : 'destructive'
                          }>
                            {ticket.status}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(ticket.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-medium mb-1">{ticket.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                      {ticket.responses.length > 0 && (
                        <div className="mt-3 p-3 bg-gray-50 rounded">
                          <p className="text-sm font-medium">Última resposta:</p>
                          <p className="text-sm text-gray-600">
                            {ticket.responses[ticket.responses.length - 1].message}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Informações Técnicas */}
        <TabsContent value="technical" className="space-y-4">
          {userInfo && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informações do Usuário
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          <strong>Dispositivo:</strong> {userInfo.user_info.device_info.model}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wifi className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          <strong>Conexão:</strong> {userInfo.user_info.connection_info.connection_type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          <strong>Localização:</strong> {userInfo.user_info.location_info.last_location}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          <strong>Última atividade:</strong> {
                            new Date(userInfo.user_info.activity_info.last_activity).toLocaleString()
                          }
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          <strong>Versão do app:</strong> {userInfo.user_info.device_info.app_version}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          <strong>Tipo de perfil:</strong> {userInfo.user_info.user_type}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Atividades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userInfo.activity_history.slice(0, 5).map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded">
                        <div className="flex-shrink-0">
                          {activity.type === 'checkin' && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {activity.type === 'checkout' && <XCircle className="h-4 w-4 text-red-600" />}
                          {activity.type === 'photo_upload' && <Camera className="h-4 w-4 text-blue-600" />}
                          {activity.type === 'pdv_access' && <MapPin className="h-4 w-4 text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.description}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(activity.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SupportPanel

