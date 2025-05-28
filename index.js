
import { GoogleGenAI } from "@google/genai";

document.addEventListener('DOMContentLoaded', () => {
    // --- Element Caching ---
    const getElem = (id) => document.getElementById(id);
    const querySel = (selector) => document.querySelector(selector);
    
    const loginButton = getElem('loginButton');
    const logoutButton = getElem('logoutButton');
    const userInfo = getElem('userInfo');
    const usernameContainer = getElem('usernameContainer');
    const authContainer = getElem('authContainer');
    const modelSelect = getElem('modelSelect');
    const puterModelLabel = querySel('.puter-model-label');
    const geminiModelLabelElement = getElem('geminiModelLabel');
    const settingsButton = getElem('settingsButton');
    const settingsModal = getElem('settingsModal');
    const closeSettingsModal = getElem('closeSettingsModal');
    const closeSettingsModalFooter = getElem('closeSettingsModalFooter');
    const darkModeToggle = getElem('darkModeToggle');
    const tooltipsToggle = getElem('tooltipsToggle');
    const geminiApiToggle = getElem('geminiApiToggle');
    const modelListContainer = getElem('modelListContainer');
    const saveModelsButton = getElem('saveModelsButton');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const appVersionSpan = getElem('appVersion');
    const appProjectNameInput = getElem('appProjectNameInput');
    const toggleAiToolsPanelButton = getElem('toggleAiToolsPanel');
    const aiToolsContent = getElem('aiToolsContent');
    const generatePromptInput = getElem('generatePromptInput');
    const generateMicrophoneButton = getElem('generateMicrophoneButton');
    const generateCodeButton = getElem('generateCodeButton');
    const generatedPromptDisplay = getElem('generatedPromptDisplay');
    const displayedGeneratePrompt = getElem('displayedGeneratePrompt');
    const editInitialPromptButton = getElem('editInitialPromptButton');
    const aiToolsSection1Content = getElem('aiToolsSection1Content');
    const aiToolsSection2 = getElem('aiToolsSection2');
    const modifyPromptInput = getElem('modifyPromptInput');
    const modifyMicrophoneButton = getElem('modifyMicrophoneButton');
    const modifyCodeButton = getElem('modifyCodeButton');
    const aiToolsSection3 = getElem('aiToolsSection3');
    const selectElementButton = getElem('selectElementButton'); // Main panel select button
    const elementEditorControls = getElem('elementEditorControls'); // Main panel editor
    const selectedElementIdentifier = getElem('selectedElementIdentifier');
    const elementTextContentInput = getElem('elementTextContent');
    const elementColorInput = getElem('elementColor');
    const elementBgColorInput = getElem('elementBgColor');
    const elementWidthInput = getElem('elementWidth');
    const elementHeightInput = getElem('elementHeight');
    const elementPaddingInput = getElem('elementPadding');
    const elementMarginInput = getElem('elementMargin');
    const elementPositionSelect = getElem('elementPosition');
    const elementDisplaySelect = getElem('elementDisplay');
    const elementBorderInput = getElem('elementBorder');
    const editElementPromptInput = getElem('editElementPromptInput');
    const saveManualElementChangesButton = getElem('saveManualElementChangesButton');
    const applyElementAIEditButton = getElem('applyElementAIEditButton');
    const codeOutput = querySel('#codeOutput code');
    const selectElementsToggle = getElem('selectElementsToggle'); // Preview panel header toggle
    const popOutButton = getElem('popOutButton');
    const fullscreenButton = getElem('fullscreenButton');
    const previewFrame = getElem('previewFrame');
    const createCheckpointButton = getElem('createCheckpointButton');
    const viewRestoreCheckpointsButton = getElem('viewRestoreCheckpointsButton');
    const checkpointsStatus = getElem('checkpointsStatus');
    const autoCreateCheckpointToggle = getElem('autoCreateCheckpointToggle');
    const restoreCheckpointsModal = getElem('restoreCheckpointsModal');
    const closeRestoreCheckpointsModal = getElem('closeRestoreCheckpointsModal');
    const checkpointsListContainer = getElem('checkpointsListContainer');
    const noCheckpointsMessage = getElem('noCheckpointsMessage');
    const cancelRestoreCheckpointButton = getElem('cancelRestoreCheckpointButton');
    const downloadHtmlLink = getElem('downloadHtml');
    const downloadZipLink = getElem('downloadZip');

    const APP_VERSION = '1.0.5'; 
    if(appVersionSpan) appVersionSpan.textContent = APP_VERSION;

    // --- State & Constants ---
    const GEMINI_TEXT_MODEL = 'gemini-2.5-flash-preview-04-17';
    let useGeminiAPI = false;
    let googleAi = null;
    let checkpoints = [];
    let popOutWindow = null;
    let currentSelectedElementSelector = null; 
    let isMainAppSelectingElement = false; 
    let recognition = null;
    const allModels = [ 
        'claude-sonnet-4', 'claude-opus-4', 'claude-3-7-sonnet', 'claude-3-5-sonnet',
        'gpt-4o-mini', 'gpt-4o', 'gpt-4.1', 'gpt-4.1-mini', 
        'deepseek-chat', 'deepseek-reasoner',
        'google/gemini-2.5-pro-exp-03-25:free', 'google/gemini-2.5-flash-preview', 
        'gemini-1.5-flash', 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
        'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo', 'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo',
        'mistral-large-latest', 'codestral-latest'
    ];

    // --- Utility Functions ---
    const escapeHTML = (str) => str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag]));
    const rgbToHex = (rgb) => {
        if (!rgb || typeof rgb !== 'string' || !rgb.startsWith('rgb')) return null;
        const match = rgb.match(/\d+/g);
        if (!match) return null;
        const [r, g, b] = match.map(Number);
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    };
    function getElementBySelector(doc, selector) {
        if (!doc || !selector) return null;
        try {
            return doc.querySelector(selector);
        } catch (e) {
            console.warn("Failed to get element by selector:", selector, e);
            return null;
        }
    }

    // --- Gemini API Initialization ---
    function initializeGeminiClient() {
        if (process.env.API_KEY) {
            try {
                googleAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
                console.log("GoogleGenAI client initialized.");
                return true;
            } catch (e) {
                console.error("Failed to initialize GoogleGenAI client:", e);
                alert("Failed to initialize Gemini API. Please ensure API_KEY is (pre-)configured correctly. Falling back to Puter API.");
                return false;
            }
        } else {
            console.warn("Google Gemini API Key (process.env.API_KEY) not found. Gemini API will be unavailable.");
            alert("Gemini API key not found. Please ensure it is (pre-)configured. Falling back to Puter API.");
            return false;
        }
    }
    
    // --- API Usage Management ---
    function updateApiUsageUI() {
        authContainer.classList.toggle('hidden', useGeminiAPI);
        modelSelect.classList.toggle('hidden', useGeminiAPI);
        if (puterModelLabel) puterModelLabel.classList.toggle('hidden', useGeminiAPI);
        geminiModelLabelElement.classList.toggle('hidden', !useGeminiAPI);
        if (useGeminiAPI) {
            geminiModelLabelElement.textContent = `Model: ${GEMINI_TEXT_MODEL}`;
        }
        try { localStorage.setItem('useGeminiAPI', JSON.stringify(useGeminiAPI)); } 
        catch (e) { console.warn("Could not save Gemini API preference to localStorage:", e); }
    }

    // --- Speech Recognition ---
    function setupSpeechRecognition() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (window.SpeechRecognition) {
            recognition = new SpeechRecognition();
            recognition.continuous = false; recognition.lang = 'en-US'; recognition.interimResults = false;
            recognition.onerror = (event) => { console.error('Speech recognition error:', event.error); alert(`Speech recognition error: ${event.error}`); };
        } else {
            console.warn('Speech Recognition API not supported.');
            [generateMicrophoneButton, modifyMicrophoneButton].forEach(btn => { if(btn) { btn.disabled = true; btn.title = "Speech recognition not supported"; }});
        }
    }
    function startDictation(targetInputElement) {
        if (!recognition) return alert('Speech recognition is not available.');
        recognition.onresult = (event) => { targetInputElement.value = event.results[0][0].transcript; };
        try { recognition.start(); } 
        catch(e) { console.error("Error starting speech recognition:", e); alert("Could not start speech recognition."); }
    }

    // --- Authentication (Puter) ---
    async function checkAuthStatus() {
        try {
            const isSignedIn = await puter.auth.isSignedIn();
            updateAuthUI(isSignedIn);
            if (isSignedIn) { const user = await puter.auth.getUser(); if (usernameContainer) usernameContainer.textContent = user.username; }
        } catch (error) { console.error("Error checking auth status:", error); updateAuthUI(false); }
    }
    function updateAuthUI(isSignedIn) {
        if (loginButton) loginButton.classList.toggle('hidden', isSignedIn);
        if (userInfo) userInfo.classList.toggle('hidden', !isSignedIn);
        if (!isSignedIn && usernameContainer) usernameContainer.textContent = '';
    }

    // --- Settings, Theme, Tooltips ---
    function applyTheme(theme) {
        document.body.className = theme + '-mode';
        if (darkModeToggle) darkModeToggle.checked = theme === 'dark';
        try { localStorage.setItem('theme', theme); } 
        catch (e) { console.warn("Could not save theme to localStorage:", e); }
        
        const currentCode = codeOutput.textContent;
        const isError = currentCode.toLowerCase().startsWith("error");
        const placeholderMessage = isError ? currentCode : (currentCode.startsWith("No code generated yet.") ? "Preview will appear here" : "");
        
        if (placeholderMessage) updatePreviewFramePlaceholder(placeholderMessage, isError);
        else updatePreviewFrameAndPopout(previewFrame.srcdoc || currentCode);

        // If popout exists and has its UI, tell it to update its styles
        if (popOutWindow && !popOutWindow.closed && popOutWindow.setupPopOutSpecificUI) {
            popOutWindow.setupPopOutSpecificUI(); 
        }
    }
    
    function populateModelList() { 
        if (!modelListContainer) return;
        modelListContainer.innerHTML = '';
        const currentDropdownModels = getSavedDropdownModels();
        allModels.forEach(model => {
            const div = document.createElement('div');
            const checkboxId = `model-checkbox-${model.replace(/[\/\.:-]/g, '_')}`;
            div.innerHTML = `<input type="checkbox" id="${checkboxId}" value="${model}" ${currentDropdownModels.includes(model) ? 'checked' : ''}><label for="${checkboxId}">${model}</label>`;
            modelListContainer.appendChild(div);
        });
    }
    function getSavedDropdownModels() {
        let saved; try { saved = localStorage.getItem('selectedModelsForDropdown'); } catch (e) { saved = null; }
        const defaultModels = ['gpt-4o-mini', 'claude-3-5-sonnet', 'google/gemini-2.5-flash-preview'];
        if (saved) { try { const parsed = JSON.parse(saved); return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultModels; } catch { /* fallback */ } }
        return defaultModels;
    }
    function saveDropdownModels(models) {
        try { localStorage.setItem('selectedModelsForDropdown', JSON.stringify(models)); } 
        catch (e) { console.warn("Could not save Puter model selection to localStorage:", e); }
    }
    function populateModelDropdown() {
        if (!modelSelect) return;
        modelSelect.innerHTML = '';
        const modelsToDisplay = getSavedDropdownModels();
        modelsToDisplay.forEach(model => { const option = document.createElement('option'); option.value = model; option.textContent = model; modelSelect.appendChild(option); });
        let lastSelected; try { lastSelected = localStorage.getItem('lastSelectedModel'); } catch (e) { lastSelected = null; }
        modelSelect.value = (lastSelected && modelsToDisplay.includes(lastSelected)) ? lastSelected : modelsToDisplay[0];
    }

    function applyTooltipsSetting(enable) {
        const tooltipMap = {
            'loginButton': 'Login with your Puter.com account.',
            'logoutButton': 'Logout from your Puter.com account.',
            'settingsButton': 'Open application settings.',
            'appProjectNameInput': 'Set the name for your project (used for downloads).',
            'downloadButton': 'Download your project files.',
            'downloadHtml': 'Download the current HTML file.',
            'downloadZip': 'Download project as a ZIP (includes HTML, and future assets).',
            'toggleAiToolsPanel': 'Toggle visibility of the AI Tools panel.',
            'generatePromptInput': 'Describe the UI you want to create.',
            'generateMicrophoneButton': 'Use voice to input your UI description.',
            'generateCodeButton': 'Generate HTML code based on your description.',
            'editInitialPromptButton': 'Edit your initial UI description.',
            'modifyPromptInput': 'Describe changes to the existing UI.',
            'modifyMicrophoneButton': 'Use voice to describe UI modifications.',
            'modifyCodeButton': 'Apply described modifications to the code.',
            'selectElementButton': 'Enter mode to select an element in the preview for editing.',
            'autoCreateCheckpointToggle': 'If enabled, a checkpoint is automatically saved before each AI generation or modification.',
            'createCheckpointButton': 'Manually save the current code state as a checkpoint.',
            'viewRestoreCheckpointsButton': 'View and restore previously saved checkpoints.',
            'filesButton': 'Manage project files (feature placeholder).',
            'selectElementsToggle': 'Toggle element selection mode in the live preview.',
            'popOutButton': 'Open the live preview in a new resizable window.',
            'fullscreenButton': 'View the live preview in fullscreen mode.',
            'darkModeToggle': 'Toggle between dark and light UI themes.',
            'tooltipsToggle': 'Enable or disable these helpful tooltips.',
            'geminiApiToggle': 'Use Google Gemini API for AI tasks (requires API_KEY). Disables Puter model selection.',
            'saveModelsButton': 'Save your preferred Puter.com models for the dropdown.',
            'appMemoryToggle': 'Retain chat history for context (Puter AI).',
            'fileContextToggle': 'Allow AI to consider project files for context (Experimental).',
        };
        for (const id in tooltipMap) {
            const element = getElem(id);
            if (element) {
                element.title = enable ? tooltipMap[id] : '';
            }
        }
         try { localStorage.setItem('tooltipsEnabled', JSON.stringify(enable)); }
         catch (e) { console.warn("Could not save tooltips preference to localStorage:", e); }
    }
    
    // --- Checkpoints ---
    function createCheckpoint(reason = "Manual") {
        const currentCode = codeOutput.textContent;
        const currentPrompt = displayedGeneratePrompt.textContent || generatePromptInput.value || "N/A";
        const timestamp = new Date();
        const checkpoint = { id: timestamp.getTime(), code: currentCode, prompt: currentPrompt, timestamp: timestamp.toISOString(), reason: reason };
        checkpoints.unshift(checkpoint); 
        if (checkpoints.length > 10) checkpoints.pop(); 
        try { localStorage.setItem('codeCheckpoints', JSON.stringify(checkpoints)); } 
        catch (e) { console.warn("Failed to save checkpoints to localStorage:", e); }
        updateCheckpointsStatus();
        console.log(`Checkpoint created (${reason}): ${timestamp.toLocaleTimeString()}`);
    }
    function loadCheckpoints() {
        try { const storedCheckpoints = localStorage.getItem('codeCheckpoints'); if (storedCheckpoints) checkpoints = JSON.parse(storedCheckpoints); } 
        catch (e) { console.warn("Failed to load checkpoints from localStorage:", e); checkpoints = []; }
        updateCheckpointsStatus();
    }
    function updateCheckpointsStatus() {
        if (!checkpointsStatus) return;
        if (checkpoints.length === 0) checkpointsStatus.textContent = "No checkpoints created yet.";
        else checkpointsStatus.textContent = `${checkpoints.length} checkpoint${checkpoints.length === 1 ? '' : 's'} available. Last: ${new Date(checkpoints[0].timestamp).toLocaleTimeString()}`;
    }
    function showCheckpointsModal() {
        if (!checkpointsListContainer || !restoreCheckpointsModal || !noCheckpointsMessage) return;
        checkpointsListContainer.innerHTML = ''; 
        if (checkpoints.length === 0) {
            noCheckpointsMessage.classList.remove('hidden');
        } else {
            noCheckpointsMessage.classList.add('hidden');
            checkpoints.forEach(cp => {
                const item = document.createElement('div');
                item.classList.add('checkpoint-list-item');
                item.setAttribute('role', 'button');
                item.setAttribute('tabindex', '0');
                item.innerHTML = `<strong>${escapeHTML(cp.reason)}</strong> - <span class="timestamp">${new Date(cp.timestamp).toLocaleString()}</span>
                                  <p style="font-size:0.8em; opacity: 0.7; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${escapeHTML(cp.prompt)}">Prompt: ${escapeHTML(cp.prompt.substring(0,50))}...</p>`;
                item.addEventListener('click', () => restoreCheckpoint(cp.id));
                item.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') restoreCheckpoint(cp.id); });
                checkpointsListContainer.appendChild(item);
            });
        }
        restoreCheckpointsModal.classList.remove('hidden');
    }
    function restoreCheckpoint(id) {
        const checkpoint = checkpoints.find(cp => cp.id === id);
        if (checkpoint) {
            codeOutput.textContent = checkpoint.code;
            updatePreviewFrameAndPopout(checkpoint.code);

            if (checkpoint.prompt && checkpoint.prompt !== "N/A") {
                generatePromptInput.value = checkpoint.prompt; // Restore prompt to input
                displayedGeneratePrompt.textContent = checkpoint.prompt; // Also display it
                aiToolsSection1Content.classList.add('hidden');
                generatedPromptDisplay.classList.remove('hidden');
                aiToolsSection2.classList.remove('hidden');
                aiToolsSection3.classList.remove('hidden');
            } else { 
                generatePromptInput.value = ''; // Clear if no prompt was saved with this checkpoint (e.g. manual save before any generation)
                displayedGeneratePrompt.textContent = '';
                aiToolsSection1Content.classList.remove('hidden');
                generatedPromptDisplay.classList.add('hidden');
                aiToolsSection2.classList.add('hidden');
                aiToolsSection3.classList.add('hidden');
            }
            alert(`Restored checkpoint from ${new Date(checkpoint.timestamp).toLocaleTimeString()}`);
        } else {
            alert("Failed to find checkpoint.");
        }
        if (restoreCheckpointsModal) restoreCheckpointsModal.classList.add('hidden');
    }
    
    // --- AI & Code Generation ---
    function extractHtmlContent(aiResponseText) {
        const htmlBlockRegex = /```html\s*([\s\S]*?)\s*```/i;
        const match = aiResponseText.match(htmlBlockRegex);
        if (match && match[1]) return match[1].trim();
        const trimmedResponse = aiResponseText.trim();
        if (trimmedResponse.toLowerCase().startsWith('<!doctype html>') || trimmedResponse.toLowerCase().startsWith('<html')) return trimmedResponse;
        return trimmedResponse; 
    }
    async function handleCodeGeneration(prompt, button, puterSystemPrompt, inputToClear = null, isModification = false) {
        if (!prompt) return alert("Please provide a prompt.");
        const currentCodeContent = codeOutput.textContent;
        if (isModification && (!currentCodeContent || currentCodeContent.startsWith("No code generated yet."))) return alert("No valid code to modify. Please generate an app first.");
        if (autoCreateCheckpointToggle.checked) createCheckpoint(isModification ? "Auto before modification" : "Auto before generation");

        const originalButtonText = button.textContent; button.textContent = 'Thinking...'; button.disabled = true;
        updatePreviewFramePlaceholder("Generating code...");
        let generatedCodeText;

        if (useGeminiAPI) {
            if (!googleAi) { alert("Gemini API selected, but client not initialized."); button.textContent = originalButtonText; button.disabled = false; updatePreviewFramePlaceholder("Gemini API not ready.", true); return; }
            let geminiContents;
            const currentCodeForModification = currentCodeContent.startsWith("No code generated yet.") ? "" : currentCodeContent;
            if (isModification) { 
                if (!currentCodeForModification) { alert("No code to modify with Gemini."); button.textContent = originalButtonText; button.disabled = false; updatePreviewFramePlaceholder("Nothing to modify.", true); return; }
                geminiContents = `You are an expert web developer. Modify the following HTML code based on the user's request. Return ONLY the full, complete, runnable, modified HTML code, starting with \`<!DOCTYPE html>\` or \`<html>\`.\n\nExisting HTML Code:\n\`\`\`html\n${currentCodeForModification}\n\`\`\`\n\nUser's modification request: ${prompt}`;
            } else { geminiContents = `You are an expert web developer. Generate a complete, single, runnable HTML file based on the user's request. The HTML must include all necessary CSS and JavaScript. The output should ONLY be the raw HTML code, starting with \`<!DOCTYPE html>\` or \`<html>\`.\n\nUser's request: ${prompt}`; }
            try { const response = await googleAi.models.generateContent({ model: GEMINI_TEXT_MODEL, contents: geminiContents }); generatedCodeText = response.text; } 
            catch (error) { console.error("Gemini AI Error:", error); const errMsg = error.message || "Unknown Gemini AI error."; alert(`Failed code gen with Gemini. ${errMsg}`); codeOutput.textContent = `Error (Gemini): ${errMsg}`; updatePreviewFrameAndPopout(`Error (Gemini): ${errMsg}`, true); button.textContent = originalButtonText; button.disabled = false; return; }
        } else { 
            const messages = [{ role: 'system', content: puterSystemPrompt }];
            if (isModification) messages.push({ role: 'user', content: `Modify the following HTML code:\n\`\`\`html\n${codeOutput.textContent}\n\`\`\`\n\nUser's request: ${prompt}\n\nReturn the full modified HTML code:`});
            else messages.push({ role: 'user', content: prompt });
            try { const response = await puter.ai.chat(messages, { model: modelSelect.value }); generatedCodeText = response.message.content; } 
            catch (error) { console.error("Puter AI Error:", error); const errMsg = error.message || "Unknown Puter AI error."; alert(`Failed code gen with Puter. ${errMsg}`); codeOutput.textContent = `Error (Puter): ${errMsg}`; updatePreviewFrameAndPopout(`Error (Puter): ${errMsg}`, true); button.textContent = originalButtonText; button.disabled = false; return; }
        }
        const finalHtmlCode = extractHtmlContent(generatedCodeText);
        codeOutput.textContent = finalHtmlCode;
        updatePreviewFrameAndPopout(finalHtmlCode);

        if (inputToClear) inputToClear.value = '';
        else { 
            aiToolsSection1Content.classList.add('hidden');
            displayedGeneratePrompt.textContent = prompt;
            generatedPromptDisplay.classList.remove('hidden');
            aiToolsSection2.classList.remove('hidden');
            aiToolsSection3.classList.remove('hidden');
        }
        button.textContent = originalButtonText; button.disabled = false;
    }

    // --- Element Path Selector ---
    function getElementPathSelector(el) {
        if (!el || !el.parentElement) return 'body';
        if (el.id && !el.id.match(/[^a-zA-Z0-9\-_:\.]/)) return `#${el.id}`; 

        let path = ''; let currentElement = el;
        while (currentElement && currentElement.parentElement && currentElement.tagName.toLowerCase() !== 'html') {
            let sibling = currentElement; let index = 1;
            while (sibling.previousElementSibling) {
                sibling = sibling.previousElementSibling;
                if (sibling.tagName === currentElement.tagName) index++;
            }
            const tagName = currentElement.tagName.toLowerCase();
            const nth = (index > 1 || Array.from(currentElement.parentElement.children).filter(c => c.tagName === tagName).length > 1) ? `:nth-of-type(${index})` : '';
            path = ` > ${tagName}${nth}` + path;
            currentElement = currentElement.parentElement;
            if (currentElement.tagName.toLowerCase() === 'body') break; 
        }
        return 'body' + path;
    }
    
    // --- Main App Element Editor UI Update ---
    function updateMainElementEditorUI(element) {
        if (!element || !elementEditorControls) {
            if(elementEditorControls) elementEditorControls.classList.add('hidden');
            if(selectedElementIdentifier) selectedElementIdentifier.textContent = 'N/A';
            return;
        }
        const tagName = element.tagName.toLowerCase(); const id = element.id ? `#${element.id}` : '';
        let classes = ''; if (element.className && typeof element.className === 'string') classes = `.${element.className.split(' ').filter(c => c && !c.startsWith('preview-element-')).join('.')}`;
        selectedElementIdentifier.textContent = `${tagName}${id}${classes}`;
        const computedStyle = element.ownerDocument.defaultView.getComputedStyle(element);
        elementTextContentInput.value = element.firstChild?.nodeType === 3 ? element.firstChild.textContent.trim() : '';
        elementColorInput.value = rgbToHex(computedStyle.color) || '#000000';
        elementBgColorInput.value = rgbToHex(computedStyle.backgroundColor) || '#ffffff';
        elementWidthInput.value = computedStyle.width === 'auto' ? '' : computedStyle.width;
        elementHeightInput.value = computedStyle.height === 'auto' ? '' : computedStyle.height;
        elementPaddingInput.value = computedStyle.padding;
        elementMarginInput.value = computedStyle.margin;
        elementPositionSelect.value = computedStyle.position;
        elementDisplaySelect.value = computedStyle.display;
        elementBorderInput.value = computedStyle.border.includes('none') ? '' : computedStyle.border;
        elementEditorControls.classList.remove('hidden');
    }

    // --- Main App Element Selection Toggle ---
    function toggleMainAppElementSelectionMode() {
        isMainAppSelectingElement = !isMainAppSelectingElement;
        selectElementButton.textContent = isMainAppSelectingElement ? 'Cancel Selection Mode' : 'Select Element to Edit';
        selectElementButton.classList.toggle('active-selection', isMainAppSelectingElement);
        selectElementsToggle.textContent = `Select Elements: ${isMainAppSelectingElement ? 'ON' : 'OFF'}`;
        selectElementsToggle.classList.toggle('active', isMainAppSelectingElement);
        document.body.classList.toggle('element-selection-active', isMainAppSelectingElement);

        if (!isMainAppSelectingElement) { 
            [previewFrame.contentDocument, popOutWindow?.document].forEach(doc => {
                if (doc) doc.querySelectorAll('.preview-element-hover-highlight').forEach(el => el.classList.remove('preview-element-hover-highlight'));
            });
        }
    }

    // --- Cross-window selection processing & highlight sync ---
    window.processSelectionFromAnywhere = (selector, sourceWindowType) => { 
        currentSelectedElementSelector = selector;
        const mainFrameEl = getElementBySelector(previewFrame.contentDocument, selector);
        
        if (previewFrame.contentDocument) {
            const prevSelectedInMain = previewFrame.contentDocument.querySelector('.preview-element-selected-highlight');
            if (prevSelectedInMain) prevSelectedInMain.classList.remove('preview-element-selected-highlight');
            if (mainFrameEl) mainFrameEl.classList.add('preview-element-selected-highlight');
        }

        if (popOutWindow && !popOutWindow.closed) {
            const popOutEl = getElementBySelector(popOutWindow.document, selector);
            if (popOutWindow.document) {
                const prevSelectedInPopOut = popOutWindow.document.querySelector('.preview-element-selected-highlight');
                if (prevSelectedInPopOut) prevSelectedInPopOut.classList.remove('preview-element-selected-highlight');
                if (popOutEl) popOutEl.classList.add('preview-element-selected-highlight');
            }
            if (popOutWindow.updatePopOutEditorUI && popOutEl) popOutWindow.updatePopOutEditorUI(popOutEl);
        }
        
        updateMainElementEditorUI(mainFrameEl); 
        
        if (isMainAppSelectingElement && sourceWindowType !== 'popout_editor_initiated') {
            toggleMainAppElementSelectionMode(); 
        }
    };

    // --- Preview Interaction Listeners (for both iframe and popout) ---
    function setupPreviewInteractionListeners(doc, windowType, isPopOutEditorSelection = false) { 
        if (!doc || !doc.body) return;
        
        const getSelectionController = () => {
            if (windowType === 'popout' && isPopOutEditorSelection) return popOutWindow?.isPopOutEditorSelectingElement;
            return isMainAppSelectingElement;
        };

        doc.body.addEventListener('mouseover', (e) => {
            if (!getSelectionController() || e.target === doc.body || e.target === doc.documentElement) return;
            e.target.classList.add('preview-element-hover-highlight');
        });
        doc.body.addEventListener('mouseout', (e) => {
            if (!getSelectionController() || e.target === doc.body || e.target === doc.documentElement) return;
            e.target.classList.remove('preview-element-hover-highlight');
        });
        doc.body.addEventListener('click', (e) => {
            if (!getSelectionController() || e.target === doc.body || e.target === doc.documentElement) return;
            e.preventDefault(); e.stopPropagation();
            const selector = getElementPathSelector(e.target);

            if (windowType === 'popout' && isPopOutEditorSelection) {
                if(popOutWindow?.processPopOutSelection) popOutWindow.processPopOutSelection(selector, e.target);
            } else {
                window.processSelectionFromAnywhere(selector, windowType);
            }
        }, true);
    }
    
    // --- Main App Manual Element Changes ---
    function applyMainAppManualElementChanges() {
        if (!currentSelectedElementSelector) return alert("No element selected.");
        const mainFrameEl = getElementBySelector(previewFrame.contentDocument, currentSelectedElementSelector);
        if (!mainFrameEl) return alert("Selected element not found in the main preview.");

        const applyChangesToElement = (el, sourceInputs) => { 
            if (!el) return; const style = el.style;
            if (sourceInputs.text.value !== (el.firstChild?.nodeType === 3 ? el.firstChild.textContent.trim() : '')) {
                if (el.firstChild?.nodeType === 3) el.firstChild.textContent = sourceInputs.text.value;
                else if (!el.children.length) el.textContent = sourceInputs.text.value;
            }
            style.color = sourceInputs.color.value; style.backgroundColor = sourceInputs.bgColor.value;
            style.width = sourceInputs.width.value || null; style.height = sourceInputs.height.value || null;
            style.padding = sourceInputs.padding.value || null; style.margin = sourceInputs.margin.value || null;
            style.position = sourceInputs.position.value || null; style.display = sourceInputs.display.value || null;
            style.border = sourceInputs.border.value || null;
        };
        const mainEditorInputs = { text: elementTextContentInput, color: elementColorInput, bgColor: elementBgColorInput, width: elementWidthInput, height: elementHeightInput, padding: elementPaddingInput, margin: elementMarginInput, position: elementPositionSelect, display: elementDisplaySelect, border: elementBorderInput };
        applyChangesToElement(mainFrameEl, mainEditorInputs);
        
        const newHtml = previewFrame.contentDocument.documentElement.outerHTML;
        codeOutput.textContent = newHtml;
        updatePreviewFrameAndPopout(newHtml, false, true); 
        alert("Manual changes applied from main editor.");
    }
    
    // --- Main App AI Element Changes (can be called by popout too) ---
    window.handleAIEditRequest = async (elementOuterHTML, aiPrompt, selectorToUpdate) => {
        if (!elementOuterHTML || !aiPrompt || !selectorToUpdate) {
            alert("Missing data for AI element edit.");
            return false;
        }
        const sourceButton = applyElementAIEditButton; 
        const originalButtonText = sourceButton.textContent;
        sourceButton.textContent = 'Applying AI...'; sourceButton.disabled = true;

        let modifiedElementSnippet;
        if (useGeminiAPI) {
            if (!googleAi) { alert("Gemini API not initialized."); sourceButton.textContent = originalButtonText; sourceButton.disabled = false; return false; }
            const geminiElementPrompt = `You are an expert web developer. Modify the given HTML element based on the request. Return ONLY the modified HTML for that single element. Original Element:\n\`\`\`html\n${elementOuterHTML}\n\`\`\`\nRequest: ${aiPrompt}`;
            try { const response = await googleAi.models.generateContent({ model: GEMINI_TEXT_MODEL, contents: geminiElementPrompt }); modifiedElementSnippet = response.text; } 
            catch (error) { console.error("Gemini AI Element Edit Error:", error); alert(`Failed AI edit with Gemini: ${error.message}`); sourceButton.textContent = originalButtonText; sourceButton.disabled = false; return false;}
        } else {
            const systemPrompt = "You are an expert web developer. Modify the given HTML element based on the request. Return ONLY the modified HTML for that single element.";
            const messages = [ { role: 'system', content: systemPrompt }, { role: 'user', content: `Original Element:\n\`\`\`html\n${elementOuterHTML}\n\`\`\`\nRequest: ${aiPrompt}` } ];
            try { const response = await puter.ai.chat(messages, { model: modelSelect.value }); modifiedElementSnippet = extractHtmlContent(response.message.content); } 
            catch (error) { console.error("Puter AI Element Edit Error:", error); alert(`Failed AI edit with Puter: ${error.message}`); sourceButton.textContent = originalButtonText; sourceButton.disabled = false; return false; }
        }
        
        const mainFrameElToReplace = getElementBySelector(previewFrame.contentDocument, selectorToUpdate);
        if (mainFrameElToReplace && mainFrameElToReplace.parentElement) {
            const tempContainer = previewFrame.contentDocument.createElement('div');
            tempContainer.innerHTML = modifiedElementSnippet; 
            const newElement = tempContainer.firstElementChild;
            if (newElement) {
                mainFrameElToReplace.parentElement.replaceChild(newElement, mainFrameElToReplace);
                currentSelectedElementSelector = getElementPathSelector(newElement); 
                
                const newFullHtml = previewFrame.contentDocument.documentElement.outerHTML;
                codeOutput.textContent = newFullHtml;
                updatePreviewFrameAndPopout(newFullHtml, false, true); 
                
                if (editElementPromptInput) editElementPromptInput.value = '';
                alert("Element modified by AI.");
                sourceButton.textContent = originalButtonText; sourceButton.disabled = false;
                return true;
            }
        }
        alert("AI did not return a valid element or target was lost. Modification failed.");
        console.warn("Failed to apply AI element modification. Snippet:", modifiedElementSnippet);
        sourceButton.textContent = originalButtonText; sourceButton.disabled = false;
        return false;
    };
    
    // --- UI Updates, Placeholders, Pop-out & Preview Sync ---
    function getPreviewStyles() {
        let currentTheme = 'dark'; try { currentTheme = localStorage.getItem('theme') || 'dark'; } catch(e) {/* ignore */}
        const mainDocStyle = getComputedStyle(document.documentElement);
        const accentColor = mainDocStyle.getPropertyValue(currentTheme === 'dark' ? '--accent-color-dark' : '--accent-color-light').trim();
        const accentColorRgb = mainDocStyle.getPropertyValue(currentTheme === 'dark' ? '--accent-color-rgb-dark' : '--accent-color-rgb-light').trim();
        return `:root { --subtle-text-dark: #8b949e; --subtle-text-light: #57606a; --panel-bg-dark: #161b22; --panel-bg-light: #ffffff; }
            .preview-element-hover-highlight { outline: 2px dashed ${accentColor} !important; cursor: pointer !important; box-shadow: 0 0 8px rgba(${accentColorRgb}, 0.5) !important; }
            .preview-element-selected-highlight { outline: 2px solid ${accentColor} !important; box-shadow: 0 0 0 3px rgba(${accentColorRgb}, 0.7), inset 0 0 5px rgba(${accentColorRgb}, 0.3) !important; }`;
    }
    function updatePreviewFramePlaceholder(message, isError = false) {
        let currentTheme = 'dark'; try { currentTheme = localStorage.getItem('theme') || 'dark'; } catch(e) {/* ignore */}
        const color = isError ? '#ff4d4d' : (currentTheme === 'dark' ? 'var(--subtle-text-dark)' : 'var(--subtle-text-light)');
        const bgColor = currentTheme === 'dark' ? 'var(--panel-bg-dark)' : 'var(--panel-bg-light)';
        const injectedStyles = getPreviewStyles();
        const placeholderHtml = `<!DOCTYPE html><html><head><style>${injectedStyles} 
            body { margin:0; display:flex; justify-content:center; align-items:center; height:100vh; font-family: ${getComputedStyle(document.body).fontFamily}; color:${color}; background-color:${bgColor}; }
            </style></head><body><p>${escapeHTML(message)}</p></body></html>`;
        previewFrame.srcdoc = placeholderHtml;
        if (popOutWindow && !popOutWindow.closed) {
            popOutWindow.document.open(); popOutWindow.document.write(placeholderHtml); popOutWindow.document.close();
            setupPreviewInteractionListeners(popOutWindow.document, 'popout', popOutWindow.isPopOutEditorSelectingElement); 
            if (popOutWindow.setupPopOutSpecificUI) popOutWindow.setupPopOutSpecificUI(); 
        }
    }
    function updatePreviewFrameAndPopout(htmlContent, isError = false, forceHighlightSync = false) {
        if (isError) { updatePreviewFramePlaceholder(htmlContent, true); return; }
        if (!htmlContent || htmlContent.startsWith("No code generated yet.")) { updatePreviewFramePlaceholder(htmlContent || "Preview will appear here"); return; }
        const styleInjection = `<style>${getPreviewStyles()}</style>`;
        let finalHtmlContent = htmlContent;
        if (finalHtmlContent.includes("<head>")) finalHtmlContent = finalHtmlContent.replace("<head>", "<head>" + styleInjection);
        else if (finalHtmlContent.includes("<html>")) finalHtmlContent = finalHtmlContent.replace("<html>", `<html><head>${styleInjection}</head>`);
        else finalHtmlContent = `<html><head>${styleInjection}</head><body>${htmlContent}</body></html>`;
        previewFrame.srcdoc = finalHtmlContent;

        function setupInteractionsAndSyncHighlights(doc, windowType) {
            setupPreviewInteractionListeners(doc, windowType, windowType === 'popout' && popOutWindow?.isPopOutEditorSelectingElement);
            if (currentSelectedElementSelector) {
                 const elToHighlight = getElementBySelector(doc, currentSelectedElementSelector);
                 if (elToHighlight) {
                    const prevSel = doc.querySelector('.preview-element-selected-highlight'); if(prevSel) prevSel.classList.remove('preview-element-selected-highlight');
                    elToHighlight.classList.add('preview-element-selected-highlight');
                 }
            }
        }
        previewFrame.onload = () => { setupInteractionsAndSyncHighlights(previewFrame.contentDocument, 'iframe'); previewFrame.onload = null; };

        if (popOutWindow && !popOutWindow.closed) {
            const currentScrollX = popOutWindow.scrollX; const currentScrollY = popOutWindow.scrollY;
            popOutWindow.document.open(); popOutWindow.document.write(finalHtmlContent); popOutWindow.document.close();
            setupInteractionsAndSyncHighlights(popOutWindow.document, 'popout');
            if (popOutWindow.setupPopOutSpecificUI) popOutWindow.setupPopOutSpecificUI(); 
            popOutWindow.scrollTo(currentScrollX, currentScrollY); 
        } else if (forceHighlightSync && currentSelectedElementSelector && previewFrame.contentDocument) {
             const mainFrameEl = getElementBySelector(previewFrame.contentDocument, currentSelectedElementSelector);
             if (mainFrameEl) {
                const prevSel = previewFrame.contentDocument.querySelector('.preview-element-selected-highlight'); if(prevSel) prevSel.classList.remove('preview-element-selected-highlight');
                mainFrameEl.classList.add('preview-element-selected-highlight');
             }
        }
    }
    
    // --- Pop-out Window Specific Logic ---
    const getPopOutEditorHTML = () => {
        return `
            <button id="popoutToggleEditorButton" class="popout-header-button">Edit Elements</button>
            <div id="popoutEditorPanel" class="popout-editor-panel">
                <h4>Edit Element</h4>
                <button id="popoutSelectElementButton" class="popout-editor-button">Select Element to Edit</button>
                <div id="popoutElementEditorControls" class="hidden">
                    <h5>Editing: <span id="popoutSelectedElementIdentifier">N/A</span></h5>
                    <div class="popout-control-group">
                        <label for="popoutElementTextContent">Text Content:</label>
                        <input type="text" id="popoutElementTextContent">
                    </div>
                    <div class="popout-control-group">
                        <label for="popoutElementColor">Text Color:</label>
                        <input type="color" id="popoutElementColor" value="#000000">
                    </div>
                    <div class="popout-control-group">
                        <label for="popoutElementBgColor">Background Color:</label>
                        <input type="color" id="popoutElementBgColor" value="#FFFFFF">
                    </div>
                    <div class="popout-control-group">
                        <label for="popoutElementWidth">Width:</label>
                        <input type="text" id="popoutElementWidth" placeholder="e.g., 250px">
                    </div>
                    <div class="popout-control-group">
                        <label for="popoutElementHeight">Height:</label>
                        <input type="text" id="popoutElementHeight" placeholder="e.g., 60px">
                    </div>
                    <div class="popout-control-group">
                        <label for="popoutElementPadding">Padding:</label>
                        <input type="text" id="popoutElementPadding" placeholder="e.g., 0px">
                    </div>
                    <div class="popout-control-group">
                        <label for="popoutElementMargin">Margin:</label>
                        <input type="text" id="popoutElementMargin" placeholder="e.g., 0px">
                    </div>
                    <div class="popout-control-group">
                        <label for="popoutElementPosition">Position:</label>
                        <select id="popoutElementPosition">
                            <option value="static">Static</option><option value="relative">Relative</option>
                            <option value="absolute">Absolute</option><option value="fixed">Fixed</option>
                            <option value="sticky">Sticky</option>
                        </select>
                    </div>
                    <div class="popout-control-group">
                        <label for="popoutElementDisplay">Display:</label>
                        <select id="popoutElementDisplay">
                            <option value="block">Block</option><option value="inline">Inline</option>
                            <option value="inline-block">Inline-Block</option><option value="flex">Flex</option>
                            <option value="grid">Grid</option><option value="none">None</option>
                        </select>
                    </div>
                    <div class="popout-control-group">
                        <label for="popoutElementBorder">Border:</label>
                        <input type="text" id="popoutElementBorder" placeholder="e.g., 1px solid black">
                    </div>
                    <p class="popout-ai-edit-label">Or describe changes with AI:</p>
                    <textarea id="popoutEditElementPromptInput" rows="3" placeholder="e.g., make this button rounded with a blue border"></textarea>
                    <div class="popout-editor-buttons">
                        <button id="popoutSaveManualChangesButton">Apply Manual Changes</button>
                        <button id="popoutApplyAIEditButton">Apply AI Edit</button>
                    </div>
                </div>
            </div>
        `;
    };
    const getPopOutEditorCSS = (themeVars) => { 
        return `
            body { margin: 0; font-family: ${themeVars.fontFamily}; background-color: ${themeVars.panelBg}; /* Match panel bg for consistency */ }
            .popout-header-button { /* For 'Edit Elements' button */
                position: fixed; top: 10px; left: 10px; z-index: 1002;
                padding: 6px 12px; font-size: 0.9em; cursor: pointer;
                background-color: ${themeVars.buttonSecondaryBg}; color: ${themeVars.buttonSecondaryText};
                border: 1px solid ${themeVars.buttonSecondaryBorder}; border-radius: 6px;
            }
            .popout-editor-panel {
                position: fixed; top: 50px; left: 10px; 
                width: 280px; 
                background: ${themeVars.panelBg}; color: ${themeVars.textColor}; 
                border: 1px solid ${themeVars.panelBorder}; border-radius: 8px; 
                box-shadow: 0 5px 15px rgba(0,0,0,0.2); 
                z-index: 1001; 
                display: flex; flex-direction: column; gap: 12px;
                
                /* Animation styles */
                max-height: 0; opacity: 0; overflow: hidden; 
                padding-left: 15px; padding-right: 15px; padding-top: 0; padding-bottom: 0;
                transition: max-height 0.35s ease-in-out, opacity 0.35s ease-in-out, padding-top 0.35s ease-in-out, padding-bottom 0.35s ease-in-out;
            }
            .popout-editor-panel.active {
                max-height: 80vh; /* Adjust as needed, should be enough for content */
                opacity: 1;
                padding-top: 15px; padding-bottom: 15px;
                overflow-y: auto; /* Allow scroll if content exceeds max-height */
            }
            .popout-editor-panel h4, .popout-editor-panel h5 { margin: 0 0 5px; color: ${themeVars.textColor}; font-weight: 500; }
            .popout-editor-panel h4 { font-size: 1.1em; }
            .popout-editor-panel h5 { font-size: 0.95em; }

            .popout-control-group { margin-bottom: 10px; }
            .popout-control-group label { 
                font-size: 0.8em; margin-bottom: 4px; display: block; color: ${themeVars.subtleText}; 
            }
            .popout-editor-panel input[type="text"],
            .popout-editor-panel input[type="color"],
            .popout-editor-panel select,
            .popout-editor-panel textarea {
                width: 100%;
                background-color: ${themeVars.inputBg}; color: ${themeVars.inputText}; 
                border: 1px solid ${themeVars.inputBorder};
                padding: 8px; border-radius: 4px; font-size: 0.9em;
                box-sizing: border-box;
            }
            .popout-editor-panel input[type="color"] { padding: 2px; height: 36px; }
            .popout-editor-panel textarea { resize: vertical; min-height: 60px; }
            .popout-ai-edit-label { font-size: 0.85em; margin: 15px 0 5px; color: ${themeVars.subtleText};}

            .popout-editor-button, /* For 'Select Element to Edit' button */
            .popout-editor-buttons button { /* For Apply Manual/AI buttons */
                padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 0.9em;
                width: 100%; box-sizing: border-box; margin-bottom: 5px;
            }
            #popoutSelectElementButton { /* Secondary style for Select button */
                background-color: ${themeVars.buttonSecondaryBg}; color: ${themeVars.buttonSecondaryText};
                border: 1px solid ${themeVars.buttonSecondaryBorder};
            }
            #popoutSelectElementButton.active-selection { /* When selection mode is active */
                 background-color: ${themeVars.accentColor}; color: ${themeVars.buttonPrimaryText}; /* Assuming accent is contrasty */
                 border-color: ${themeVars.accentColor};
            }
            .popout-editor-buttons { display: flex; flex-direction: column; gap: 8px; margin-top: 10px; }
            #popoutSaveManualChangesButton, #popoutApplyAIEditButton { /* Primary style for Apply buttons */
                background-color: ${themeVars.buttonPrimaryBg}; color: ${themeVars.buttonPrimaryText};
                border: 1px solid ${themeVars.buttonPrimaryBorder};
            }
            #popoutElementEditorControls.hidden { display: none !important; }
        `;
    };

    function handlePopOut() {
        if (popOutWindow && !popOutWindow.closed) { popOutWindow.focus(); return; }
        popOutWindow = window.open('', 'VibeCodePreviewPopOut', 'width=1024,height=768,resizable=yes,scrollbars=yes');
        if (popOutWindow) {
            popOutWindow.document.title = "Live Preview - Vibe Code Canvas";
            
            popOutWindow.openerApp = {
                getElementPathSelector: getElementPathSelector, 
                getElementBySelectorInPopOut: (selector) => getElementBySelector(popOutWindow.document, selector),
                notifyMainOfHTMLUpdate: (newFullHtml) => { 
                    codeOutput.textContent = newFullHtml;
                    updatePreviewFrameAndPopout(newFullHtml, false, true); 
                },
                requestAIEditFromMain: async (elementOuterHTML, aiPrompt, selectorToUpdateInPopout) => {
                    return window.handleAIEditRequest(elementOuterHTML, aiPrompt, selectorToUpdateInPopout);
                },
                processSelectionInMain: window.processSelectionFromAnywhere, 
                rgbToHex: rgbToHex, 
                getThemeVars: () => { 
                    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
                    const s = getComputedStyle(document.documentElement);
                    const pfx = currentTheme === 'dark' ? '-dark' : '-light';
                    return {
                        fontFamily: getComputedStyle(document.body).fontFamily,
                        textColor: s.getPropertyValue(`--text-color${pfx}`).trim(),
                        inputBg: s.getPropertyValue(`--input-bg${pfx}`).trim(),
                        inputBorder: s.getPropertyValue(`--input-border${pfx}`).trim(),
                        inputText: s.getPropertyValue(`--input-text${pfx}`).trim(),
                        panelBg: s.getPropertyValue(`--panel-bg${pfx}`).trim(), // Used for popout body and panel
                        panelBorder: s.getPropertyValue(`--panel-border${pfx}`).trim(),
                        subtleText: s.getPropertyValue(`--subtle-text${pfx}`).trim(),
                        accentColor: s.getPropertyValue(`--accent-color${pfx}`).trim(),
                        buttonPrimaryBg: s.getPropertyValue(`--button-primary-bg${pfx}`).trim(),
                        buttonPrimaryText: s.getPropertyValue(`--button-primary-text${pfx}`).trim(),
                        buttonPrimaryBorder: s.getPropertyValue(`--button-primary-border${pfx}`).trim(),
                        buttonSecondaryBg: s.getPropertyValue(`--button-secondary-bg${pfx}`).trim(),
                        buttonSecondaryText: s.getPropertyValue(`--button-secondary-text${pfx}`).trim(),
                        buttonSecondaryBorder: s.getPropertyValue(`--button-secondary-border${pfx}`).trim(),
                    };
                }
            };
            
            popOutWindow.isPopOutEditorSelectingElement = false; 
            popOutWindow.currentPopOutSelectedElementSelector = null;

            const popOutDoc = popOutWindow.document;
            popOutDoc.write(`<html><head><title>Pop-out Preview</title></head><body>${getPopOutEditorHTML()}</body></html>`);
            
            const scriptEl = popOutDoc.createElement('script');
            scriptEl.textContent = `
                // Cache popout UI elements
                const editorPanel = document.getElementById('popoutEditorPanel');
                const toggleEditorButton = document.getElementById('popoutToggleEditorButton');
                const selectElementBtnInPanel = document.getElementById('popoutSelectElementButton');
                const controlsContainerInPanel = document.getElementById('popoutElementEditorControls');
                const idSpanInPanel = document.getElementById('popoutSelectedElementIdentifier');
                const textInputInPanel = document.getElementById('popoutElementTextContent');
                const colorInputInPanel = document.getElementById('popoutElementColor');
                const bgColorInputInPanel = document.getElementById('popoutElementBgColor');
                const widthInputInPanel = document.getElementById('popoutElementWidth');
                const heightInputInPanel = document.getElementById('popoutElementHeight');
                const paddingInputInPanel = document.getElementById('popoutElementPadding');
                const marginInputInPanel = document.getElementById('popoutElementMargin');
                const positionSelectInPanel = document.getElementById('popoutElementPosition');
                const displaySelectInPanel = document.getElementById('popoutElementDisplay');
                const borderInputInPanel = document.getElementById('popoutElementBorder');
                const aiPromptInputInPanel = document.getElementById('popoutEditElementPromptInput');
                const manualSaveButtonInPanel = document.getElementById('popoutSaveManualChangesButton');
                const aiSaveButtonInPanel = document.getElementById('popoutApplyAIEditButton');
                let currentSelectedElementInPopOutDOM = null;

                function setupPopOutSpecificUI() {
                    const themeVars = window.openerApp.getThemeVars();
                    let styleTag = document.getElementById('popout-ui-styles');
                    if (!styleTag) {
                        styleTag = document.createElement('style');
                        styleTag.id = 'popout-ui-styles';
                        document.head.appendChild(styleTag);
                    }
                    styleTag.textContent = \`${getPopOutEditorCSS(popOutWindow.openerApp.getThemeVars())}\`; 

                    toggleEditorButton.onclick = () => { 
                        editorPanel.classList.toggle('active');
                        toggleEditorButton.textContent = editorPanel.classList.contains('active') ? 'Hide Editor' : 'Edit Elements';
                    };
                    selectElementBtnInPanel.onclick = togglePopOutElementSelectionMode;
                    manualSaveButtonInPanel.onclick = applyPopOutManualChanges;
                    aiSaveButtonInPanel.onclick = applyPopOutAIChanges;
                }
                window.setupPopOutSpecificUI = setupPopOutSpecificUI; 
                
                function togglePopOutElementSelectionMode() {
                    window.isPopOutEditorSelectingElement = !window.isPopOutEditorSelectingElement;
                    selectElementBtnInPanel.textContent = window.isPopOutEditorSelectingElement ? 'Cancel Selection' : 'Select Element to Edit';
                    selectElementBtnInPanel.classList.toggle('active-selection', window.isPopOutEditorSelectingElement);
                    if (window.isPopOutEditorSelectingElement) { // When entering selection mode
                        controlsContainerInPanel.classList.add('hidden'); // Hide editor controls
                    } else { // When exiting selection mode (usually after a selection or cancellation)
                        document.querySelectorAll('.preview-element-hover-highlight').forEach(el => el.classList.remove('preview-element-hover-highlight'));
                    }
                }

                window.updatePopOutEditorUI = function(element) { 
                    if (!element) { controlsContainerInPanel.classList.add('hidden'); idSpanInPanel.textContent = 'N/A'; return; }
                    currentSelectedElementInPopOutDOM = element; 
                    window.currentPopOutSelectedElementSelector = window.openerApp.getElementPathSelector(element); 
                    
                    const tagName = element.tagName.toLowerCase(); const id = element.id ? '#' + element.id : '';
                    let classes = ''; if (element.className && typeof element.className === 'string') classes = '.' + element.className.split(' ').filter(c=>c && !c.startsWith('preview-element-')).join('.');
                    idSpanInPanel.textContent = tagName + id + classes;
                    const cs = window.getComputedStyle(element);
                    textInputInPanel.value = element.firstChild?.nodeType === 3 ? element.firstChild.textContent.trim() : '';
                    colorInputInPanel.value = window.openerApp.rgbToHex(cs.color) || '#000000';
                    bgColorInputInPanel.value = window.openerApp.rgbToHex(cs.backgroundColor) || '#ffffff';
                    widthInputInPanel.value = cs.width === 'auto' ? '' : cs.width; heightInputInPanel.value = cs.height === 'auto' ? '' : cs.height;
                    paddingInputInPanel.value = cs.padding; marginInputInPanel.value = cs.margin;
                    positionSelectInPanel.value = cs.position; displaySelectInPanel.value = cs.display;
                    borderInputInPanel.value = cs.border.includes('none') ? '' : cs.border;
                    controlsContainerInPanel.classList.remove('hidden'); // Show controls with populated data
                };
                
                window.processPopOutSelection = function(selector, element) { 
                    window.currentPopOutSelectedElementSelector = selector;
                    currentSelectedElementInPopOutDOM = element;
                    window.updatePopOutEditorUI(element); 
                    window.openerApp.processSelectionInMain(selector, 'popout_editor_initiated'); 
                    if(window.isPopOutEditorSelectingElement) togglePopOutElementSelectionMode(); 
                };

                function applyPopOutManualChanges() {
                    if (!currentSelectedElementInPopOutDOM || !window.currentPopOutSelectedElementSelector) { alert("No element selected in pop-out."); return; }
                    const el = currentSelectedElementInPopOutDOM;
                    const style = el.style;
                    if (textInputInPanel.value !== (el.firstChild?.nodeType === 3 ? el.firstChild.textContent.trim() : '')) {
                         if (el.firstChild?.nodeType === 3) el.firstChild.textContent = textInputInPanel.value;
                         else if(!el.children.length) el.textContent = textInputInPanel.value;
                    }
                    style.color = colorInputInPanel.value; style.backgroundColor = bgColorInputInPanel.value;
                    style.width = widthInputInPanel.value || null; style.height = heightInputInPanel.value || null;
                    style.padding = paddingInputInPanel.value || null; style.margin = marginInputInPanel.value || null;
                    style.position = positionSelectInPanel.value || null; style.display = displaySelectInPanel.value || null;
                    style.border = borderInputInPanel.value || null;
                    window.openerApp.notifyMainOfHTMLUpdate(document.documentElement.outerHTML);
                }

                async function applyPopOutAIChanges() {
                    const prompt = aiPromptInputInPanel.value.trim();
                    if (!currentSelectedElementInPopOutDOM || !window.currentPopOutSelectedElementSelector || !prompt) { alert("Select element and provide AI prompt in pop-out."); return; }
                    const originalButtonText = aiSaveButtonInPanel.textContent;
                    aiSaveButtonInPanel.textContent = 'Thinking...'; aiSaveButtonInPanel.disabled = true;
                    
                    const success = await window.openerApp.requestAIEditFromMain(currentSelectedElementInPopOutDOM.outerHTML, prompt, window.currentPopOutSelectedElementSelector);
                    if (success) {
                        aiPromptInputInPanel.value = '';
                        // The main app will update the popout's content, which will trigger updatePopOutEditorUI if the element is still selected
                        // Or, we can try to re-fetch and update here directly if the selector is stable.
                        // For now, rely on the main app's sync process.
                    } 
                    aiSaveButtonInPanel.textContent = originalButtonText; aiSaveButtonInPanel.disabled = false;
                }
                setupPopOutSpecificUI();
            `;
            popOutDoc.body.appendChild(scriptEl);
            popOutDoc.close(); 
            updatePreviewFrameAndPopout(previewFrame.srcdoc || codeOutput.textContent); 
            popOutWindow.addEventListener('beforeunload', () => { popOutWindow = null; });
        } else { alert("Failed to open pop-out window. Check pop-up blocker."); }
    }


    // --- Event Listeners ---
    if (loginButton) loginButton.addEventListener('click', async () => { try { await puter.auth.signIn(); } catch (error) { console.error("Login attempt finished:", error); } finally { checkAuthStatus(); } });
    if (logoutButton) logoutButton.addEventListener('click', async () => { try { await puter.auth.signOut(); } catch (error) { console.error("Logout failed:", error); alert(`Logout failed: ${error.message}`); } finally { checkAuthStatus(); } });
    if (settingsButton) settingsButton.addEventListener('click', () => settingsModal.classList.remove('hidden'));
    [closeSettingsModal, closeSettingsModalFooter].forEach(btn => { if(btn) btn.addEventListener('click', () => settingsModal.classList.add('hidden')); });
    window.addEventListener('click', (e) => { if (e.target === settingsModal) settingsModal.classList.add('hidden'); });
    tabButtons.forEach(button => { button.addEventListener('click', () => { tabButtons.forEach(btn => btn.classList.remove('active')); button.classList.add('active'); tabContents.forEach(content => content.classList.remove('active')); const tabContentElement = getElem(button.dataset.tab); if (tabContentElement) tabContentElement.classList.add('active'); }); });
    if (darkModeToggle) darkModeToggle.addEventListener('change', () => applyTheme(darkModeToggle.checked ? 'dark' : 'light'));
    if (tooltipsToggle) tooltipsToggle.addEventListener('change', () => applyTooltipsSetting(tooltipsToggle.checked));
    if (geminiApiToggle) geminiApiToggle.addEventListener('change', () => { const wantsGemini = geminiApiToggle.checked; if (wantsGemini && !googleAi && !initializeGeminiClient()) { geminiApiToggle.checked = false; useGeminiAPI = false; updateApiUsageUI(); return; } useGeminiAPI = geminiApiToggle.checked; updateApiUsageUI(); });
    if (saveModelsButton) saveModelsButton.addEventListener('click', () => { const selected = [...modelListContainer.querySelectorAll('input:checked')].map(cb => cb.value); if (selected.length === 0) return alert("Please select at least one Puter model."); saveDropdownModels(selected); populateModelDropdown(); alert('Puter model selection saved!'); });
    if (modelSelect) modelSelect.addEventListener('change', () => { try { localStorage.setItem('lastSelectedModel', modelSelect.value); } catch(e) {/*ignore*/} });
    if (generateCodeButton) generateCodeButton.addEventListener('click', () => { const systemPrompt = "You are an expert web developer. Generate a complete, single, runnable HTML file based on the user's request. The HTML must include all necessary CSS and JavaScript. The output should ONLY be the raw HTML code, starting with `<!DOCTYPE html>` or `<html>`."; handleCodeGeneration(generatePromptInput.value.trim(), generateCodeButton, systemPrompt, null, false); });
    if (generatePromptInput) generatePromptInput.addEventListener('keypress', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generateCodeButton.click(); } });
    if (editInitialPromptButton) editInitialPromptButton.addEventListener('click', () => { aiToolsSection1Content.classList.remove('hidden'); generatedPromptDisplay.classList.add('hidden'); generatePromptInput.focus(); });
    if (modifyCodeButton) modifyCodeButton.addEventListener('click', () => { const systemPrompt = "You are an expert web developer. You will be given an existing HTML document and a request to modify it. Apply the modifications and return the complete, new HTML document. Ensure the response contains ONLY the full HTML code."; handleCodeGeneration(modifyPromptInput.value.trim(), modifyCodeButton, systemPrompt, modifyPromptInput, true); });
    if (modifyPromptInput) modifyPromptInput.addEventListener('keypress', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); modifyCodeButton.click(); } });
    
    [selectElementButton, selectElementsToggle].forEach(btn => { if(btn) btn.addEventListener('click', toggleMainAppElementSelectionMode) });
    if(saveManualElementChangesButton) saveManualElementChangesButton.addEventListener('click', applyMainAppManualElementChanges);
    if(applyElementAIEditButton) applyElementAIEditButton.addEventListener('click', async () => {
        const prompt = editElementPromptInput.value.trim();
        if (!currentSelectedElementSelector || !prompt) { alert("No element selected or AI prompt provided for main editor."); return; }
        const mainFrameEl = getElementBySelector(previewFrame.contentDocument, currentSelectedElementSelector);
        if (!mainFrameEl) { alert("Selected element not found for AI edit."); return; }
        await window.handleAIEditRequest(mainFrameEl.outerHTML, prompt, currentSelectedElementSelector);
    });

    if(fullscreenButton) fullscreenButton.addEventListener('click', () => previewFrame.requestFullscreen?.().catch(err => console.warn("Fullscreen request failed:", err)));
    if(popOutButton) popOutButton.addEventListener('click', handlePopOut);
    if (toggleAiToolsPanelButton) toggleAiToolsPanelButton.addEventListener('click', () => { aiToolsContent.classList.toggle('hidden'); const isHidden = aiToolsContent.classList.contains('hidden'); toggleAiToolsPanelButton.textContent = isHidden ? '🔽' : '🔼'; toggleAiToolsPanelButton.ariaLabel = isHidden ? 'Expand AI Tools Panel' : 'Collapse AI Tools Panel'; });
    if (generateMicrophoneButton) generateMicrophoneButton.addEventListener('click', () => startDictation(generatePromptInput));
    if (modifyMicrophoneButton) modifyMicrophoneButton.addEventListener('click', () => startDictation(modifyPromptInput));
    if (createCheckpointButton) createCheckpointButton.addEventListener('click', () => createCheckpoint("Manual"));
    if (autoCreateCheckpointToggle) autoCreateCheckpointToggle.addEventListener('change', () => { try { localStorage.setItem('autoCreateCheckpoints', autoCreateCheckpointToggle.checked); } catch (e) { console.warn("Could not save auto-checkpoint preference:", e); }});
    if (viewRestoreCheckpointsButton) viewRestoreCheckpointsButton.addEventListener('click', showCheckpointsModal);
    if (closeRestoreCheckpointsModal) closeRestoreCheckpointsModal.addEventListener('click', () => restoreCheckpointsModal.classList.add('hidden'));
    if (cancelRestoreCheckpointButton) cancelRestoreCheckpointButton.addEventListener('click', () => restoreCheckpointsModal.classList.add('hidden'));
    if (downloadHtmlLink) downloadHtmlLink.addEventListener('click', (e) => { e.preventDefault(); const html = codeOutput.textContent; if(!html || html.startsWith("No code")) {alert("No code to download."); return;} const blob = new Blob([html], {type: 'text/html'}); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = (appProjectNameInput.value.trim() || 'index') + '.html'; a.click(); URL.revokeObjectURL(a.href); });
    if (downloadZipLink) downloadZipLink.addEventListener('click', (e) => {e.preventDefault(); alert("ZIP Download not yet fully implemented for single HTML file. Use Download HTML.");});


    // --- Initialization ---
    function init() {
        checkAuthStatus(); 
        try { const storedTheme = localStorage.getItem('theme'); applyTheme(storedTheme || 'dark'); } 
        catch (e) { console.warn("Failed to load theme from localStorage", e); applyTheme('dark'); }
        try { const storedTooltips = localStorage.getItem('tooltipsEnabled'); if (storedTooltips !== null) { tooltipsToggle.checked = JSON.parse(storedTooltips); applyTooltipsSetting(tooltipsToggle.checked); } else { tooltipsToggle.checked = false; applyTooltipsSetting(false); } }
        catch (e) { console.warn("Could not load tooltips preference:", e); tooltipsToggle.checked = false; applyTooltipsSetting(false); }
        try { const storedGeminiPref = localStorage.getItem('useGeminiAPI'); if (storedGeminiPref) useGeminiAPI = JSON.parse(storedGeminiPref); if (useGeminiAPI && !initializeGeminiClient()) useGeminiAPI = false; } 
        catch (e) { console.warn("Could not load Gemini API preference:", e); useGeminiAPI = false; }
        if(geminiApiToggle) geminiApiToggle.checked = useGeminiAPI; updateApiUsageUI();
        populateModelList(); populateModelDropdown(); 
        setupSpeechRecognition(); loadCheckpoints();
        try { const autoCreatePref = localStorage.getItem('autoCreateCheckpoints'); if (autoCreateCheckpointToggle && autoCreatePref !== null) autoCreateCheckpointToggle.checked = JSON.parse(autoCreatePref); } 
        catch(e) { console.warn("Could not load auto-checkpoint preference:", e); }
        codeOutput.textContent = "No code generated yet. Enter a prompt to start.";
        updatePreviewFrameAndPopout("Preview will appear here"); 
        setupPreviewInteractionListeners(previewFrame.contentDocument, 'iframe'); 
    }
    init();
});
