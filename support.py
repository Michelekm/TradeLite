from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import random
import json

support_bp = Blueprint('support', __name__)

# Dados simulados para demonstração
SAMPLE_DEVICES = [
    "iPhone 14 Pro", "Samsung Galaxy S23", "iPhone 13", "Xiaomi Redmi Note 12",
    "Samsung Galaxy A54", "iPhone 12", "Motorola Edge 40", "OnePlus 11"
]

SAMPLE_LOCATIONS = [
    "Salvador/BA", "São Paulo/SP", "Rio de Janeiro/RJ", "Brasília/DF",
    "Belo Horizonte/MG", "Fortaleza/CE", "Recife/PE", "Porto Alegre/RS"
]

SAMPLE_IPS = [
    "192.168.1.100", "10.0.0.50", "172.16.0.25", "192.168.0.200"
]

CONNECTION_TYPES = ["Wi-Fi", "4G", "5G", "3G"]

FAQ_ITEMS = [
    {
        "id": 1,
        "title": "Não consigo fazer check-in",
        "icon": "📍",
        "category": "checkin",
        "steps": [
            "Verifique se a localização está ativada",
            "Certifique-se de estar próximo ao PDV",
            "Tente fechar e abrir o app novamente",
            "Verifique sua conexão com a internet"
        ],
        "video_url": "/videos/checkin-tutorial.mp4"
    },
    {
        "id": 2,
        "title": "Erro ao enviar fotos",
        "icon": "📤",
        "category": "photos",
        "steps": [
            "Verifique se há espaço suficiente no dispositivo",
            "Confirme se a câmera tem permissão no app",
            "Tente tirar a foto novamente",
            "Verifique a qualidade da conexão"
        ],
        "video_url": "/videos/photo-upload-tutorial.mp4"
    },
    {
        "id": 3,
        "title": "Problema com produto atribuído",
        "icon": "🧾",
        "category": "products",
        "steps": [
            "Verifique se você é responsável pelo produto",
            "Confirme se está na loja correta",
            "Use a opção 'Contestar' se necessário",
            "Entre em contato com seu gestor"
        ],
        "video_url": "/videos/product-management.mp4"
    },
    {
        "id": 4,
        "title": "Geolocalização falhando",
        "icon": "📍",
        "category": "location",
        "steps": [
            "Ative o GPS do dispositivo",
            "Permita acesso à localização no app",
            "Saia de ambientes fechados se possível",
            "Reinicie o aplicativo"
        ],
        "video_url": "/videos/gps-troubleshooting.mp4"
    },
    {
        "id": 5,
        "title": "Esqueci minha senha",
        "icon": "🔐",
        "category": "password",
        "steps": [
            "Clique em 'Esqueci minha senha' na tela de login",
            "Digite seu e-mail cadastrado",
            "Verifique sua caixa de entrada",
            "Siga as instruções do e-mail recebido"
        ],
        "video_url": "/videos/password-reset.mp4"
    },
    {
        "id": 6,
        "title": "Problemas técnicos gerais",
        "icon": "🛠️",
        "category": "technical",
        "steps": [
            "Feche e abra o aplicativo",
            "Verifique se há atualizações disponíveis",
            "Reinicie seu dispositivo",
            "Entre em contato com o suporte"
        ],
        "video_url": "/videos/general-troubleshooting.mp4"
    }
]

ERROR_CODES = {
    "203": {
        "title": "Erro de Conexão com Servidor",
        "description": "Falha na comunicação com o servidor",
        "solution": "Verifique sua conexão com a internet e tente novamente",
        "steps": [
            "Verifique se está conectado à internet",
            "Tente alternar entre Wi-Fi e dados móveis",
            "Feche e abra o aplicativo",
            "Se persistir, entre em contato com o suporte"
        ]
    },
    "404": {
        "title": "Recurso Não Encontrado",
        "description": "O recurso solicitado não foi encontrado",
        "solution": "Atualize o aplicativo ou entre em contato com o suporte",
        "steps": [
            "Verifique se o app está atualizado",
            "Tente fazer logout e login novamente",
            "Limpe o cache do aplicativo",
            "Entre em contato com o suporte"
        ]
    },
    "500": {
        "title": "Erro Interno do Servidor",
        "description": "Erro interno no servidor",
        "solution": "Aguarde alguns minutos e tente novamente",
        "steps": [
            "Aguarde alguns minutos",
            "Tente novamente",
            "Se persistir, entre em contato com o suporte",
            "Informe o código de erro 500"
        ]
    }
}

