import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Camera, Send, CheckCircle } from 'lucide-react'

const Checklist = ({ user }) => {
  const { pdvId } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [photos, setPhotos] = useState([])
  const [observations, setObservations] = useState('')
  const [completed, setCompleted] = useState(false)

  const questions = [
    {
      id: 'stock',
      question: 'Produto em estoque?',
      type: 'radio',
      options: [
        { value: 'sim', label: 'Sim' },
        { value: 'nao', label: 'Não' }
      ]
    },
    {
      id: 'promotional',
      question: 'Material promocional presente?',
      type: 'radio',
      options: [
        { value: 'sim', label: 'Sim' },
        { value: 'nao', label: 'Não' }
      ]
    },
    {
      id: 'position',
      question: 'Posicionamento na gôndola',
      type: 'text',
      placeholder: 'Descreva o posicionamento do produto'
    }
  ]

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotos(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: e.target.result,
          name: file.name
        }])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = () => {
    // Simular envio dos dados
    setCompleted(true)
    setTimeout(() => {
      navigate('/promotor')
    }, 3000)
  }

  const canProceed = () => {
    if (currentStep < questions.length) {
      const currentQuestion = questions[currentStep]
      return answers[currentQuestion.id]
    }
    return photos.length > 0
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Checklist Enviado!</h2>
            <p className="text-gray-600 mb-4">Obrigado por completar a visita.</p>
            <div className="text-sm text-gray-500">
              Retornando ao dashboard...
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/promotor')}
              className="text-white hover:bg-blue-700 mr-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold">CHECKLIST</h1>
              <p className="text-sm text-blue-100">SUPERMERCADO EXEMPLO</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progresso</span>
            <span>{Math.min(currentStep + 1, questions.length + 1)}/{questions.length + 1}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / (questions.length + 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Questions */}
        {currentStep < questions.length && (
          <Card>
            <CardHeader>
              <CardTitle>{questions[currentStep].question}</CardTitle>
            </CardHeader>
            <CardContent>
              {questions[currentStep].type === 'radio' && (
                <RadioGroup
                  value={answers[questions[currentStep].id] || ''}
                  onValueChange={(value) => handleAnswerChange(questions[currentStep].id, value)}
                >
                  {questions[currentStep].options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {questions[currentStep].type === 'text' && (
                <Textarea
                  placeholder={questions[currentStep].placeholder}
                  value={answers[questions[currentStep].id] || ''}
                  onChange={(e) => handleAnswerChange(questions[currentStep].id, e.target.value)}
                  className="min-h-[100px]"
                />
              )}
            </CardContent>
          </Card>
        )}

        {/* Photo Upload */}
        {currentStep >= questions.length && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Adicionar Fotos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <Label htmlFor="photo-upload">
                  <Button variant="outline" className="w-full" asChild>
                    <span>
                      <Camera className="w-4 h-4 mr-2" />
                      ADICIONAR FOTO
                    </span>
                  </Button>
                </Label>

                {photos.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {photos.map((photo) => (
                      <div key={photo.id} className="relative">
                        <img
                          src={photo.url}
                          alt={photo.name}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Verificar estoque de produtos da linha Y"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-6 flex gap-3">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="flex-1"
            >
              Anterior
            </Button>
          )}
          
          {currentStep < questions.length ? (
            <Button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceed()}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Próximo
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4 mr-2" />
              ENVIAR
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Checklist

