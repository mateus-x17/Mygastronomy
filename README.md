🍽️ Sistema de Restaurante — Autenticação JWT + MongoDB

📌 Descrição
Sistema completo de gerenciamento para restaurante com foco em autenticação, rotas protegidas e integração com banco de dados não relacional. O projeto foi construído utilizando Node.js, Express e MongoDB com Mongoose, seguindo o padrão MVC. Ideal para controle de usuários, cardápio e restrição de rotas baseadas em níveis de acesso.

🛠️ Tecnologias utilizadas

    Node.js
    
    Express.js
    
    MongoDB
    
    Mongoose (ORM)
    
    JWT (JSON Web Token)
    
    Dotenv
    
    Bcryptjs
    
    Express-validator

🔐 Funcionalidades principais

    🔐 Autenticação de usuários com JWT
    
    🛡️ Proteção de rotas com base em permissões (ex: admin)
    
    👨‍🍳 Cadastro e gerenciamento de funcionários/clientes
    
    🧾 Registro e consulta de pedidos
    
    🍽️ Integração com banco de dados MongoDB
    
    📦 Organização do código no padrão MVC
    
    🧪 Validações com express-validator
    
    🔄 Atualização e deleção de registros

🚀 Como rodar o projeto localmente

    1. Clone o repositório: git clone https://github.com/mateus-x17/seu-repositorio.git
    
    2. Acesse a pasta e instale as dependências:
        cd restaurante-api
        npm install
       
    3. Configure as variáveis de ambiente (.env):
        PORT=3000
        DB_URI=mongodb://localhost:27017/restaurante
        JWT_SECRET=seuTokenSecreto
       
    4. Inicie o servidor: npm run dev
    
    5. Acesse em: http://localhost:3000
