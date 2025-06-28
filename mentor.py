from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import random
import json

mentor_bp = Blueprint('mentor', __name__)

# Dados simulados para demonstração
SAMPLE_STORES = [
    "Supermercado Popular", "Mercado Central", "Loja Express", 
    "Hipermercado Família", "Mini Mercado Silva", "Atacadão Norte",
    "Supermercado Bom Preço", "Mercado do Povo"
]

SAMPLE_PRODUCTS = [
    {"name": "Refrigerante Cola", "skus": ["Original", "Zero", "Limão"]},
    {"name": "Suco Natural", "skus": ["Laranja", "Uva", "Maçã"]},
    {"name": "Água Mineral", "skus": ["500ml", "1L", "1.5L"]}
]

SAMPLE_ISSUES = [
    {
        "type": "positioning",
        "descriptions": [
            "Produto na base da gôndola",
            "Produto em altura inadequada",
            "Posicionamento lateral prejudica visibilidade"
        ],
        "severities": ["medium", "high"]
    },
    {
        "type": "promotional_material", 
        "descriptions": [
            "Cartaz promocional ausente",
            "Material promocional vencido",
            "Stopper não aplicado"
        ],
        "severities": ["high", "medium"]
    },
    {
        "type": "stock",
        "descriptions": [
            "Ruptura parcial sabor limão",
            "Estoque baixo produto principal",
            "Falta de reposição há 2 dias"
        ],
        "severities": ["high", "critical"]
    },
    {
        "type": "pricing",
        "descriptions": [
            "Precificação incorreta",
            "Preço promocional não aplicado",
            "Etiqueta de preço ausente"
        ],
        "severities": ["medium", "high"]
    },
    {
        "type": "competition",
        "descriptions": [
            "Concorrente dominando espaço central",
            "Produto concorrente em melhor posição",
            "Share of shelf abaixo do esperado"
        ],
        "severities": ["medium", "high"]
    }
]

SAMPLE_RECOMMENDATIONS = [
    {
        "action": "Realocar produtos para altura média da prateleira",
        "priority": "high",
        "estimated_impact": "+15% giro em 7 dias",
        "category": "positioning"
    },
    {
        "action": "Aplicar material promocional (cartaz/stopper)",
        "priority": "high", 
        "estimated_impact": "+20% visibilidade",
        "category": "promotional"
    },
    {
        "action": "Solicitar reposição urgente de SKUs em falta",
        "priority": "critical",
        "estimated_impact": "+25% vendas perdidas recuperadas",
        "category": "stock"
    },
    {
        "action": "Corrigir precificação conforme tabela promocional",
        "priority": "medium",
        "estimated_impact": "+10% conversão",
        "category": "pricing"
    },
    {
        "action": "Negociar melhor posicionamento vs concorrência",
        "priority": "medium",
        "estimated_impact": "+12% share of shelf",
        "category": "competition"
    }
]

