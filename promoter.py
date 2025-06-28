from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import random
import json

promoter_bp = Blueprint('promoter', __name__)

# Dados simulados para demonstração
SAMPLE_STORES = [
    "Supermercado Popular", "Mercado Central", "Loja Express", "Atacadão Norte",
    "Hipermercado Família", "Mini Mercado Silva", "Supermercado Bom Preço", "Mercado do Povo"
]

SAMPLE_PRODUCTS = [
    {"name": "Suco de Laranja 500ml", "brand": "Coca-Cola", "sku": "SKU001"},
    {"name": "Refrigerante Cola 350ml", "brand": "Coca-Cola", "sku": "SKU002"},
    {"name": "Água Mineral 1L", "brand": "Nestlé", "sku": "SKU003"},
    {"name": "Energético 250ml", "brand": "Red Bull", "sku": "SKU004"},
    {"name": "Suco de Uva 1L", "brand": "Suco Bom", "sku": "SKU005"}
]

def generate_visit_history(promoter_id):
    """Gera histórico de visitas do promotor"""
    visits = []
    
    for i in range(15):  # Últimas 15 visitas
        visit_date = datetime.now() - timedelta(days=random.randint(1, 30))
        
        visit = {
            "id": random.randint(1000, 9999),
            "store": random.choice(SAMPLE_STORES),
            "date": visit_date.strftime("%Y-%m-%d"),
            "time": visit_date.strftime("%H:%M"),
            "status": random.choice(["Concluída", "Pendente", "Em Andamento"]),
            "score": random.randint(60, 100),
            "photos_count": random.randint(1, 5),
            "issues_found": random.randint(0, 3),
            "duration": f"{random.randint(30, 120)} min",
            "products_checked": random.randint(3, 8)
        }
        visits.append(visit)
    
    return sorted(visits, key=lambda x: x['date'], reverse=True)

def generate_weekly_schedule(promoter_id):
    """Gera agenda semanal do promotor"""
    schedule = []
    
    # Próximos 7 dias
    for i in range(7):
        date = datetime.now() + timedelta(days=i)
        
        # Nem todos os dias têm visitas
        if random.random() < 0.7:  # 70% chance de ter visita
            num_visits = random.randint(1, 3)
            
            for j in range(num_visits):
                visit_time = date.replace(
                    hour=random.randint(8, 17),
                    minute=random.choice([0, 30])
                )
                
                deadline = visit_time + timedelta(days=random.randint(1, 3))
                hours_remaining = (deadline - datetime.now()).total_seconds() / 3600
                
                visit = {
                    "id": random.randint(1000, 9999),
                    "store": random.choice(SAMPLE_STORES),
                    "date": date.strftime("%Y-%m-%d"),
                    "time": visit_time.strftime("%H:%M"),
                    "deadline": deadline.strftime("%Y-%m-%d %H:%M"),
                    "hours_remaining": max(0, int(hours_remaining)),
                    "priority": "Alta" if hours_remaining < 24 else "Média" if hours_remaining < 48 else "Normal",
                    "products_to_check": random.sample(SAMPLE_PRODUCTS, random.randint(2, 4)),
                    "estimated_duration": f"{random.randint(45, 90)} min",
                    "status": "Agendada"
                }
                schedule.append(visit)
    
    return sorted(schedule, key=lambda x: f"{x['date']} {x['time']}")

def generate_rupture_history(promoter_id):
    """Gera histórico de rupturas reportadas"""
    ruptures = []
    
    for i in range(10):
        rupture_date = datetime.now() - timedelta(days=random.randint(1, 30))
        
        rupture = {
            "id": random.randint(1000, 9999),
            "store": random.choice(SAMPLE_STORES),
            "product": random.choice(SAMPLE_PRODUCTS),
            "date": rupture_date.strftime("%Y-%m-%d"),
            "time": rupture_date.strftime("%H:%M"),
            "type": random.choice(["Ruptura Total", "Ruptura Parcial", "Produto Vencido"]),
            "status": random.choice(["Reportada", "Em Análise", "Resolvida"]),
            "estimated_loss": f"R$ {random.randint(50, 500):.2f}",
            "resolution_time": f"{random.randint(1, 72)}h" if random.choice([True, False]) else "Pendente"
        }
        ruptures.append(rupture)
    
    return sorted(ruptures, key=lambda x: x['date'], reverse=True)