def generate_user_technical_info(user_id, user_type):
    """Gera informações técnicas simuladas do usuário"""
    return {
        "user_id": user_id,
        "user_type": user_type,
        "device_info": {
            "model": random.choice(SAMPLE_DEVICES),
            "os": "iOS 17.2" if "iPhone" in random.choice(SAMPLE_DEVICES) else "Android 13",
            "app_version": "2.1.4",
            "last_update": (datetime.now() - timedelta(days=random.randint(1, 30))).isoformat()
        },
        "connection_info": {
            "last_ip": random.choice(SAMPLE_IPS),
            "connection_type": random.choice(CONNECTION_TYPES),
            "last_seen": (datetime.now() - timedelta(minutes=random.randint(5, 120))).isoformat()
        },
        "location_info": {
            "last_location": random.choice(SAMPLE_LOCATIONS),
            "coordinates": {
                "lat": -12.9714 + random.uniform(-0.1, 0.1),
                "lng": -38.5014 + random.uniform(-0.1, 0.1)
            },
            "accuracy": random.randint(5, 50)
        },
        "activity_info": {
            "last_activity": (datetime.now() - timedelta(minutes=random.randint(1, 60))).isoformat(),
            "session_duration": random.randint(300, 3600),  # segundos
            "daily_usage": random.randint(60, 480)  # minutos
        }
    }

def generate_activity_history(user_type):
    """Gera histórico de atividades simulado"""
    activities = []
    
    if user_type == "promotor":
        # Últimos PDVs acessados
        pdvs = ["Supermercado Popular", "Mercado Central", "Loja Express", "Atacadão Norte"]
        for i in range(5):
            activities.append({
                "type": "pdv_access",
                "description": f"Acessou {random.choice(pdvs)}",
                "timestamp": (datetime.now() - timedelta(hours=random.randint(1, 72))).isoformat(),
                "location": random.choice(SAMPLE_LOCATIONS)
            })
        
        # Check-ins e check-outs
        for i in range(3):
            store = random.choice(pdvs)
            checkin_time = datetime.now() - timedelta(hours=random.randint(1, 48))
            checkout_time = checkin_time + timedelta(minutes=random.randint(30, 120))
            
            activities.extend([
                {
                    "type": "checkin",
                    "description": f"Check-in em {store}",
                    "timestamp": checkin_time.isoformat(),
                    "location": random.choice(SAMPLE_LOCATIONS)
                },
                {
                    "type": "checkout", 
                    "description": f"Check-out de {store}",
                    "timestamp": checkout_time.isoformat(),
                    "location": random.choice(SAMPLE_LOCATIONS)
                }
            ])
        
        # Fotos enviadas
        for i in range(4):
            activities.append({
                "type": "photo_upload",
                "description": f"Enviou {random.randint(1, 3)} foto(s) - {random.choice(pdvs)}",
                "timestamp": (datetime.now() - timedelta(hours=random.randint(1, 48))).isoformat(),
                "files": [f"photo_{random.randint(1000, 9999)}.jpg"]
            })
    
    elif user_type == "gestor":
        # Acessos ao dashboard
        for i in range(8):
            activities.append({
                "type": "dashboard_access",
                "description": "Acessou dashboard executivo",
                "timestamp": (datetime.now() - timedelta(hours=random.randint(1, 72))).isoformat(),
                "duration": random.randint(300, 1800)
            })
        
        # Análises do Mentor PDV
        for i in range(3):
            activities.append({
                "type": "mentor_analysis",
                "description": f"Analisou visita com Mentor PDV - {random.choice(['Loja A', 'Loja B', 'Loja C'])}",
                "timestamp": (datetime.now() - timedelta(hours=random.randint(1, 48))).isoformat()
            })
    
    # Ordenar por timestamp (mais recente primeiro)
    activities.sort(key=lambda x: x['timestamp'], reverse=True)
    return activities[:10]  # Retornar apenas os 10 mais recentes

def generate_tickets_history(user_id):
    """Gera histórico de chamados simulado"""
    tickets = []
    statuses = ["Aberto", "Em Andamento", "Resolvido", "Fechado"]
    categories = ["Técnico", "Funcionalidade", "Bug", "Dúvida", "Sugestão"]
    
    for i in range(random.randint(2, 6)):
        created_date = datetime.now() - timedelta(days=random.randint(1, 30))
        status = random.choice(statuses)
        
        ticket = {
            "id": f"TL{random.randint(100, 999)}",
            "title": f"Problema com {random.choice(['check-in', 'upload de fotos', 'geolocalização', 'login', 'sincronização'])}",
            "category": random.choice(categories),
            "status": status,
            "priority": random.choice(["Baixa", "Média", "Alta", "Crítica"]),
            "created_at": created_date.isoformat(),
            "updated_at": (created_date + timedelta(hours=random.randint(1, 48))).isoformat(),
            "description": "Descrição detalhada do problema reportado pelo usuário",
            "responses": []
        }
        
        # Adicionar respostas se o ticket não estiver apenas "Aberto"
        if status != "Aberto":
            ticket["responses"].append({
                "from": "Suporte TradeLite",
                "message": "Recebemos seu chamado e estamos analisando. Retornaremos em breve.",
                "timestamp": (created_date + timedelta(hours=1)).isoformat()
            })
            
            if status in ["Resolvido", "Fechado"]:
                ticket["responses"].append({
                    "from": "Suporte TradeLite", 
                    "message": "Problema resolvido. Por favor, teste e confirme se está funcionando.",
                    "timestamp": (created_date + timedelta(hours=random.randint(2, 24))).isoformat()
                })
        
        tickets.append(ticket)
    
    return sorted(tickets, key=lambda x: x['created_at'], reverse=True)

