require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Get default model endpoint
app.get('/api/config', (req, res) => {
  res.json({
    defaultModel: process.env.DEFAULT_MODEL || 'google/gemini-flash-1.5'
  });
});

// Generate random English sentence endpoint
app.get('/api/generate-sentence', async (req, res) => {
  try {
    const selectedModel = process.env.DEFAULT_MODEL;

    // Add randomness with different topics
    const topics = ['directions', 'food', 'shopping', 'routines', 'weather', 'hobbies', 'travel', 'family', 'work', 'time', 'health', 'sports'];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const randomNum = Math.floor(Math.random() * 10000);

    const prompt = `Write 1 SIMPLE English sentence about ${randomTopic}. Use basic words. 5-10 words max. Beginner level. ${randomNum}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'German Learning App'
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 1.1,
        max_tokens: 30
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenRouter API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const sentence = data.choices[0].message.content.trim();

    res.json({
      success: true,
      sentence: sentence
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// OpenRouter API endpoint
app.post('/api/evaluate', async (req, res) => {
  try {
    const { englishSentence, germanTranslation, model } = req.body;

    // Use provided model or fall back to default
    const selectedModel = model || process.env.DEFAULT_MODEL;

    const prompt = `Evaluate this German translation:

English: "${englishSentence}"
Student's German: "${germanTranslation}"

Provide feedback in this format:
1. ✓ (correct) or ✗ (incorrect)
2. Correct German translation (if student was wrong)
3. Clear explanation of what was right or wrong (grammar, word choice, word order, etc.)

Keep explanations helpful and educational.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'German Learning App'
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.6,
        max_tokens: 250
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenRouter API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const evaluation = data.choices[0].message.content;

    res.json({
      success: true,
      evaluation: evaluation
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