def generate_notifications(promoter_id):
    """Gera notificações para o promotor"""
    notifications = []
    
    notification_types = [
        {
            "type": "new_store",
            "title": "Nova loja adicionada",
            "message": "Loja Assaí entrou no seu fluxo de visitas",
            "icon": "🏪",
            "priority": "normal"
        },
        {
            "type": "adjustment_request",
            "title": "Ajuste necessário",
            "message": "Retorne ao Mercado Central para ajustar posicionamento do produto",
            "icon": "🔄",
            "priority": "high"
        },
        {
            "type": "deadline_alert",
            "title": "Prazo de visita",
            "message": "Loja Atacadão possui prazo até amanhã às 18h",
            "icon": "⏰",
            "priority": "high"
        },
        {
            "type": "feedback_available",
            "title": "Feedback disponível",
            "message": "Novo feedback do gestor sobre sua última visita",
            "icon": "💬",
            "priority": "normal"
        },
        {
            "type": "system_update",
            "title": "Atualização do sistema",
            "message": "Nova versão do app disponível com melhorias",
            "icon": "🔄",
            "priority": "low"
        }
    ]
    
    for i in range(random.randint(3, 8)):
        notification = random.choice(notification_types).copy()
        notification.update({
            "id": random.randint(1000, 9999),
            "timestamp": (datetime.now() - timedelta(hours=random.randint(1, 48))).isoformat(),
            "read": random.choice([True, False])
        })
        notifications.append(notification)
    
    return sorted(notifications, key=lambda x: x['timestamp'], reverse=True)

def generate_feedback_history(promoter_id):
    """Gera histórico de feedbacks recebidos"""
    feedbacks = []
    
    for i in range(8):
        feedback_date = datetime.now() - timedelta(days=random.randint(1, 30))
        
        feedback = {
            "id": random.randint(1000, 9999),
            "store": random.choice(SAMPLE_STORES),
            "date": feedback_date.strftime("%Y-%m-%d"),
            "from": random.choice(["Gestor", "Mentor PDV"]),
            "type": random.choice(["Elogio", "Sugestão", "Correção", "Orientação"]),
            "score": random.randint(70, 100),
            "message": random.choice([
                "Excelente trabalho na organização dos produtos!",
                "Atenção ao posicionamento na altura média da gôndola",
                "Fotos ficaram muito boas, continue assim",
                "Lembre-se de verificar as datas de validade",
                "Ótima identificação da ruptura, parabéns!"
            ]),
            "action_required": random.choice([True, False]),
            "priority": random.choice(["Baixa", "Média", "Alta"])
        }
        feedbacks.append(feedback)
    
    return sorted(feedbacks, key=lambda x: x['date'], reverse=True)

def generate_product_history(promoter_id):
    """Gera histórico de produtos sob responsabilidade"""
    products = []
    
    for product in SAMPLE_PRODUCTS:
        stores_responsible = random.sample(SAMPLE_STORES, random.randint(2, 5))
        
        for store in stores_responsible:
            product_entry = {
                "product": product,
                "store": store,
                "assigned_date": (datetime.now() - timedelta(days=random.randint(1, 90))).strftime("%Y-%m-%d"),
                "last_check": (datetime.now() - timedelta(days=random.randint(1, 7))).strftime("%Y-%m-%d"),
                "current_price": round(random.uniform(2.50, 15.90), 2),
                "suggested_price": round(random.uniform(2.50, 15.90), 2),
                "status": random.choice(["Ativo", "Ruptura", "Descontinuado"]),
                "performance_score": random.randint(60, 100),
                "can_contest": True
            }
            products.append(product_entry)
    
    return products

