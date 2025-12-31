// Current sentence and cache
let currentEnglishSentence = '';
let nextSentenceCache = null;

// DOM Elements
const englishSentenceEl = document.getElementById('englishSentence');
const germanInput = document.getElementById('germanInput');
const submitBtn = document.getElementById('submitBtn');
const resultSection = document.getElementById('resultSection');
const evaluationResult = document.getElementById('evaluationResult');
const nextBtn = document.getElementById('nextBtn');
const loading = document.getElementById('loading');

// Initialize
async function init() {
    await loadNewSentence();
    setupEventListeners();
}

async function loadNewSentence() {
    try {
        // Use cached sentence if available
        if (nextSentenceCache) {
            currentEnglishSentence = nextSentenceCache;
            englishSentenceEl.textContent = currentEnglishSentence;
            germanInput.value = '';
            resultSection.style.display = 'none';
            submitBtn.disabled = false;
            nextSentenceCache = null;

            // Pre-fetch next sentence in background
            preloadNextSentence();
            return;
        }

        englishSentenceEl.textContent = 'Loading...';
        submitBtn.disabled = true;

        const response = await fetch('http://localhost:3000/api/generate-sentence');
        const data = await response.json();

        if (data.success) {
            currentEnglishSentence = data.sentence;
            englishSentenceEl.textContent = currentEnglishSentence;
            germanInput.value = '';
            resultSection.style.display = 'none';
            submitBtn.disabled = false;

            // Pre-fetch next sentence in background
            preloadNextSentence();
        } else {
            alert('Error loading sentence: ' + data.error);
        }
    } catch (error) {
        alert('Error connecting to server: ' + error.message);
        englishSentenceEl.textContent = 'Error. Refresh page.';
    }
}

async function preloadNextSentence() {
    try {
        const response = await fetch('http://localhost:3000/api/generate-sentence');
        const data = await response.json();
        if (data.success) {
            nextSentenceCache = data.sentence;
        }
    } catch (error) {
        // Silent fail for background preload
        console.log('Preload failed:', error);
    }
}

function setupEventListeners() {
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleSubmit();
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleNext();
    });

    germanInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    });
}

async function handleSubmit() {
    const germanTranslation = germanInput.value.trim();

    if (!germanTranslation) {
        alert('Please enter your German translation!');
        return;
    }

    // Show loading state on button
    const originalBtnText = submitBtn.querySelector('.btn-text').textContent;
    submitBtn.querySelector('.btn-text').textContent = '...';
    submitBtn.disabled = true;

    try {
        const response = await fetch('http://localhost:3000/api/evaluate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                englishSentence: currentEnglishSentence,
                germanTranslation: germanTranslation
            })
        });

        const data = await response.json();

        if (data.success) {
            evaluationResult.textContent = data.evaluation;
            resultSection.style.display = 'block';
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error connecting to server: ' + error.message);
    } finally {
        submitBtn.querySelector('.btn-text').textContent = originalBtnText;
        submitBtn.disabled = false;
    }
}

async function handleNext() {
    await loadNewSentence();
}

// Initialize app
init();
