import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bot, Brain, TrendingUp, AlertTriangle, CheckCircle, Clock, MapPin, Camera, FileText, Download } from 'lucide-react'

const MentorPDV = ({ visitData, onClose }) => {
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mentorMessage, setMentorMessage] = useState('')

  useEffect(() => {
    // Simula análise do Mentor PDV
    const simulateAnalysis = () => {
      setLoading(true)
      
      // Simula dados de análise baseados na visita
      const mockAnalysis = {
        store: visitData?.store || "Supermercado Popular",
        date: new Date().toISOString(),
        location: "Salvador/BA",
        checklist_score: 75,
        execution_grade: "B",
        issues_detected: [
          {
            type: "positioning",
            severity: "medium",
            description: "Produto na base da gôndola",
            icon: "📍"
          },
          {
            type: "promotional_material",
            severity: "high", 
            description: "Cartaz promocional ausente",
            icon: "📋"
          },
          {
            type: "stock",
            severity: "high",
            description: "Ruptura parcial sabor limão",
            icon: "📦"
          }
        ],
        recommendations: [
          {
            action: "Realocar produtos para altura média da prateleira",
            priority: "high",
            estimated_impact: "+15% giro em 7 dias",
            category: "positioning"
          },
          {
            action: "Aplicar material promocional (cartaz/stopper)",
            priority: "high",
            estimated_impact: "+20% visibilidade",
            category: "promotional"
          },
          {
            action: "Solicitar reposição urgente do sabor limão",
            priority: "critical",
            estimated_impact: "+25% vendas perdidas recuperadas",
            category: "stock"
          }
        ],
        photo_analysis: {
          photos_processed: 2,
          visual_insights: [
            "Produto identificado na gôndola",
            "Posicionamento detectado: base da prateleira", 
            "Material promocional: não detectado",
            "Concorrentes visíveis: 3 marcas identificadas"
          ]
        },
        estimated_total_impact: "+22% performance geral",
        next_visit_suggested: "10/04/2024"
      }

      const message = `👋 Olá! Aqui é o Mentor PDV da TradeLite.

📍 Analisamos a execução na loja **${mockAnalysis.store}**.

📊 **Score de Execução:** ${mockAnalysis.checklist_score}/100 (Nota ${mockAnalysis.execution_grade})

⚠️ **Pontos de Atenção Identificados:**
🟡 Produto na base da gôndola
🔴 Cartaz promocional ausente  
🔴 Ruptura parcial sabor limão

💡 **Recomendações Prioritárias:**
🔥 Realocar produtos para altura média da prateleira
   📈 Impacto estimado: +15% giro em 7 dias

⚡ Aplicar material promocional (cartaz/stopper)
   📈 Impacto estimado: +20% visibilidade

🔥 Solicitar reposição urgente do sabor limão
   📈 Impacto estimado: +25% vendas perdidas recuperadas

🎯 **Impacto Total Estimado:** +22% performance geral

📅 **Próxima Visita Sugerida:** 10/04/2024`

      setTimeout(() => {
        setAnalysis(mockAnalysis)
        setMentorMessage(message)
        setLoading(false)
      }, 2000)
    }

    simulateAnalysis()
  }, [visitData])

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Mentor PDV Analisando...</h3>
            <p className="text-gray-600">Processando dados da visita e gerando insights</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold">Mentor PDV</h2>
            <Badge className="bg-green-100 text-green-800">Análise Concluída</Badge>
          </div>
          <Button variant="outline" onClick={onClose}>Fechar</Button>
        </div>

        <div className="p-6">
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="analysis">Análise</TabsTrigger>
              <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
              <TabsTrigger value="message">Mensagem</TabsTrigger>
              <TabsTrigger value="actions">Ações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analysis" className="space-y-4">
              {/* Header da Análise */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5" />
                        <span>{analysis.store}</span>
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-4 mt-2">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Hoje às 14h16</span>
                        </span>
                        <span>{analysis.location}</span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{analysis.checklist_score}/100</div>
                      <Badge className={`${analysis.execution_grade === 'A' ? 'bg-green-100 text-green-800' : 
                                       analysis.execution_grade === 'B' ? 'bg-blue-100 text-blue-800' : 
                                       'bg-yellow-100 text-yellow-800'}`}>
                        Nota {analysis.execution_grade}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Análise de Foto */}
              {analysis.photo_analysis && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Camera className="w-5 h-5" />
                      <span>Análise da Imagem</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Fotos Processadas</h4>
                        <p className="text-2xl font-bold text-blue-600">{analysis.photo_analysis.photos_processed}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Insights Visuais</h4>
                        <ul className="space-y-1">
                          {analysis.photo_analysis.visual_insights.map((insight, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Issues Detectados */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Pontos de Atenção ({analysis.issues_detected.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.issues_detected.map((issue, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <span className="text-xl">{issue.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{issue.description}</span>
                            <Badge className={getSeverityColor(issue.severity)}>
                              {issue.severity === 'critical' ? 'Crítico' : 
                               issue.severity === 'high' ? 'Alto' : 'Médio'}
                            </Badge>
                          </div>
                          <span className="text-sm text-gray-600 capitalize">{issue.type.replace('_', ' ')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommendations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span>Recomendações Inteligentes</span>
                  </CardTitle>
                  <CardDescription>
                    Ações priorizadas para maximizar o impacto na execução
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.recommendations.map((rec, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{rec.action}</h4>
                          <Badge className={getPriorityColor(rec.priority)}>
                            {rec.priority === 'critical' ? 'Crítico' : 
                             rec.priority === 'high' ? 'Alto' : 'Médio'}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span>{rec.estimated_impact}</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-xs text-gray-500 capitalize">
                            Categoria: {rec.category.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">Impacto Total Estimado</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{analysis.estimated_total_impact}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Próxima visita sugerida: {analysis.next_visit_suggested}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="message" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bot className="w-5 h-5" />
                    <span>Mensagem do Mentor PDV</span>
                  </CardTitle>
                  <CardDescription>
                    Relatório completo formatado para compartilhamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm font-mono">{mentorMessage}</pre>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Copiar Texto
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="actions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                  <CardDescription>
                    Ferramentas para implementar as recomendações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Quero modelo de cartaz agora
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Clock className="w-4 h-4 mr-2" />
                    Agendar reavaliação da loja em 7 dias
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Ver ranking de execução por loja
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Criar alerta para próxima visita
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default MentorPDV

