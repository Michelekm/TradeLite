Plataforma TradeLite - MVP
Este repositório contém o código-fonte completo da Plataforma TradeLite, um Produto
Mínimo Viável (MVP) focado na gestão de execução no ponto de venda (PDV). O objetivo é
fornecer uma ferramenta simples, acessível e automatizada para a coleta de dados, geração
de alertas e relatórios visuais.
🚀 Tecnologias Utilizadas
Frontend
• Linguagem: JavaScript
• Framework: React.js
• Gerenciador de Pacotes: npm
• Estilização: Tailwind CSS
• Componentes UI: Shadcn/ui
• Ícones: Lucide Icons
Backend
• Linguagem: Python
• Framework: Flask
• Banco de Dados: SQLite (arquivo app.db )
• Gerenciador de Pacotes: pip
📦 Estrutura do Projeto
O projeto é dividido em duas partes principais:
• tradelite-mvp/ : Contém o código do frontend (aplicação React).
• tradelite-backend/ : Contém o código do backend (API Flask).
⚙️ Configuração e Instalação Local
Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.
Pré-requisitos
• Node.js (versão 18 ou superior) e npm
• Python (versão 3.9 ou superior) e pip
1. Backend (API Flask)
Bash
# Navegue até o diretório do backend
cd tradelite-backend
# Crie e ative um ambiente virtual
python3 -m venv venv
source venv/bin/activate # No Windows: .\venv\Scripts\activate
# Instale as dependências
pip install -r requirements.txt
# Defina a variável de ambiente FLASK_APP
export FLASK_APP=src/main.py # No Windows: set FLASK_APP=src/main.py
# Inicialize o banco de dados (se necessário, para criar o arquivo app.db e
tabelas)
# Este passo pode variar dependendo de como o banco de dados é inicializado
no main.py
# Se o app.db já existir, pode não ser necessário rodar migrações ou dumps.
# Para este projeto, o banco de dados é inicializado automaticamente na
primeira execução do Flask.
# Execute o servidor Flask
flask run --host=0.0.0.0 --port=5001
O servidor backend estará rodando em http://localhost:5001 .
2. Frontend (Aplicação React)
Bash
# Navegue até o diretório do frontend
cd tradelite-mvp
# Instale as dependências
npm install
# Configure a URL da API no arquivo src/config.js
# Certifique-se de que API_BASE_URL aponte para o seu backend (ex:
http://localhost:5001)
# Se você implantou o backend em um servidor, use a URL pública do backend.
# Execute a aplicação React em modo de desenvolvimento
npm run dev
A aplicação frontend estará disponível em http://localhost:5173 (ou outra porta disponível).
📊 Perfis de Usuário para Teste
Utilize as seguintes credenciais para testar a aplicação:
• Promotor: joao@tradelite.com | senha: 123456
• Gestor: maria@tradelite.com | senha: 123456
• Admin: admin@tradelite.com | senha: 123456
🔗 Integrações
Atualmente, a plataforma utiliza uma API interna para comunicação entre o frontend e o
backend. Não há integrações diretas com APIs externas de WhatsApp, serviços de e-mail ou
outras plataformas de notificação de terceiros neste MVP. As notificações e alertas são
gerenciados internamente pelo sistema.
🚀 Deploy
Para deploy em ambiente de produção, recomenda-se:
• Backend: Utilizar um servidor WSGI como Gunicorn ou uWSGI com Nginx para servir a
aplicação Flask.
• Frontend: Servir os arquivos estáticos gerados pelo npm run build através de um
servidor web (Nginx, Apache) ou um serviço de hospedagem de frontend (Vercel,
Netlify).
Certifique-se de configurar as variáveis de ambiente e a API_BASE_URL no frontend para
apontar para a URL pública do seu backend.
🚀 Deploy em Ambiente de Produção
Para implantar a plataforma TradeLite em um ambiente de produção, é crucial entender as
melhores práticas para hospedar tanto o frontend (React) quanto o backend (Flask) de
forma eficiente e segura.
Hospedagem do Frontend (React)
O frontend da plataforma TradeLite é uma Single Page Application (SPA) construída com
React. Isso significa que, após o processo de build, ele gera um conjunto de arquivos
estáticos (HTML, CSS, JavaScript) que podem ser servidos por qualquer servidor web
estático ou serviço de hospedagem de sites estáticos.
Processo de Build:
Antes de hospedar, você precisa "construir" o projeto para otimizar e empacotar o código
para produção. No diretório tradelite-mvp :
Bash
npm install # Instale as dependências, se ainda não o fez
npm run build # Execute o comando de build
Isso criará um diretório dist (ou build ) com os arquivos estáticos prontos para serem
servidos.
Opções de Hospedagem de Sites Estáticos:
• Netlify / Vercel: Plataformas excelentes para SPAs, oferecendo deploy contínuo, HTTPS
gratuito e planos generosos. Basta conectar seu repositório Git, configurar o comando
de build ( npm run build ) e o diretório de publicação ( dist ).
• GitHub Pages / GitLab Pages: Ótimas opções gratuitas para projetos hospedados no
GitHub/GitLab. Pode exigir alguma configuração adicional no package.json .
• Hospedagem Tradicional (Apache, Nginx): Você pode copiar o conteúdo do diretório
dist para um servidor web tradicional em um VPS. Lembre-se de configurar o servidor
para redirecionar todas as rotas não encontradas para o index.html para que o
roteamento do React funcione.
Considerações:
• Variáveis de Ambiente: Configure a API_BASE_URL (e outras variáveis, se houver) na
sua plataforma de hospedagem para apontar para a URL pública do seu backend.
• HTTPS: Sempre use HTTPS. A maioria dos serviços oferece isso gratuitamente.
• CORS: O backend precisará ter o CORS configurado para permitir requisições do
domínio do seu frontend.
Hospedagem do Backend (Flask) e Banco de Dados
O backend Flask requer um servidor de aplicação Python (como Gunicorn) e, idealmente,
um proxy reverso (como Nginx) em produção. O banco de dados SQLite é baseado em
arquivo, mas para produção, um banco de dados robusto como PostgreSQL é
recomendado.
Preparação do Backend:
No diretório tradelite-backend :
Bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
Opções de Hospedagem do Backend:
• Plataformas PaaS (Heroku, Render, Google App Engine, AWS Elastic Beanstalk): A
maneira mais fácil. Elas gerenciam a infraestrutura. Você precisaria configurar o
comando de build ( pip install -r requirements.txt ) e o comando de inicialização ( gunicorn --
bind 0.0.0.0:$PORT main:app , assumindo main.py e instância app ).
• VPS com Nginx + Gunicorn: Oferece mais controle. Você provisiona um servidor, instala
Python, Nginx, Gunicorn, clona o repositório, configura o ambiente virtual, cria um
serviço systemd para o Gunicorn e configura o Nginx como proxy reverso para
encaminhar requisições para o Gunicorn e servir o frontend estático.
Banco de Dados (SQLite em Produção):
Para produção, é altamente recomendável migrar do SQLite para um banco de dados
relacional mais robusto como PostgreSQL ou MySQL, especialmente se a PaaS usar
sistemas de arquivos efêmeros. A maioria das PaaS oferece serviços de banco de dados
gerenciados.
Configuração de CORS:
No main.py do backend, a configuração de CORS deve ser ajustada para permitir apenas a
URL do seu frontend em produção:
Python
from flask_cors import CORS
# ...
# Em produção, substitua
CORS(app, resources={r"/api/*": {"origins": "https://sua-url-dofrontend.
com"}})
Variáveis de Ambiente:
Sempre use variáveis de ambiente para configurações sensíveis. As PaaS oferecem
interfaces para isso. Em VPS, você pode usar arquivos .env ou configurar diretamente no
serviço systemd .
