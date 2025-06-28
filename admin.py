from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import random
import json

admin_bp = Blueprint('admin', __name__)

# Dados simulados para demonstração
SAMPLE_PLANS = [
    {
        "id": 1,
        "name": "TradeLite Básico",
        "price": 299.90,
        "billing_cycle": "mensal",
        "features": ["Até 5 promotores", "10 PDVs", "Relatórios básicos"]
    },
    {
        "id": 2,
        "name": "TradeLite Pro",
        "price": 599.90,
        "billing_cycle": "mensal", 
        "features": ["Até 15 promotores", "50 PDVs", "Mentor PDV", "Relatórios avançados"]
    },
    {
        "id": 3,
        "name": "TradeLite Enterprise",
        "price": 1299.90,
        "billing_cycle": "mensal",
        "features": ["Promotores ilimitados", "PDVs ilimitados", "API personalizada", "Suporte prioritário"]
    }
]

SAMPLE_PAYMENT_METHODS = [
    {
        "id": 1,
        "type": "credit_card",
        "description": "Cartão de Crédito **** 1234",
        "brand": "Visa",
        "is_default": True,
        "expires_at": "12/2025"
    },
    {
        "id": 2,
        "type": "bank_transfer",
        "description": "Transferência Bancária - Banco do Brasil",
        "is_default": False
    }
]

SAMPLE_INVOICES = [
    {
        "id": "NF001234",
        "date": "2024-03-01",
        "amount": 599.90,
        "status": "paid",
        "due_date": "2024-03-10",
        "description": "TradeLite Pro - Março 2024",
        "pdf_url": "/invoices/NF001234.pdf"
    },
    {
        "id": "NF001235", 
        "date": "2024-04-01",
        "amount": 599.90,
        "status": "paid",
        "due_date": "2024-04-10",
        "description": "TradeLite Pro - Abril 2024",
        "pdf_url": "/invoices/NF001235.pdf"
    },
    {
        "id": "NF001236",
        "date": "2024-05-01",
        "amount": 599.90,
        "status": "overdue",
        "due_date": "2024-05-10",
        "description": "TradeLite Pro - Maio 2024",
        "pdf_url": "/invoices/NF001236.pdf"
    }
]

SAMPLE_CATEGORIES = [
    "Bebidas", "Alimentos", "Higiene", "Limpeza", "Cosméticos", 
    "Eletrônicos", "Roupas", "Calçados", "Casa e Jardim", "Automotivo"
]

SAMPLE_BRANDS = [
    "Coca-Cola", "Pepsi", "Nestlé", "Unilever", "P&G", "Johnson & Johnson",
    "Samsung", "Apple", "Nike", "Adidas", "Ford", "Volkswagen"
]

def generate_payment_history():
    """Gera histórico de pagamentos simulado"""
    history = []
    
    for i in range(12):  # Últimos 12 meses
        date = datetime.now() - timedelta(days=30 * i)
        
        # Simular alguns atrasos ocasionais
        is_late = random.random() < 0.1  # 10% chance de atraso
        
        payment = {
            "month": date.strftime("%Y-%m"),
            "amount": 599.90,
            "due_date": date.strftime("%Y-%m-10"),
            "paid_date": (date + timedelta(days=random.randint(0, 15) if is_late else random.randint(-5, 5))).strftime("%Y-%m-%d"),
            "status": "late" if is_late else "on_time",
            "days_late": random.randint(1, 10) if is_late else 0
        }
        
        history.append(payment)
    
    return sorted(history, key=lambda x: x['month'], reverse=True)