@promoter_bp.route('/visit_history/<promoter_id>', methods=['GET'])
def get_visit_history(promoter_id):
    """Obtém histórico de visitas do promotor"""
    try:
        visits = generate_visit_history(promoter_id)
        return jsonify({"success": True, "visits": visits})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@promoter_bp.route('/weekly_schedule/<promoter_id>', methods=['GET'])
def get_weekly_schedule(promoter_id):
    """Obtém agenda semanal do promotor"""
    try:
        schedule = generate_weekly_schedule(promoter_id)
        return jsonify({"success": True, "schedule": schedule})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@promoter_bp.route('/rupture_history/<promoter_id>', methods=['GET'])
def get_rupture_history(promoter_id):
    """Obtém histórico de rupturas reportadas"""
    try:
        ruptures = generate_rupture_history(promoter_id)
        return jsonify({"success": True, "ruptures": ruptures})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@promoter_bp.route('/notifications/<promoter_id>', methods=['GET'])
def get_notifications(promoter_id):
    """Obtém notificações do promotor"""
    try:
        notifications = generate_notifications(promoter_id)
        return jsonify({"success": True, "notifications": notifications})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@promoter_bp.route('/feedback_history/<promoter_id>', methods=['GET'])
def get_feedback_history(promoter_id):
    """Obtém histórico de feedbacks recebidos"""
    try:
        feedbacks = generate_feedback_history(promoter_id)
        return jsonify({"success": True, "feedbacks": feedbacks})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@promoter_bp.route('/product_history/<promoter_id>', methods=['GET'])
def get_product_history(promoter_id):
    """Obtém histórico de produtos sob responsabilidade"""
    try:
        products = generate_product_history(promoter_id)
        return jsonify({"success": True, "products": products})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@promoter_bp.route('/contest_product', methods=['POST'])