def generate_visit_analysis(store_name, checklist_data=None):
    """Gera análise simulada de uma visita"""
    
    # Simula score baseado no checklist
    if checklist_data:
        total_items = len(checklist_data)
        completed_items = sum(1 for item in checklist_data.values() if item)
        score = int((completed_items / total_items) * 100) if total_items > 0 else 75
    else:
        score = random.randint(60, 95)
    
    # Gera issues baseados no score
    num_issues = 4 - (score // 25)  # Menos issues para scores maiores
    issues = []
    
    for _ in range(max(1, num_issues)):
        issue_type = random.choice(SAMPLE_ISSUES)
        issue = {
            "type": issue_type["type"],
            "severity": random.choice(issue_type["severities"]),
            "description": random.choice(issue_type["descriptions"])
        }
        issues.append(issue)
    
    # Gera recomendações baseadas nos issues
    recommendations = []
    for issue in issues:
        matching_recs = [r for r in SAMPLE_RECOMMENDATIONS if r["category"] in issue["type"]]
        if matching_recs:
            rec = random.choice(matching_recs).copy()
            if issue["severity"] == "critical":
                rec["priority"] = "critical"
            recommendations.append(rec)
    
    return {
        "store": store_name,
        "date": datetime.now().isoformat(),
        "location": f"{random.choice(['Salvador', 'São Paulo', 'Rio de Janeiro', 'Brasília'])}/BA",
        "checklist_score": score,
        "execution_grade": "A" if score >= 90 else "B" if score >= 75 else "C" if score >= 60 else "D",
        "issues_detected": issues,
        "recommendations": recommendations,
        "estimated_total_impact": f"+{random.randint(15, 35)}% performance geral",
        "next_visit_suggested": (datetime.now() + timedelta(days=7)).strftime("%d/%m/%Y")
    }

@mentor_bp.route('/analyze_visit', methods=['POST'])
def analyze_visit():
    """Analisa uma visita completa e retorna insights"""
    try:
        data = request.get_json()
        store_name = data.get('store', random.choice(SAMPLE_STORES))
        checklist_data = data.get('checklist', {})
        photos = data.get('photos', [])
        
        analysis = generate_visit_analysis(store_name, checklist_data)
        
        # Adiciona análise de fotos (simulada)
        if photos:
            analysis["photo_analysis"] = {
                "photos_processed": len(photos),
                "visual_insights": [
                    "Produto identificado na gôndola",
                    "Posicionamento detectado: base da prateleira",
                    "Material promocional: não detectado",
                    "Concorrentes visíveis: 3 marcas identificadas"
                ]
            }
        
        return jsonify({
            "success": True,
            "analysis": analysis,
            "mentor_message": generate_mentor_message(analysis)
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@mentor_bp.route('/get_insights/<store_name>', methods=['GET'])
def get_insights(store_name):
    """Obtém insights específicos de uma loja"""
    try:
        analysis = generate_visit_analysis(store_name)
        
        return jsonify({
            "success": True,
            "store": store_name,
            "insights": analysis,
            "historical_trend": generate_historical_trend(),
            "benchmark": generate_benchmark_data(store_name)
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@mentor_bp.route('/dashboard_kpis', methods=['GET'])
def get_dashboard_kpis():
    """Retorna KPIs para o dashboard aprimorado"""
    try:
        # Simula dados de múltiplas lojas
        stores_data = []
        for store in SAMPLE_STORES:
            analysis = generate_visit_analysis(store)
            stores_data.append({
                "store": store,
                "score": analysis["checklist_score"],
                "grade": analysis["execution_grade"],
                "issues_count": len(analysis["issues_detected"]),
                "last_visit": datetime.now() - timedelta(days=random.randint(0, 10)),
                "promoter": random.choice(["João Silva", "Maria Santos", "Pedro Costa", "Ana Oliveira"])
            })
        
        # Calcula KPIs gerais
        total_stores = len(stores_data)
        avg_score = sum(s["score"] for s in stores_data) / total_stores
        stores_with_issues = len([s for s in stores_data if s["issues_count"] > 0])
        
        kpis = {
            "total_stores": total_stores,
            "average_execution_score": round(avg_score, 1),
            "stores_with_issues": stores_with_issues,
            "compliance_rate": round((total_stores - stores_with_issues) / total_stores * 100, 1),
            "stores_data": stores_data,
            "alerts": generate_alerts(),
            "top_performers": sorted(stores_data, key=lambda x: x["score"], reverse=True)[:3],
            "needs_attention": [s for s in stores_data if s["score"] < 70]
        }
        
        return jsonify({"success": True, "kpis": kpis})
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@mentor_bp.route('/generate_report', methods=['POST'])
def generate_report():
    """Gera relatório detalhado"""
    try:
        data = request.get_json()
        report_type = data.get('type', 'weekly')
        stores = data.get('stores', SAMPLE_STORES)
        
        report = {
            "type": report_type,
            "generated_at": datetime.now().isoformat(),
            "period": f"Últimos 7 dias" if report_type == 'weekly' else "Último mês",
            "summary": {
                "total_visits": random.randint(50, 100),
                "average_score": random.randint(75, 90),
                "issues_resolved": random.randint(20, 40),
                "improvement_rate": f"+{random.randint(5, 15)}%"
            },
            "store_details": [generate_visit_analysis(store) for store in stores[:5]],
            "recommendations": {
                "priority_actions": [
                    "Focar em treinamento de posicionamento de produtos",
                    "Implementar checklist de materiais promocionais",
                    "Estabelecer rotina de reposição mais frequente"
                ],
                "strategic_insights": [
                    "Lojas do centro da cidade apresentam melhor performance",
                    "Produtos em altura média têm 20% mais giro",
                    "Material promocional aumenta vendas em 15% em média"
                ]
            }
        }
        
        return jsonify({"success": True, "report": report})
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

def generate_mentor_message(analysis):
    """Gera mensagem personalizada do Mentor PDV"""
    store = analysis["store"]
    score = analysis["checklist_score"]
    grade = analysis["execution_grade"]
    issues = analysis["issues_detected"]
    
    message = f"👋 Olá! Aqui é o Mentor PDV da TradeLite.\n\n"
    message += f"📍 Analisamos a execução na loja **{store}**.\n\n"
    message += f"📊 **Score de Execução:** {score}/100 (Nota {grade})\n\n"
    
    if issues:
        message += "⚠️ **Pontos de Atenção Identificados:**\n"
        for i, issue in enumerate(issues[:3], 1):
            severity_emoji = "🔴" if issue["severity"] == "critical" else "🟡" if issue["severity"] == "high" else "🟢"
            message += f"{severity_emoji} {issue['description']}\n"
        message += "\n"
    
    message += "💡 **Recomendações Prioritárias:**\n"
    for i, rec in enumerate(analysis["recommendations"][:3], 1):
        priority_emoji = "🔥" if rec["priority"] == "critical" else "⚡" if rec["priority"] == "high" else "📌"
        message += f"{priority_emoji} {rec['action']}\n"
        message += f"   📈 Impacto estimado: {rec['estimated_impact']}\n\n"
    
    message += f"🎯 **Impacto Total Estimado:** {analysis['estimated_total_impact']}\n\n"
    message += f"📅 **Próxima Visita Sugerida:** {analysis['next_visit_suggested']}"
    
    return message

def generate_historical_trend():
    """Gera dados de tendência histórica"""
    dates = [(datetime.now() - timedelta(days=i)).strftime("%d/%m") for i in range(30, 0, -1)]
    scores = [random.randint(70, 95) for _ in dates]
    
    return {
        "dates": dates,
        "scores": scores,
        "trend": "improving" if scores[-1] > scores[0] else "declining"
    }

def generate_benchmark_data(store_name):
    """Gera dados de benchmark"""
    return {
        "store_score": random.randint(70, 95),
        "category_average": random.randint(75, 85),
        "market_leader": random.randint(85, 95),
        "position_ranking": random.randint(1, 10),
        "total_stores": random.randint(50, 100)
    }

def generate_alerts():
    """Gera alertas para o dashboard"""
    alerts = []
    
    alert_types = [
        {"type": "ruptura", "message": "Ruptura crítica detectada em 3 lojas", "severity": "high"},
        {"type": "performance", "message": "Queda de 15% na execução - Loja Central", "severity": "medium"},
        {"type": "visita", "message": "5 lojas sem visita há mais de 7 dias", "severity": "medium"},
        {"type": "material", "message": "Material promocional vencido em 2 PDVs", "severity": "low"},
        {"type": "concorrencia", "message": "Concorrente ganhou espaço - Mercado Norte", "severity": "medium"}
    ]
    
    # Seleciona alguns alertas aleatórios
    selected_alerts = random.sample(alert_types, random.randint(2, 4))
    
    for alert in selected_alerts:
        alerts.append({
            "id": random.randint(1000, 9999),
            "type": alert["type"],
            "message": alert["message"],
            "severity": alert["severity"],
            "timestamp": (datetime.now() - timedelta(hours=random.randint(1, 24))).isoformat(),
            "read": random.choice([True, False])
        })
    
    return alerts

