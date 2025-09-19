# Instruções de Login - TrocaJá

## Credenciais de Teste

### Usuário Comum
- **E-mail:** `usuario@teste.com`
- **Senha:** `123456`

### Prestador de Serviço
- **E-mail:** `prestador@teste.com`
- **Senha:** `123456`

## Funcionalidades Implementadas

### 🔐 Tela de Login
- Campos de e-mail e senha com validação
- Botão "Entrar" com loading
- Opção "Lembrar-me"
- Link "Esqueci minha senha" com modal
- Link para cadastro
- Design responsivo com gradiente

### 📝 Tela de Cadastro
- Seleção de tipo de usuário (Usuário/Prestador)
- Campos obrigatórios com validação
- Campos específicos para prestadores (nome da oficina, endereço, CNPJ)
- Validação de senha e confirmação
- Aceite de termos e condições
- Design responsivo

### 👤 Perfil do Usuário
- Exibição dos dados do usuário autenticado
- Configurações do app (notificações, localização, modo escuro)
- Opção de alterar senha
- Botão de logout com confirmação

### 🏠 Navegação Principal
- **Home:** Lista de serviços disponíveis
- **Buscar:** Campo de busca com filtros
- **Agendamentos:** Próximos agendamentos e histórico
- **Veículos:** Listagem de veículos cadastrados
- **Perfil:** Dados pessoais e configurações

## Como Testar

1. **Inicie o projeto:** `ionic serve`
2. **Teste o login** com as credenciais acima
3. **Teste o cadastro** criando uma nova conta
4. **Navegue pelas abas** para ver todas as funcionalidades
5. **Teste o logout** na página de perfil

## Estrutura do Projeto

```
Frontend/src/app/
├── auth/
│   ├── login/          # Tela de login
│   ├── register/       # Tela de cadastro
│   └── auth.module.ts  # Módulo de autenticação
├── services/
│   └── auth.service.ts # Serviço de autenticação
├── tabs/               # Navegação principal
├── home/               # Página inicial
├── buscar/             # Página de busca
├── agendamentos/       # Página de agendamentos
├── veiculos/           # Página de veículos
└── perfil/             # Página de perfil
```

## Próximos Passos

- Integração com API real
- Implementação de guards de rota
- Melhorias na validação de formulários
- Implementação de notificações push
- Testes unitários e de integração