def contest_product_responsibility():
    """Contesta responsabilidade por produto"""
    try:
        data = request.get_json()
        
        contest = {
            "id": random.randint(1000, 9999),
            "promoter_id": data.get('promoter_id'),
            "product_sku": data.get('product_sku'),
            "store": data.get('store'),
            "reason": data.get('reason'),
            "message": data.get('message'),
            "created_at": datetime.now().isoformat(),
            "status": "Pendente"
        }
        
        return jsonify({
            "success": True,
            "contest": contest,
            "message": "Contestação enviada para o gestor. Aguarde análise."
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@promoter_bp.route('/update_profile', methods=['POST'])
def update_promoter_profile():
    """Atualiza perfil do promotor"""
    try:
        data = request.get_json()
        
        profile = {
            "promoter_id": data.get('promoter_id'),
            "name": data.get('name'),
            "email": data.get('email'),
            "phone": data.get('phone'),
            "profile_photo": data.get('profile_photo'),
            "updated_at": datetime.now().isoformat()
        }
        
        return jsonify({
            "success": True,
            "profile": profile,
            "message": "Perfil atualizado com sucesso"
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@promoter_bp.route('/register_price', methods=['POST'])
def register_current_price():
    """Registra preço atual do produto no PDV"""
    try:
        data = request.get_json()
        
        price_entry = {
            "id": random.randint(1000, 9999),
            "promoter_id": data.get('promoter_id'),
            "store": data.get('store'),
            "product_sku": data.get('product_sku'),
            "current_price": float(data.get('current_price')),
            "has_promotion": data.get('has_promotion', False),
            "promotion_details": data.get('promotion_details'),
            "registered_at": datetime.now().isoformat()
        }
        
        # Simular comparação com preço anterior
        previous_price = round(random.uniform(2.50, 15.90), 2)
        price_variation = price_entry['current_price'] - previous_price
        
        response = {
            "success": True,
            "price_entry": price_entry,
            "comparison": {
                "previous_price": previous_price,
                "variation": round(price_variation, 2),
                "variation_percentage": round((price_variation / previous_price) * 100, 1) if previous_price > 0 else 0
            }
        }
        
        # Alertar gestor se variação significativa
        if abs(price_variation) > 1.0:
            response["alert_sent_to_manager"] = True
            response["alert_message"] = f"Variação de preço detectada: R$ {previous_price:.2f} → R$ {price_entry['current_price']:.2f}"
        
        return jsonify(response)
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@promoter_bp.route('/register_expiry', methods=['POST'])
def register_product_expiry():
    """Registra validade do produto"""
    try:
        data = request.get_json()
        
        expiry_date = datetime.strptime(data.get('expiry_date'), '%Y-%m-%d')
        days_until_expiry = (expiry_date - datetime.now()).days
        
        expiry_entry = {
            "id": random.randint(1000, 9999),
            "promoter_id": data.get('promoter_id'),
            "store": data.get('store'),
            "product_sku": data.get('product_sku'),
            "expiry_date": data.get('expiry_date'),
            "expiry_photo": data.get('expiry_photo'),
            "days_until_expiry": days_until_expiry,
            "registered_at": datetime.now().isoformat()
        }
        
        response = {
            "success": True,
            "expiry_entry": expiry_entry
        }
        
        # Alerta se produto próximo ao vencimento
        if days_until_expiry <= 10:
            response["expiry_alert"] = {
                "message": f"Produto com validade inferior a 10 dias ({days_until_expiry} dias restantes). Deseja sinalizar risco de vencimento?",
                "severity": "high" if days_until_expiry <= 3 else "medium",
                "action_required": True
            }
        
        return jsonify(response)
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@promoter_bp.route('/training_materials', methods=['GET'])
def get_training_materials():
    """Obtém materiais de treinamento e guias"""
    try:
        materials = {
            "videos": [
                {
                    "id": 1,
                    "title": "Como montar ponta de gôndola",
                    "duration": "5:30",
                    "thumbnail": "/videos/thumbnails/gondola_setup.jpg",
                    "url": "/videos/gondola_setup.mp4",
                    "category": "Montagem"
                },
                {
                    "id": 2,
                    "title": "Posicionamento ideal de produtos",
                    "duration": "3:45",
                    "thumbnail": "/videos/thumbnails/product_positioning.jpg",
                    "url": "/videos/product_positioning.mp4",
                    "category": "Posicionamento"
                },
                {
                    "id": 3,
                    "title": "Como tirar fotos eficazes do PDV",
                    "duration": "4:20",
                    "thumbnail": "/videos/thumbnails/photo_tips.jpg",
                    "url": "/videos/photo_tips.mp4",
                    "category": "Fotografia"
                }
            ],
            "guides": [
                {
                    "id": 1,
                    "title": "Guia de Melhores Práticas",
                    "description": "Manual completo com dicas e técnicas",
                    "pdf_url": "/guides/best_practices.pdf",
                    "pages": 24
                },
                {
                    "id": 2,
                    "title": "Layout Padrão de PDV",
                    "description": "Modelos de organização por categoria",
                    "pdf_url": "/guides/pdv_layouts.pdf",
                    "pages": 16
                }
            ],
            "pdv_maps": [
                {
                    "store": "Supermercado Popular",
                    "layout_image": "/maps/supermercado_popular_layout.png",
                    "editable": True,
                    "last_updated": "2024-03-15"
                },
                {
                    "store": "Mercado Central",
                    "layout_image": "/maps/mercado_central_layout.png",
                    "editable": True,
                    "last_updated": "2024-03-10"
                }
            ]
        }
        
        return jsonify({"success": True, "materials": materials})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

