# German Learning App

A simple web application to practice German translation with AI-powered corrections.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file and add your OpenRouter API key:
```bash
cp .env.example .env
```

Then edit `.env` and add your API key:
```
OPENROUTER_API_KEY=your_actual_api_key_here
PORT=3000
```

3. Start the server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

4. Open your browser and go to: `http://localhost:3000`

## Usage

1. Get your OpenRouter API key from https://openrouter.ai/
2. Browse models at https://openrouter.ai/models and pick one (preferably a free one)
3. Paste the model name in the "AI Model" field (e.g., `google/gemini-flash-1.5`)
4. Translate the English sentence into German
5. Click "Submit Translation" to get AI feedback
6. Read the corrections (in German!)
7. Click "Next Sentence" to practice more

## How it works

- Frontend: Simple HTML/CSS/JavaScript
- Backend: Node.js + Express
- AI: OpenRouter API (supports 500+ models)
