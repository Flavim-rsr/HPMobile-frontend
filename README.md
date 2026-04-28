# HelpTap Mobile

Aplicativo mobile desenvolvido em **React Native com Expo** para cadastro, login, consulta de clima e navegação por funcionalidades de perfil/contato. O projeto consome uma API externa hospedada no Render.

## Funcionalidades

- Cadastro de paciente.
- Login com email e senha.
- Menu principal com saudação do usuário.
- Consulta de clima atual.
- Tela de dados pessoais.
- Tela de contato de emergência.
- Formatação automática de CPF, data de nascimento e telefone.
- Ajuste de layout para o teclado não cobrir os inputs.

## Tecnologias Utilizadas

- React Native
- Expo SDK 54
- Expo Router
- TypeScript
- React 19
- Fetch API
- EAS Build
- Ionicons / Expo Vector Icons

## Pré-requisitos

Antes de rodar o projeto, instale:

- Node.js
- npm
- Expo Go no celular, para testar em desenvolvimento
- Conta Expo, caso queira gerar APK com EAS Build

Verifique as versões instaladas:

```bash
node -v
npm -v
```

## Instalação

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd HPMobile-frontend
```

Instale as dependências:

```bash
npm install
```

## Executando o Projeto

Inicie o Expo:

```bash
npx expo start
```

Se quiser limpar cache:

```bash
npx expo start -c
```

Se o celular e o notebook estiverem na mesma rede Wi-Fi:

```bash
npx expo start -c --lan --port 8081
```

Se estiver com problema de rede local, use túnel:

```bash
npx expo start -c --tunnel
```

Depois, escaneie o QR Code com o aplicativo **Expo Go**.

## Scripts Disponíveis

```bash
npm start
```

Inicia o servidor Expo.

```bash
npm run android
```

Inicia o projeto tentando abrir em um dispositivo/emulador Android.

```bash
npm run ios
```

Inicia o projeto tentando abrir em um simulador iOS.

```bash
npm run typecheck
```

Executa a verificação de tipos do TypeScript.

## API

## API

O aplicativo mobile se conecta ao backend **HPWeather-backEnd** ([repositório do backend](https://github.com/RafaelAndrade25/HPWeather-backEnd)), desenvolvido com Java 21, Spring Boot 3 e PostgreSQL. O backend fornece o gerenciamento de usuários, a autenticação e a integração com a API de clima Open-Meteo.

Base URL:

```text
https://hpweather-backend.onrender.com
```

**Resumo do Consumo do Backend:**
- **Autenticação e Usuários:** O sistema utiliza tokens JWT para segurança. O app realiza o login em `/api/auth/web/login` (ou `/api/auth/mobile/login`) para obter o token, que deve ser enviado no header `Authorization: Bearer <token>` em requisições protegidas. O cadastro de usuários ocorre no endpoint `/api/users`.
- **Clima / Tempo:** Ao chamar a rota `/api/weather?latitude={lat}&longitude={lon}`, o backend consome internamente a API aberta do **Open-Meteo** e repassa os dados da previsão e estado atual do clima para o aplicativo mobile.

Endpoints utilizados:

```text
POST /api/users
POST /api/auth/web/login
GET  /api/weather?latitude=-23.5505&longitude=-46.6333
```

### Cadastro

Payload enviado no cadastro:

```json
{
  "fullName": "Nome do paciente",
  "cpf": "00000000000",
  "dateBirth": "1995-04-08",
  "email": "email@exemplo.com",
  "password": "senha",
  "identifier": "00000000000",
  "role": "PATIENT"
}
```

A role fica fixa como `PATIENT`. O campo `identifier` é gerado pelo app usando o CPF sem pontuação.

### Login

Payload enviado no login:

```json
{
  "email": "email@exemplo.com",
  "password": "senha"
}
```

### Clima

O app consulta o endpoint de clima e exibe:

- Temperatura atual
- Dia/noite
- Código do clima
- Velocidade do vento
- Direção do vento
- Horário da medição
- Coordenadas retornadas

## Arquitetura da Aplicação

O projeto usa uma arquitetura simples baseada em telas, componentes reutilizáveis e serviços.

```text
HPMobile-frontend/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── register-step-1.tsx
│   ├── register-step-2.tsx
│   ├── main-menu.tsx
│   ├── personal-data.tsx
│   ├── emergency-contact.tsx
│   └── weather.tsx
├── assets/
│   └── images/
├── src/
│   ├── components/
│   ├── constants/
│   ├── services/
│   ├── theme/
│   └── utils/
├── app.json
├── eas.json
├── package.json
└── tsconfig.json
```

### Camadas

**app/**

Contém as telas e rotas do Expo Router.

**src/components/**

Componentes visuais reutilizáveis, como botões, inputs, cards, header e textos.

**src/services/**

Serviços de integração com a API, controle simples de sessão e dados temporários.

**src/theme/**

Cores, espaçamentos, tipografia, sombras e radius usados na interface.

**src/utils/**

Funções utilitárias para formatação de CPF, telefone, data e mensagens de erro.

## Desenho da Arquitetura

```text
Usuário
  |
  v
Telas Expo Router (app/)
  |
  v
Componentes Compartilhados (src/components/)
  |
  v
Serviços da Aplicação (src/services/)
  |
  v
API HelpTap / Render
```

Fluxo principal:

```text
Cadastro/Login
  -> API
  -> Sessão local em memória
  -> Menu principal
  -> Funcionalidades: Dados Pessoais, Contato de Emergência, Clima
```

## Versionamento

O código-fonte está versionado com Git.

Comandos úteis:

```bash
git status
git add .
git commit -m "feat: implement registration, login, and weather API"
```

Arquivos e pastas locais como `node_modules`, `.expo`, `.codex`, builds e APKs são ignorados no `.gitignore`.

## Gerando APK

Faça login no EAS:

```bash
npx eas-cli login
```

Gere o APK:

```bash
npx eas-cli build -p android --profile preview
```

Ao finalizar, o EAS vai gerar um link para download do APK.

## Prints da Aplicação

Adicione aqui os prints do app depois:

```text
assets/docs/print-home.png
assets/docs/print-login.png
assets/docs/print-cadastro.png
assets/docs/print-menu.png
assets/docs/print-clima.png
```

Exemplo de uso no README:

```md
![Tela inicial](assets/docs/print-home.png)
![Tela de login](assets/docs/print-login.png)
![Tela de cadastro](assets/docs/print-cadastro.png)
![Menu principal](assets/docs/print-menu.png)
![Tela de clima](assets/docs/print-clima.png)
```

## Link para Download do APK

Adicione aqui o link do Google Drive depois que o APK for gerado:

```text
Link do APK: <ADICIONAR_LINK_DO_GOOGLE_DRIVE>
```

## Observações

- Para testar no Expo Go, o celular e o computador devem estar na mesma rede Wi-Fi.
- Caso a rede local bloqueie a conexão, use `npx expo start -c --tunnel`.
- O backend hospedado no Render pode demorar alguns segundos na primeira requisição caso esteja em cold start.