@admin_bp.route('/billing_info', methods=['GET'])
def get_billing_info():
    """Obtém informações de cobrança e plano atual"""
    try:
        current_plan = random.choice(SAMPLE_PLANS)
        payment_history = generate_payment_history()
        
        # Calcular estatísticas
        late_payments = [p for p in payment_history if p['status'] == 'late']
        avg_delay = sum(p['days_late'] for p in late_payments) / len(late_payments) if late_payments else 0
        
        billing_info = {
            "current_plan": current_plan,
            "next_billing_date": (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d"),
            "payment_methods": SAMPLE_PAYMENT_METHODS,
            "invoices": SAMPLE_INVOICES,
            "payment_history": payment_history,
            "statistics": {
                "total_payments": len(payment_history),
                "late_payments": len(late_payments),
                "on_time_percentage": ((len(payment_history) - len(late_payments)) / len(payment_history) * 100) if payment_history else 100,
                "average_delay_days": round(avg_delay, 1)
            }
        }
        
        return jsonify({"success": True, "billing_info": billing_info})
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@admin_bp.route('/products', methods=['GET'])
def get_products():
    """Lista produtos cadastrados"""
    try:
        products = []
        
        for i in range(20):
            product = {
                "id": i + 1,
                "sku": f"SKU{random.randint(1000, 9999)}",
                "name": f"Produto {random.choice(['Suco', 'Refrigerante', 'Água', 'Energético'])} {random.choice(['Laranja', 'Uva', 'Limão', 'Maracujá'])}",
                "brand": random.choice(SAMPLE_BRANDS),
                "category": random.choice(SAMPLE_CATEGORIES),
                "volume": f"{random.choice([350, 500, 1000, 1500, 2000])}ml",
                "suggested_price": round(random.uniform(2.50, 15.90), 2),
                "created_at": (datetime.now() - timedelta(days=random.randint(1, 365))).isoformat(),
                "active": random.choice([True, True, True, False])  # 75% ativos
            }
            products.append(product)
        
        return jsonify({"success": True, "products": products})
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@admin_bp.route('/products', methods=['POST'])
def create_product():
    """Cria um novo produto"""
    try:
        data = request.get_json()
        
        product = {
            "id": random.randint(1000, 9999),
            "sku": data.get('sku'),
            "name": data.get('name'),
            "brand": data.get('brand'),
            "category": data.get('category'),
            "volume": data.get('volume'),
            "suggested_price": float(data.get('suggested_price', 0)),
            "created_at": datetime.now().isoformat(),
            "active": True
        }
        
        return jsonify({
            "success": True,
            "product": product,
            "message": "Produto criado com sucesso"
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@admin_bp.route('/stores', methods=['GET'])
def get_stores():
    """Lista lojas cadastradas"""
    try:
        stores = []
        
        store_names = [
            "Supermercado Popular", "Mercado Central", "Loja Express", "Atacadão Norte",
            "Hipermercado Família", "Mini Mercado Silva", "Supermercado Bom Preço", 
            "Mercado do Povo", "Loja Conveniência", "Atacado Distribuidor"
        ]
        
        for i, name in enumerate(store_names):
            store = {
                "id": i + 1,
                "cnpj": f"{random.randint(10, 99)}.{random.randint(100, 999)}.{random.randint(100, 999)}/0001-{random.randint(10, 99)}",
                "name": name,
                "address": {
                    "street": f"Rua {random.choice(['das Flores', 'Principal', 'do Comércio', 'Central'])} {random.randint(100, 999)}",
                    "neighborhood": f"Bairro {random.choice(['Centro', 'Comercial', 'Industrial', 'Residencial'])}",
                    "city": random.choice(["Salvador", "São Paulo", "Rio de Janeiro", "Brasília"]),
                    "state": random.choice(["BA", "SP", "RJ", "DF"]),
                    "zip_code": f"{random.randint(10000, 99999)}-{random.randint(100, 999)}"
                },
                "manager": {
                    "name": f"{random.choice(['João', 'Maria', 'Pedro', 'Ana'])} {random.choice(['Silva', 'Santos', 'Oliveira', 'Costa'])}",
                    "phone": f"(11) 9{random.randint(1000, 9999)}-{random.randint(1000, 9999)}",
                    "whatsapp": f"(11) 9{random.randint(1000, 9999)}-{random.randint(1000, 9999)}"
                },
                "operating_hours": {
                    "monday_friday": "08:00 - 22:00",
                    "saturday": "08:00 - 20:00", 
                    "sunday": "09:00 - 18:00"
                },
                "facade_photo": f"/photos/store_{i+1}_facade.jpg",
                "observations": "Loja com bom movimento, localizada em área comercial",
                "created_at": (datetime.now() - timedelta(days=random.randint(1, 365))).isoformat(),
                "active": True
            }
            stores.append(store)
        
        return jsonify({"success": True, "stores": stores})
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@admin_bp.route('/stores', methods=['POST'])
def create_store():
    """Cria uma nova loja"""
    try:
        data = request.get_json()
        
        store = {
            "id": random.randint(1000, 9999),
            "cnpj": data.get('cnpj'),
            "name": data.get('name'),
            "address": data.get('address'),
            "manager": data.get('manager'),
            "operating_hours": data.get('operating_hours'),
            "facade_photo": data.get('facade_photo'),
            "observations": data.get('observations', ''),
            "created_at": datetime.now().isoformat(),
            "active": True
        }
        
        return jsonify({
            "success": True,
            "store": store,
            "message": "Loja criada com sucesso"
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@admin_bp.route('/categories', methods=['GET'])
def get_categories():
    """Lista categorias disponíveis"""
    try:
        return jsonify({"success": True, "categories": SAMPLE_CATEGORIES})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@admin_bp.route('/brands', methods=['GET'])
def get_brands():
    """Lista marcas disponíveis"""
    try:
        return jsonify({"success": True, "brands": SAMPLE_BRANDS})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@admin_bp.route('/support_contact', methods=['POST'])
def contact_tradelite_support():
    """Contato com suporte técnico da TradeLite"""
    try:
        data = request.get_json()
        
        ticket = {
            "id": f"ADM{random.randint(100, 999)}",
            "type": "admin_support",
            "subject": data.get('subject'),
            "message": data.get('message'),
            "priority": data.get('priority', 'normal'),
            "created_at": datetime.now().isoformat(),
            "status": "open"
        }
        
        return jsonify({
            "success": True,
            "ticket": ticket,
            "message": "Solicitação enviada para o suporte TradeLite. Retorno em até 4h úteis."
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@admin_bp.route('/dashboard_stats', methods=['GET'])
def get_admin_dashboard_stats():
    """Obtém estatísticas para o dashboard administrativo"""
    try:
        stats = {
            "total_users": random.randint(50, 200),
            "active_promoters": random.randint(20, 80),
            "active_managers": random.randint(5, 20),
            "total_stores": random.randint(30, 100),
            "total_products": random.randint(100, 500),
            "monthly_visits": random.randint(500, 2000),
            "system_health": {
                "uptime": "99.8%",
                "response_time": "120ms",
                "error_rate": "0.2%"
            },
            "recent_activities": [
                {
                    "type": "user_created",
                    "description": "Novo promotor cadastrado: João Silva",
                    "timestamp": (datetime.now() - timedelta(hours=2)).isoformat()
                },
                {
                    "type": "store_added",
                    "description": "Nova loja adicionada: Mercado Central",
                    "timestamp": (datetime.now() - timedelta(hours=5)).isoformat()
                },
                {
                    "type": "product_updated",
                    "description": "Produto atualizado: Suco de Laranja 500ml",
                    "timestamp": (datetime.now() - timedelta(hours=8)).isoformat()
                }
            ]
        }
        
        return jsonify({"success": True, "stats": stats})
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

