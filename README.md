# 🎬 Cubos Movies - Frontend

Uma aplicação moderna de catálogo de filmes desenvolvida com React, TypeScript e Tailwind CSS, integrada com backend Node.js.

## 🚀 Sobre o Projeto

O Cubos Movies é uma plataforma completa para gerenciamento e visualização de filmes, onde usuários podem:

- 🔐 **Autenticar-se** com sistema de login/cadastro seguro
- 🎥 **Explorar filmes** com interface moderna e responsiva
- 🔍 **Filtrar conteúdo** por título, gênero e outros critérios
- 📱 **Navegar facilmente** em dispositivos móveis e desktop
- 🌙 **Alternar tema** entre claro e escuro
- 📄 **Paginar resultados** para melhor performance

## ✨ Funcionalidades Implementadas

### 🔐 Autenticação

- ✅ **Login** com email/senha
- ✅ **Cadastro** de novos usuários
- ✅ **JWT Token** com renovação automática
- ✅ **Logout** com limpeza de sessão
- ✅ **Rotas protegidas** para usuários autenticados

### 🎬 Gestão de Filmes

- ✅ **Listagem** de filmes com paginação (10 por página)
- ✅ **Detalhes** completos de cada filme
- ✅ **Filtros avançados** por título e gênero
- ✅ **Aplicação manual** de filtros (otimização de API)
- ✅ **Remoção individual** de filtros aplicados
- ✅ **Layout responsivo** para mobile e desktop

### 🎨 Interface & UX

- ✅ **Design moderno** com Tailwind CSS
- ✅ **Tema escuro/claro** com persistência
- ✅ **Componentes reutilizáveis** e modulares
- ✅ **Loading states** e feedback visual
- ✅ **Mobile-first responsive design**
- ✅ **Touch targets otimizados** para mobile

## 🛠️ Tecnologias Utilizadas

- **⚡ React 18** - Biblioteca para interfaces
- **📘 TypeScript** - Tipagem estática
- **🎨 Tailwind CSS** - Framework CSS utilitário
- **⚡ Vite** - Build tool moderna e rápida
- **🌐 Axios** - Cliente HTTP para API
- **🧭 React Router DOM** - Roteamento SPA
- **🔧 Context API** - Gerenciamento de estado global

## 📋 Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **Backend Cubos Movies** rodando na porta 3001

## 🚀 Como Instalar e Rodar

1. **Clone o repositório:**

   ```bash
   git clone [seu-repositorio]
   cd cubos-frontend
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Certifique-se que o backend está rodando:**

   ```bash
   cd ../cubos-backend
   npm run dev
   ```

4. **Inicie o frontend:**

   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**
   ```
   http://localhost:5173
   ```

## 🔐 Credenciais de Teste

Para testar a aplicação, use as seguintes credenciais:

- **📧 Email:** `admin@exemplo.com`
- **🔑 Senha:** `123456`

## 🗂️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── FilterModal.tsx  # Modal de filtros
│   ├── Header.tsx       # Cabeçalho com nav
│   ├── MovieCard.tsx    # Card de filme
│   ├── Pagination.tsx   # Paginação
│   ├── ThemeToggle.tsx  # Alternador de tema
│   └── icons/           # Ícones SVG
├── contexts/            # Contexts do React
│   ├── AuthContext.tsx  # Autenticação global
│   └── ThemeContext.tsx # Tema global
├── pages/               # Páginas da aplicação
│   ├── Home.tsx         # Lista de filmes
│   ├── Login.tsx        # Tela de login
│   ├── Register.tsx     # Tela de cadastro
│   ├── MovieDetails.tsx # Detalhes do filme
│   └── ForgotPassword.tsx # Recuperar senha
├── services/            # Integração com APIs
│   └── api.ts           # Cliente Axios
├── types/               # Definições TypeScript
│   └── index.ts         # Interfaces globais
└── assets/              # Imagens e SVGs
```

## 🌐 Integração com Backend

O frontend consome as seguintes APIs do backend:

### 🔐 Autenticação

- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Cadastro de usuário
- `GET /api/auth/verify` - Verificar token
- `POST /api/auth/logout` - Logout

### 🎬 Filmes

- `GET /api/movies` - Listar filmes com filtros e paginação
- `GET /api/movies/:id` - Buscar filme por ID
- `GET /api/movies/utils/genres` - Listar gêneros

**Exemplo de requisição:**

```javascript
// Buscar filmes com filtros
const response = await moviesAPI.getMovies({
  page: 1,
  limit: 10,
  search: "avatar",
  genre: 878,
});
```

## 📱 Recursos Responsivos

### 📱 Mobile (< 640px)

- **Menu hamburger** no header
- **Filtros em modal** full-screen
- **Cards empilhados** verticalmente
- **Botões full-width** nos formulários
- **Touch targets** de 44px mínimo

### 💻 Desktop (≥ 640px)

- **Menu horizontal** no header
- **Filtros inline** na página
- **Grid de cards** com múltiplas colunas
- **Hover effects** nos elementos interativos

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Linting do código
npm run lint
```

## 🤝 Como Contribuir

1. Faça um **fork** do projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ por [Seu Nome]**