@support_bp.route('/user_info/<user_id>', methods=['GET'])
def get_user_technical_info(user_id):
    """Obtém informações técnicas do usuário"""
    try:
        user_type = request.args.get('type', 'promotor')
        
        tech_info = generate_user_technical_info(user_id, user_type)
        activity_history = generate_activity_history(user_type)
        tickets_history = generate_tickets_history(user_id)
        
        return jsonify({
            "success": True,
            "user_info": tech_info,
            "activity_history": activity_history,
            "tickets_history": tickets_history
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@support_bp.route('/faq', methods=['GET'])
def get_faq():
    """Retorna itens do FAQ para autoatendimento"""
    try:
        category = request.args.get('category')
        
        if category:
            filtered_faq = [item for item in FAQ_ITEMS if item['category'] == category]
            return jsonify({"success": True, "faq_items": filtered_faq})
        
        return jsonify({"success": True, "faq_items": FAQ_ITEMS})
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@support_bp.route('/faq/<int:faq_id>', methods=['GET'])
def get_faq_details(faq_id):
    """Obtém detalhes de um item específico do FAQ"""
    try:
        faq_item = next((item for item in FAQ_ITEMS if item['id'] == faq_id), None)
        
        if not faq_item:
            return jsonify({"success": False, "error": "FAQ item not found"}), 404
        
        return jsonify({"success": True, "faq_item": faq_item})
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@support_bp.route('/error_code/<code>', methods=['GET'])
def get_error_code_info(code):
    """Obtém informações sobre um código de erro específico"""
    try:
        error_info = ERROR_CODES.get(code)
        
        if not error_info:
            return jsonify({
                "success": False, 
                "error": "Código de erro não encontrado"
            }), 404
        
        return jsonify({"success": True, "error_info": error_info})
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@support_bp.route('/create_ticket', methods=['POST'])
def create_support_ticket():
    """Cria um novo chamado de suporte"""
    try:
        data = request.get_json()
        
        ticket = {
            "id": f"TL{random.randint(100, 999)}",
            "user_id": data.get('user_id'),
            "title": data.get('title'),
            "category": data.get('category'),
            "description": data.get('description'),
            "priority": data.get('priority', 'Média'),
            "status": "Aberto",
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat(),
            "attachments": data.get('attachments', []),
            "responses": []
        }
        
        return jsonify({
            "success": True,
            "ticket": ticket,
            "message": "Chamado criado com sucesso. Resposta esperada em até 2h úteis."
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@support_bp.route('/tickets/<user_id>', methods=['GET'])
def get_user_tickets(user_id):
    """Obtém chamados do usuário"""
    try:
        tickets = generate_tickets_history(user_id)
        
        return jsonify({"success": True, "tickets": tickets})
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@support_bp.route('/chat/start', methods=['POST'])
def start_chat_session():
    """Inicia uma sessão de chat com suporte"""
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        message = data.get('message')
        
        # Simular resposta do bot
        bot_responses = [
            "Olá! Sou o assistente virtual da TradeLite. Como posso ajudar?",
            "Entendi seu problema. Vou verificar algumas soluções rápidas para você.",
            "Baseado na sua descrição, sugiro seguir estes passos...",
            "Se isso não resolver, vou conectar você com um atendente humano."
        ]
        
        session = {
            "session_id": f"chat_{random.randint(1000, 9999)}",
            "user_id": user_id,
            "started_at": datetime.now().isoformat(),
            "status": "active",
            "messages": [
                {
                    "from": "user",
                    "message": message,
                    "timestamp": datetime.now().isoformat()
                },
                {
                    "from": "bot",
                    "message": random.choice(bot_responses),
                    "timestamp": (datetime.now() + timedelta(seconds=2)).isoformat()
                }
            ]
        }
        
        return jsonify({"success": True, "chat_session": session})
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@support_bp.route('/escalate_to_human', methods=['POST'])
def escalate_to_human():
    """Escala atendimento para humano"""
    try:
        data = request.get_json()
        session_id = data.get('session_id')
        
        return jsonify({
            "success": True,
            "message": "Conectando você com um atendente humano. Tempo estimado: 3-5 minutos.",
            "queue_position": random.randint(1, 5)
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@support_bp.route('/urgent_support', methods=['POST'])
def request_urgent_support():
    """Solicita atendimento urgente"""
    try:
        data = request.get_json()
        
        return jsonify({
            "success": True,
            "message": "Solicitação de atendimento urgente registrada. Um especialista entrará em contato em até 15 minutos.",
            "ticket_id": f"URG{random.randint(100, 999)}",
            "estimated_response": "15 minutos"
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

