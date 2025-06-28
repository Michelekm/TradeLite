import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
from src.models.user import db
from src.routes.user import user_bp
from src.routes.mentor import mentor_bp
from src.routes.admin import admin_bp
from src.routes.promoter import promoter_bp
from src.routes.manager import manager_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# Enable CORS for all routes
CORS(app)

app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(mentor_bp, url_prefix='/api/mentor')
app.register_blueprint(admin_bp, url_prefix='/api/admin')
app.register_blueprint(promoter_bp, url_prefix='/api/promoter')
app.register_blueprint(manager_bp, url_prefix='/api/manager')

# uncomment if you need to use database
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
with app.app_context():
    db.create_all()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    # Simulação de autenticação
    if email == 'joao@tradelite.com' and password == '123456' and role == 'promotor':
        return jsonify({"id": 1, "name": "João Silva", "email": email, "role": role}), 200
    elif email == 'maria@tradelite.com' and password == '123456' and role == 'gestor':
        return jsonify({"id": 2, "name": "Maria Santos", "email": email, "role": role}), 200
    elif email == 'admin@tradelite.com' and password == '123456' and role == 'admin':
        return jsonify({"id": 3, "name": "Admin User", "email": email, "role": role}), 200
    else:
        return jsonify({"message": "Credenciais inválidas"}), 401

@app.route('/', defaults={'path': ''}) 
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
            return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


