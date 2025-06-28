import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, MapPin, Clock, User, Camera, AlertTriangle } from 'lucide-react'

const VisitDetails = ({ user }) => {
  const { visitId } = useParams()
  const navigate = useNavigate()
  
  // Dados simulados da visita
  const [visitData] = useState({
    id: visitId,
    pdv: 'Loja B',
    promotor: 'Maria',
    date: '03/04/2024',
    status: 'Alerta',
    checkin_time: '14:30',
    checkout_time: '15:45',
    location: 'Rua das Palmeiras, 789',
    observations: 'Verificar estoque de produtos da linha Y',
    photos: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
        description: 'Gôndola principal'
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        description: 'Material promocional'
      }
    ],
    checklist: [
      { question: 'Produto em estoque?', answer: 'Não', alert: true },
      { question: 'Material promocional presente?', answer: 'Sim', alert: false },
      { question: 'Posicionamento na gôndola', answer: 'Prateleira central, altura dos olhos', alert: false }
    ]
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Concluída':
        return <Badge className="bg-green-100 text-green-800">Concluída</Badge>
      case 'Alerta':
        return <Badge className="bg-red-100 text-red-800">Alerta</Badge>
      case 'Iniciada':
        return <Badge className="bg-blue-100 text-blue-800">Iniciada</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/gestor')}
            className="text-white hover:bg-blue-700 mr-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">DETALHES DA VISITA</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Visit Info */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>PDV: {visitData.pdv}</CardTitle>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <User className="w-4 h-4 mr-1" />
                  Promotor: {visitData.promotor}
                </div>
              </div>
              {getStatusBadge(visitData.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
              <span>Data: {visitData.date}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="w-4 h-4 mr-2 text-gray-500" />
              <span>{visitData.location}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Check-in:</span> {visitData.checkin_time} | 
              <span className="text-gray-500 ml-2">Check-out:</span> {visitData.checkout_time}
            </div>
          </CardContent>
        </Card>

        {/* Checklist Results */}
        <Card>
          <CardHeader>
            <CardTitle>Resultados do Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {visitData.checklist.map((item, index) => (
              <div key={index} className="border-l-4 border-l-gray-200 pl-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.question}</p>
                    <p className="text-sm text-gray-600 mt-1">{item.answer}</p>
                  </div>
                  {item.alert && (
                    <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Observations */}
        <Card>
          <CardHeader>
            <CardTitle>Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm">{visitData.observations}</p>
            </div>
          </CardContent>
        </Card>

        {/* Photos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              Fotos da Visita ({visitData.photos.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {visitData.photos.map((photo) => (
                <div key={photo.id} className="space-y-2">
                  <img
                    src={photo.url}
                    alt={photo.description}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className="text-sm text-gray-600">{photo.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default VisitDetails

