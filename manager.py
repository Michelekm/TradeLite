from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import random
import json

manager_bp = Blueprint('manager', __name__)

# Dados simulados para demonstração
SAMPLE_PROMOTERS = [
    {"id": 1, "name": "João Silva", "email": "joao@tradelite.com", "phone": "(11) 99999-1111"},
    {"id": 2, "name": "Maria Santos", "email": "maria@tradelite.com", "phone": "(11) 99999-2222"},
    {"id": 3, "name": "Pedro Costa", "email": "pedro@tradelite.com", "phone": "(11) 99999-3333"},
    {"id": 4, "name": "Ana Oliveira", "email": "ana@tradelite.com", "phone": "(11) 99999-4444"}
]

SAMPLE_STORES = [
    "Supermercado Popular", "Mercado Central", "Loja Express", "Atacadão Norte",
    "Hipermercado Família", "Mini Mercado Silva", "Supermercado Bom Preço", "Mercado do Povo"
]

def generate_promoter_performance():
    """Gera dados de performance dos promotores"""
    performance = []
    
    for promoter in SAMPLE_PROMOTERS:
        perf = {
            "promoter": promoter,
            "stats": {
                "visits_completed": random.randint(15, 45),
                "visits_pending": random.randint(0, 8),
                "average_score": random.randint(75, 95),
                "photos_uploaded": random.randint(50, 150),
                "issues_reported": random.randint(5, 20),
                "response_time": f"{random.randint(15, 60)} min"
            },
            "stores_assigned": random.sample(SAMPLE_STORES, random.randint(3, 6)),
            "products_assigned": random.randint(8, 15),
            "performance_trend": random.choice(["up", "down", "stable"]),
            "last_activity": (datetime.now() - timedelta(hours=random.randint(1, 24))).isoformat()
        }
        performance.append(perf)
    
    return performance

def generate_pending_stores():
    """Gera lista de lojas pendentes de visita"""
    pending = []
    
    for i in range(random.randint(3, 8)):
        store = random.choice(SAMPLE_STORES)
        promoter = random.choice(SAMPLE_PROMOTERS)
        last_visit = datetime.now() - timedelta(days=random.randint(3, 15))
        deadline = datetime.now() + timedelta(hours=random.randint(6, 72))
        
        pending_store = {
            "store": store,
            "promoter": promoter,
            "last_visit": last_visit.strftime("%Y-%m-%d"),
            "days_since_visit": (datetime.now() - last_visit).days,
            "deadline": deadline.strftime("%Y-%m-%d %H:%M"),
            "hours_remaining": int((deadline - datetime.now()).total_seconds() / 3600),
            "priority": "Alta" if (deadline - datetime.now()).total_seconds() < 86400 else "Média",
            "reason": random.choice(["Visita agendada", "Reavaliação necessária", "Novo produto", "Correção pendente"])
        }
        pending.append(pending_store)
    
    return sorted(pending, key=lambda x: x['hours_remaining'])

def generate_manager_notifications():
    """Gera notificações para o gestor"""
    notifications = []
    
    notification_types = [
        {
            "type": "visit_completed",
            "title": "Visita concluída",
            "message": "João Silva concluiu visita no Supermercado Popular",
            "icon": "✅",
            "priority": "normal"
        },
        {
            "type": "rupture_detected",
            "title": "Ruptura detectada",
            "message": "Produto em falta no Mercado Central - Suco de Laranja",
            "icon": "⚠️",
            "priority": "high"
        },
        {
            "type": "price_variation",
            "title": "Variação de preço",
            "message": "Preço alterado no Atacadão Norte: R$ 5,90 → R$ 4,90",
            "icon": "💰",
            "priority": "medium"
        },
        {
            "type": "deadline_alert",
            "title": "Prazo próximo",
            "message": "Loja Express pendente há 6 dias, prazo em 18 horas",
            "icon": "⏰",
            "priority": "high"
        },
        {
            "type": "contest_received",
            "title": "Contestação recebida",
            "message": "Maria Santos contestou responsabilidade por produto",
            "icon": "❓",
            "priority": "medium"
        }
    ]
    
    for i in range(random.randint(5, 12)):
        notification = random.choice(notification_types).copy()
        notification.update({
            "id": random.randint(1000, 9999),
            "timestamp": (datetime.now() - timedelta(hours=random.randint(1, 48))).isoformat(),
            "read": random.choice([True, False])
        })
        notifications.append(notification)
    
    return sorted(notifications, key=lambda x: x['timestamp'], reverse=True)

