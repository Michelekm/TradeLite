import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, ArrowLeft, CheckCircle } from 'lucide-react'

const CheckIn = ({ user }) => {
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [checkedIn, setCheckedIn] = useState(false)
  const navigate = useNavigate()

  const getCurrentLocation = () => {
    setLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          })
          setLoading(false)
        },
        (error) => {
          console.error('Erro ao obter localização:', error)
          // Simulação de localização para demonstração
          setLocation({
            lat: -23.5505,
            lng: -46.6333,
            accuracy: 10
          })
          setLoading(false)
        }
      )
    } else {
      // Simulação de localização para demonstração
      setLocation({
        lat: -23.5505,
        lng: -46.6333,
        accuracy: 10
      })
      setLoading(false)
    }
  }

  const handleCheckIn = () => {
    setCheckedIn(true)
    setTimeout(() => {
      navigate('/checklist/1')
    }, 2000)
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  if (checkedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Check-in Realizado!</h2>
            <p className="text-gray-600 mb-4">Redirecionando para o checklist...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/promotor')}
            className="text-white hover:bg-blue-700 mr-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-bold">Check-in</h1>
        </div>
      </div>

      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Localização Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p>Obtendo localização...</p>
              </div>
            ) : location ? (
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Coordenadas:</p>
                  <p className="font-mono text-sm">
                    {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Precisão: {location.accuracy}m
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">PDV Identificado:</h3>
                  <p className="font-medium">Supermercado Exemplo</p>
                  <p className="text-sm text-gray-600">Rua das Flores, 123</p>
                </div>

                <Button 
                  onClick={handleCheckIn}
                  className="w-full bg-green-600 hover:bg-green-700 h-12"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Confirmar Check-in
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">Não foi possível obter a localização</p>
                <Button onClick={getCurrentLocation} variant="outline">
                  Tentar Novamente
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CheckIn

