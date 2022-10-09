# OpenResponse

🧠💻 This project is a small prompt-completion application built with Open-AI's GPT-3 (DaVinci) and Next.js. Users can enter prompts of any complexity and expect a response in text form. This application does not collect or store any data.

## Technology

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). React is used as the front-end library for creating UI components. Routing and node requests + API building are handled by Next.js. 

## Installation

### Getting Environment Variables for OpenAI's API

OpenAI provides new users with $18.00 in free credits to be used in their first 3 months across their product lineup, including GPT-3 and Codex. [Visit their site](https://openai.com/api/) and sign up to acquire a key.

This will be used to authenticate access to OpenAI's API.

Change directory into the project's root and create a `.env` file.

```bash
cd OpenResponse
touch .env
```

Add the key to your `.env` file.

```
OPENAI_API_KEY=YOUR_API_KEY_HERE
```

While in the project's root folder, install dependencies.

```bash
npm i
```

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