def generate_price_variations():
    """Gera alertas de variação de preço"""
    variations = []
    
    products = [
        "Suco de Laranja 500ml", "Refrigerante Cola 350ml", "Água Mineral 1L",
        "Energético 250ml", "Suco de Uva 1L"
    ]
    
    for i in range(random.randint(3, 8)):
        product = random.choice(products)
        store = random.choice(SAMPLE_STORES)
        promoter = random.choice(SAMPLE_PROMOTERS)
        
        old_price = round(random.uniform(3.0, 12.0), 2)
        new_price = round(old_price + random.uniform(-2.0, 2.0), 2)
        variation = new_price - old_price
        
        variation_entry = {
            "id": random.randint(1000, 9999),
            "product": product,
            "store": store,
            "promoter": promoter,
            "old_price": old_price,
            "new_price": new_price,
            "variation": round(variation, 2),
            "variation_percentage": round((variation / old_price) * 100, 1),
            "date": (datetime.now() - timedelta(hours=random.randint(1, 24))).strftime("%Y-%m-%d %H:%M"),
            "justification": random.choice([
                "Campanha promocional",
                "Ajuste de margem",
                "Concorrência",
                "Não informado"
            ]) if abs(variation) > 0.5 else None
        }
        variations.append(variation_entry)
    
    return sorted(variations, key=lambda x: x['date'], reverse=True)

@manager_bp.route('/promoter_performance', methods=['GET'])
def get_promoter_performance():
    """Obtém dados de performance dos promotores"""
    try:
        performance = generate_promoter_performance()
        return jsonify({"success": True, "performance": performance})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@manager_bp.route('/pending_stores', methods=['GET'])
def get_pending_stores():
    """Obtém lojas pendentes de visita"""
    try:
        pending = generate_pending_stores()
        return jsonify({"success": True, "pending_stores": pending})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@manager_bp.route('/notifications/<manager_id>', methods=['GET'])
def get_manager_notifications(manager_id):
    """Obtém notificações do gestor"""
    try:
        notifications = generate_manager_notifications()
        return jsonify({"success": True, "notifications": notifications})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@manager_bp.route('/price_variations', methods=['GET'])
def get_price_variations():
    """Obtém alertas de variação de preço"""
    try:
        variations = generate_price_variations()
        return jsonify({"success": True, "price_variations": variations})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@manager_bp.route('/assign_responsibility', methods=['POST'])
