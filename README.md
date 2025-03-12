# Middleman

![Middleman Cover Image](https://placehold.co/1200x600?text=Middleman+Cover+Image)

> The AI-powered bridge between your Lukso blockchain profile and your visitors.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.x-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991)](https://openai.com/)
[![IPFS](https://img.shields.io/badge/Pinata-IPFS-24C0EB)](https://pinata.cloud/)

## 📖 Overview

Middleman is a decentralized application that enhances Lukso blockchain profiles with an AI-powered interactive widget. Users answer AI-generated questions about themselves, which are securely stored on IPFS. Visitors can then interact with a personalized AI assistant that answers questions based on the profile owner's information.

![Middleman Flow Diagram](https://placehold.co/800x400?text=Middleman+Flow+Diagram)

## ✨ Features

### 🤖 AI-Generated Questions

-   Personalized question sets generated via OpenAI
-   Users choose which questions to answer and which to skip
-   Privacy-focused approach where users control their data

### 🧩 Profile Widget

-   Seamlessly integrates with Lukso's grid
-   Lightweight embed that loads fast on any device

![Widget Demo](https://placehold.co/600x400?text=Widget+Demo)

### 💬 Interactive AI Assistant

-   Visitors can ask questions about the profile owner
-   Assistant responds based only on provided information
-   Natural conversational interface using OpenAI's Assistant API

### 🔐 Decentralized Storage

-   All user data stored on IPFS via Pinata
-   User retains complete ownership of their information

## 🛠️ Tech Stack

-   **Frontend**: Next.js, TypeScript, Tailwind CSS
-   **AI**: OpenAI Assistant API
-   **Storage**: IPFS (Pinata)

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   Lukso network access
-   OpenAI API key
-   Pinata API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/almoloo/middleman.git
cd middleman
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_DOMAIN=<http://localhost:3000>
NEXT_PUBLIC_PINATA_GATEWAY=<your_pinata_gateway>
PINATA_GATEWAY_KEY=<your_pinata_gateway_key>
PINATA_API_KEY=<your_pinata_api_key>
PINATA_API_SECRET=<your_pinata_secret_key>
PINATA_JWT=<your_pinata_jwt>
OPENAI_API_KEY=<your_openai_api_key>
OPENAI_GENERATE_QUESTIONS_ASSISTANT=<openai_assistant_id_for_question_generation>
OPENAI_CHATBOT_ASSISTANT=<openai_assistant_id_for_chatboat>
AUTH_SECRET=<generated_by_auth.js>
NEXTAUTH_URL=<http://localhost:3000>
AUTH_GOOGLE_ID=<your_google_id>
AUTH_GOOGLE_SECRET=<your_google_secret>
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔄 Workflow

1. **Setup**: User connects using their Google account and authorizes the application
2. **Question Generation**: AI generates personalized questions for the user
3. **Data Collection**: User answers questions they're comfortable sharing
4. **Storage**: Responses are stored on IPFS
5. **Widget Creation**: User receives embed code for their Lukso profile
6. **Visitor Interaction**: Visitors can query the AI about the profile owner

## 🧪 Development

### Building for Production

```bash
npm run build
# or
yarn build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

-   [Lukso](https://lukso.network/) for the blockchain infrastructure
-   [OpenAI](https://openai.com/) for the AI capabilities
-   [Pinata](https://pinata.cloud/) for IPFS storage solutions
-   [Next.js](https://nextjs.org/) for the front-end framework

---

Built with ❤️ for the decentralized web.
