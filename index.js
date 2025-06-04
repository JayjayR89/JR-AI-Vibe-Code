// Import Google Gemini API
import { GoogleGenerativeAI } from '@google/genai';

// Constants
const SETTINGS_STORAGE_KEY = 'vibeCodeSettings';
const API_KEY_STORAGE_KEY = 'geminiApiKey';

// Initialize settings
let settings = loadSettings();
let genAI = null;

// DOM Elements
const geminiApiKeyInput = document.getElementById('geminiApiKey');
const geminiApiToggle = document.getElementById('geminiApiToggle');
const testGeminiKeyButton = document.getElementById('testGeminiKey');
const saveGeminiKeyButton = document.getElementById('saveGeminiKey');

// Load saved API key if exists
const savedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
if (savedApiKey) {
    geminiApiKeyInput.value = savedApiKey;
    initializeGeminiAPI(savedApiKey);
}

// Initialize Gemini API
function initializeGeminiAPI(apiKey) {
    try {
        genAI = new GoogleGenerativeAI(apiKey);
        geminiApiToggle.disabled = false;
        return true;
    } catch (error) {
        console.error('Failed to initialize Gemini API:', error);
        return false;
    }
}

// Test Gemini API Key
async function testGeminiKey() {
    const apiKey = geminiApiKeyInput.value.trim();
    if (!apiKey) {
        alert('Please enter an API key');
        return;
    }

    testGeminiKeyButton.disabled = true;
    testGeminiKeyButton.textContent = 'Testing...';

    try {
        const tempGenAI = new GoogleGenerativeAI(apiKey);
        const model = tempGenAI.getGenerativeModel({ model: 'gemini-pro' });
        
        // Test with a simple prompt
        const result = await model.generateContent('Test message');
        const response = await result.response;
        
        if (response.text()) {
            alert('API key is valid!');
            geminiApiToggle.disabled = false;
        } else {
            throw new Error('Invalid response');
        }
    } catch (error) {
        console.error('API key test failed:', error);
        alert('Invalid API key or API error');
        geminiApiToggle.disabled = true;
        geminiApiToggle.checked = false;
    } finally {
        testGeminiKeyButton.disabled = false;
        testGeminiKeyButton.textContent = 'Test Key';
    }
}

// Save Gemini API Key
function saveGeminiKey() {
    const apiKey = geminiApiKeyInput.value.trim();
    if (!apiKey) {
        alert('Please enter an API key');
        return;
    }

    try {
        localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
        if (initializeGeminiAPI(apiKey)) {
            alert('API key saved successfully!');
            geminiApiToggle.disabled = false;
        } else {
            throw new Error('Failed to initialize API');
        }
    } catch (error) {
        console.error('Failed to save API key:', error);
        alert('Failed to save API key');
        geminiApiToggle.disabled = true;
        geminiApiToggle.checked = false;
    }
}

// Handle Gemini API Toggle
function handleGeminiToggle(event) {
    const isEnabled = event.target.checked;
    settings.geminiEnabled = isEnabled;
    saveSettings();
}

// Load settings from localStorage
function loadSettings() {
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    return savedSettings ? JSON.parse(savedSettings) : {
        geminiEnabled: false,
        darkMode: false,
        tooltips: true,
        autoCheckpoint: false,
        appMemory: true,
        fileContext: false
    };
}

// Save settings to localStorage
function saveSettings() {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

// Event Listeners
testGeminiKeyButton.addEventListener('click', testGeminiKey);
saveGeminiKeyButton.addEventListener('click', saveGeminiKey);
geminiApiToggle.addEventListener('change', handleGeminiToggle);

// Initialize toggle state from settings
geminiApiToggle.checked = settings.geminiEnabled;

// Export for use in other modules
export { genAI, settings };