def assign_responsibility():
    """Atribui responsabilidade de loja/produto a promotor"""
    try:
        data = request.get_json()
        
        assignment = {
            "id": random.randint(1000, 9999),
            "promoter_id": data.get('promoter_id'),
            "store": data.get('store'),
            "product_sku": data.get('product_sku'),
            "assigned_by": data.get('manager_id'),
            "assigned_at": datetime.now().isoformat(),
            "effective_date": data.get('effective_date', datetime.now().strftime("%Y-%m-%d"))
        }
        
        return jsonify({
            "success": True,
            "assignment": assignment,
            "message": "Responsabilidade atribuída com sucesso"
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@manager_bp.route('/handle_contest', methods=['POST'])
def handle_contest():
    """Processa contestação de promotor"""
    try:
        data = request.get_json()
        action = data.get('action')  # 'approve', 'reject', 'reassign'
        
        response = {
            "contest_id": data.get('contest_id'),
            "action": action,
            "processed_by": data.get('manager_id'),
            "processed_at": datetime.now().isoformat()
        }
        
        if action == "approve":
            response["message"] = "Contestação aprovada. Responsabilidade removida."
        elif action == "reject":
            response["message"] = "Contestação rejeitada. Responsabilidade mantida."
            response["reason"] = data.get('rejection_reason')
        elif action == "reassign":
            response["message"] = "Responsabilidade transferida para outro promotor."
            response["new_promoter_id"] = data.get('new_promoter_id')
        
        return jsonify({"success": True, "result": response})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@manager_bp.route('/promoter_profile/<promoter_id>', methods=['GET'])
def get_promoter_profile(promoter_id):
    """Obtém perfil detalhado do promotor"""
    try:
        promoter = next((p for p in SAMPLE_PROMOTERS if p['id'] == int(promoter_id)), None)
        
        if not promoter:
            return jsonify({"success": False, "error": "Promotor não encontrado"}), 404
        
        profile = {
            "promoter": promoter,
            "stores_assigned": random.sample(SAMPLE_STORES, random.randint(3, 6)),
            "products_assigned": [
                {"name": "Suco de Laranja 500ml", "sku": "SKU001"},
                {"name": "Refrigerante Cola 350ml", "sku": "SKU002"},
                {"name": "Água Mineral 1L", "sku": "SKU003"}
            ],
            "performance_metrics": {
                "total_visits": random.randint(50, 200),
                "average_score": random.randint(75, 95),
                "completion_rate": random.randint(85, 98),
                "response_time": f"{random.randint(15, 60)} min"
            },
            "recent_activity": [
                {
                    "date": (datetime.now() - timedelta(hours=2)).strftime("%Y-%m-%d %H:%M"),
                    "action": "Visita concluída - Supermercado Popular"
                },
                {
                    "date": (datetime.now() - timedelta(hours=5)).strftime("%Y-%m-%d %H:%M"),
                    "action": "Check-in realizado - Mercado Central"
                }
            ]
        }
        
        return jsonify({"success": True, "profile": profile})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@manager_bp.route('/schedule_reevaluation', methods=['POST'])
def schedule_reevaluation():
    """Agenda reavaliação de loja via Mentor PDV"""
    try:
        data = request.get_json()
        
        reevaluation = {
            "id": random.randint(1000, 9999),
            "store": data.get('store'),
            "promoter_id": data.get('promoter_id'),
            "scheduled_by": data.get('manager_id'),
            "scheduled_date": (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d"),
            "reason": data.get('reason', "Reavaliação solicitada pelo Mentor PDV"),
            "priority": data.get('priority', "Normal"),
            "created_at": datetime.now().isoformat()
        }
        
        return jsonify({
            "success": True,
            "reevaluation": reevaluation,
            "message": "Reavaliação agendada e notificação enviada ao promotor"
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@manager_bp.route('/product_history', methods=['GET'])
def get_product_history():
    """Obtém histórico completo de produtos"""
    try:
        products = [
            {
                "sku": "SKU001",
                "name": "Suco de Laranja 500ml",
                "brand": "Coca-Cola",
                "stores": [
                    {
                        "store": "Supermercado Popular",
                        "promoter": "João Silva",
                        "current_price": 5.90,
                        "suggested_price": 6.50,
                        "last_check": "2024-03-20",
                        "status": "Ativo"
                    },
                    {
                        "store": "Mercado Central",
                        "promoter": "Maria Santos",
                        "current_price": 5.50,
                        "suggested_price": 6.50,
                        "last_check": "2024-03-19",
                        "status": "Ruptura"
                    }
                ]
            },
            {
                "sku": "SKU002",
                "name": "Refrigerante Cola 350ml",
                "brand": "Coca-Cola",
                "stores": [
                    {
                        "store": "Loja Express",
                        "promoter": "Pedro Costa",
                        "current_price": 3.90,
                        "suggested_price": 4.20,
                        "last_check": "2024-03-21",
                        "status": "Ativo"
                    }
                ]
            }
        ]
        
        return jsonify({"success": True, "products": products})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@manager_bp.route('/update_product', methods=['POST'])
def update_product():
    """Atualiza informações do produto"""
    try:
        data = request.get_json()
        
        update = {
            "product_sku": data.get('product_sku'),
            "store": data.get('store'),
            "updated_fields": data.get('updated_fields'),
            "updated_by": data.get('manager_id'),
            "updated_at": datetime.now().isoformat()
        }
        
        return jsonify({
            "success": True,
            "update": update,
            "message": "Produto atualizado com sucesso"
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

