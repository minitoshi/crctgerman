# Deutsch Meister — German Learning App

A web application to practice German translation with AI-powered corrections and feedback.

## 🌐 Live Demo

**Try it here:** [https://crctgerman-production.up.railway.app](https://crctgerman-production.up.railway.app)

## ✨ Features

- 🎲 **Random Sentence Generation** - AI generates new practice sentences
- ✍️ **Translation Practice** - Translate English sentences to German
- 🤖 **AI Feedback** - Get instant corrections and explanations
- 🎨 **Beautiful UI** - Clean, modern design with smooth animations
- ⚡ **Fast & Responsive** - Optimized performance with smart caching

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

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Backend:** Node.js, Express
- **AI:** OpenRouter API (supports 500+ models)
- **Deployment:** Railway
- **Fonts:** Crimson Pro, Work Sans

## 🚀 Local Development

1. Clone the repository:
```bash
git clone https://github.com/minitoshi/crctgerman.git
cd crctgerman
```

2. Install dependencies and set up environment variables (see Setup section above)

3. Run locally:
```bash
npm start
```

## 📝 How to Use

1. Visit the [live site](https://crctgerman-production.up.railway.app)
2. Read the English sentence provided
3. Type your German translation
4. Click **"Prüfen"** to get AI feedback
5. Read the corrections and explanations
6. Click **"Nächster Satz"** for a new sentence

## 🎯 Project Goals

This app helps beginners practice German translation with:
- Simple, everyday sentences
- Immediate AI feedback
- Clear explanations of errors
- Unlimited practice sentences
