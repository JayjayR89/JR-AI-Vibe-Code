
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
    const newProjectButton = getElem('newProjectButton');
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
    const selectElementButton = getElem('selectElementButton');
    const elementEditorControls = getElem('elementEditorControls');
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
    
    const codeFilesPanel = getElem('codeFilesPanel');
    const codePanelTitle = getElem('codePanelTitle');
    const filesButton = getElem('filesButton');
    const fileExplorer = getElem('fileExplorer');
    const createNewFileButton = getElem('createNewFileButton');
    const createNewFolderButton = getElem('createNewFolderButton'); // Will be disabled for now
    const uploadFileInput = getElem('uploadFileInput');
    const uploadFileTriggerButton = getElem('uploadFileTriggerButton');
    const projectFileTree = getElem('projectFileTree');
    const codeOutput = querySel('#codeOutput code');
    
    const selectElementsToggle = getElem('selectElementsToggle'); 
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
    const downloadActiveFileLink = getElem('downloadActiveFile'); // Renamed from downloadHtml
    const downloadZipLink = getElem('downloadZip');

    const confirmNewProjectModal = getElem('confirmNewProjectModal');
    const closeConfirmNewProjectModal = getElem('closeConfirmNewProjectModal');
    const confirmNewProjectConfirmButton = getElem('confirmNewProjectConfirmButton');
    const confirmNewProjectCancelButton = getElem('confirmNewProjectCancelButton');

    // Model Details Modal Elements
    const modelDetailsModal = getElem('modelDetailsModal');
    const modelDetailsModalTitle = getElem('modelDetailsModalTitle');
    const modelDetailsContent = getElem('modelDetailsContent');
    const closeModelDetailsModal = getElem('closeModelDetailsModal');
    const closeModelDetailsModalFooter = getElem('closeModelDetailsModalFooter');


    const APP_VERSION = '1.0.7'; 
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
    let recognitionActive = false;
    let currentActiveMicButton = null;

    const DEFAULT_BLANK_PROJECT_HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project</title>
  <style>
    body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f0f0f0; color: #333; }
    .container { text-align: center; padding: 20px; background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    h1 { color: #007bff; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome!</h1>
    <p>Your new Vibe Code Canvas project is ready.</p>
    <p>Use the AI Tools panel to describe the UI you want to create, or add more files using the 'Files' button.</p>
  </div>
</body>
</html>`;
    
    let projectFiles = [{ name: 'index.html', path: 'index.html', content: DEFAULT_BLANK_PROJECT_HTML_CONTENT, type: 'file' }];
    let activeFilePath = 'index.html';

    const allModels = [
        'claude-sonnet-4', 'claude-opus-4', 'claude-3-7-sonnet', 'claude-3-5-sonnet',
        'gpt-4o-mini', 'gpt-4o', 'o1', 'o1-mini', 'o1-pro', 'o3', 'o3-mini', 'o4-mini',
        'gpt-4.1', 'gpt-4.1-mini', 'gpt-4.1-nano', 'gpt-4.5-preview',
        'deepseek-chat', 'deepseek-reasoner',
        'google/gemini-2.5-pro-exp-03-25:free', 'google/gemini-2.5-flash-preview', 
        'google/gemini-2.5-flash-preview:thinking', 'gemini-2.0-flash',
        'google/gemini-2.0-flash-lite-001', 'google/gemini-2.0-flash-thinking-exp-1219:free',
        'google/gemini-2.0-pro-exp-02-05:free', 'gemini-1.5-flash',
        'meta-llama/llama-4-maverick', 'meta-llama/llama-4-scout',
        'meta-llama/llama-3.3-70b-instruct', 'meta-llama/llama-3.2-3b-instruct',
        'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
        'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
        'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo',
        'mistral-large-latest', 'pixtral-large-latest', 'codestral-latest',
        'google/gemma-2-27b-it', 'grok-beta', 'x-ai/grok-3-beta'
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
        try { return doc.querySelector(selector); } 
        catch (e) { console.warn("Failed to get element by selector:", selector, e); return null; }
    }
    function getActiveFile() { return projectFiles.find(f => f.path === activeFilePath); }
    function updateActiveFileContent(newContent) {
        const file = getActiveFile();
        if (file) { file.content = newContent; saveProjectFiles(); }
    }

    // --- Gemini API Initialization ---
    function initializeGeminiClient() {
        if (process.env.API_KEY) {
            try { googleAi = new GoogleGenAI({ apiKey: process.env.API_KEY }); console.log("GoogleGenAI client initialized."); return true; } 
            catch (e) { console.error("Failed to initialize GoogleGenAI client:", e); alert("Failed to initialize Gemini API. Ensure API_KEY is (pre-)configured. Falling back to Puter API."); return false; }
        } else { console.warn("Google Gemini API Key (process.env.API_KEY) not found."); /* alert("Gemini API key not found. Ensure it's (pre-)configured. Falling back to Puter API."); // Alerting here can be noisy if key is simply not set */ return false; }
    }
    
    // --- API Usage Management ---
    function updateApiUsageUI() {
        authContainer.classList.toggle('hidden', useGeminiAPI);
        modelSelect.classList.toggle('hidden', useGeminiAPI);
        if (puterModelLabel) puterModelLabel.classList.toggle('hidden', useGeminiAPI);
        geminiModelLabelElement.classList.toggle('hidden', !useGeminiAPI);
        if (useGeminiAPI) geminiModelLabelElement.textContent = `Model: ${GEMINI_TEXT_MODEL}`;
        try { localStorage.setItem('useGeminiAPI', JSON.stringify(useGeminiAPI)); } 
        catch (e) { console.warn("LS Error (Gemini Pref):", e); }
    }

    // --- Speech Recognition ---
    function setupSpeechRecognition() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (window.SpeechRecognition) {
            recognition = new SpeechRecognition();
            recognition.continuous = false; recognition.lang = 'en-US'; recognition.interimResults = false;
            recognition.onstart = () => { if (currentActiveMicButton) currentActiveMicButton.classList.add('recording'); };
            recognition.onend = () => { if (currentActiveMicButton) currentActiveMicButton.classList.remove('recording'); recognitionActive = false; currentActiveMicButton = null; };
            recognition.onerror = (event) => { console.error('Speech recognition error:', event.error); alert(`Speech recognition error: ${event.error}`); if (currentActiveMicButton) currentActiveMicButton.classList.remove('recording'); recognitionActive = false; currentActiveMicButton = null; };
        } else {
            console.warn('Speech Recognition API not supported.');
            [generateMicrophoneButton, modifyMicrophoneButton].forEach(btn => { if(btn) { btn.disabled = true; btn.title = "Speech recognition not supported"; }});
        }
    }
    function startDictation(targetInputElement, micButton) {
        if (!recognition) return alert('Speech recognition is not available.');
        if (recognitionActive) {
            if (micButton === currentActiveMicButton) { recognition.stop(); } 
            else { recognition.stop(); setTimeout(() => startNewRecognition(targetInputElement, micButton), 100); } // Stop current, then start new
        } else { startNewRecognition(targetInputElement, micButton); }
    }
    function startNewRecognition(targetInputElement, micButton) {
        currentActiveMicButton = micButton;
        recognition.onresult = (event) => { targetInputElement.value = event.results[0][0].transcript; };
        try { recognition.start(); recognitionActive = true; } 
        catch(e) { console.error("Error starting speech recognition:", e); alert("Could not start speech recognition."); recognitionActive = false; if(currentActiveMicButton) currentActiveMicButton.classList.remove('recording'); currentActiveMicButton = null; }
    }

    // --- Authentication (Puter) ---
    async function checkAuthStatus() {
        try { const isSignedIn = await puter.auth.isSignedIn(); updateAuthUI(isSignedIn); if (isSignedIn) { const user = await puter.auth.getUser(); if (usernameContainer) usernameContainer.textContent = user.username; } } 
        catch (error) { console.error("Error checking auth status:", error); updateAuthUI(false); }
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
        try { localStorage.setItem('theme', theme); } catch (e) { console.warn("LS Error (Theme):", e); }
        
        const activeFile = getActiveFile();
        const contentToPreview = activeFile ? activeFile.content : "No active file to preview.";
        const isError = contentToPreview.toLowerCase().startsWith("error");
        
        if (isError || !activeFile || (activeFile && activeFile.name !== 'index.html' && !activeFile.content.toLowerCase().includes('</html>'))) {
             updatePreviewFramePlaceholder(isError ? contentToPreview : "Preview available for HTML files only or no content.", isError);
        } else {
            updatePreviewFrameAndPopout(contentToPreview);
        }
        if (popOutWindow && !popOutWindow.closed && popOutWindow.setupPopOutSpecificUI) popOutWindow.setupPopOutSpecificUI(); 
    }
    
    function populateModelList() {
        if (!modelListContainer) return;
        modelListContainer.innerHTML = '';
        const currentDropdownModels = getSavedDropdownModels();
        allModels.forEach(model => {
            const div = document.createElement('div');
            const checkboxId = `model-checkbox-${model.replace(/[\/\.:-]/g, '_')}`; // Sanitize ID
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = checkboxId;
            checkbox.value = model;
            checkbox.checked = currentDropdownModels.includes(model);

            const label = document.createElement('label');
            label.htmlFor = checkboxId;
            label.textContent = escapeHTML(model);

            const detailsButton = document.createElement('button');
            detailsButton.textContent = 'Details';
            detailsButton.classList.add('modal-action-button', 'model-details-button');
            detailsButton.dataset.modelName = model;
            detailsButton.type = 'button'; // Important for forms or if other buttons default to submit
            detailsButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent checkbox toggle if label is clicked
                showModelDetails(model);
            });

            div.appendChild(checkbox);
            div.appendChild(label);
            div.appendChild(detailsButton);
            modelListContainer.appendChild(div);
        });
    }

    function showModelDetails(modelName) {
        if (!modelDetailsModal || !modelDetailsModalTitle || !modelDetailsContent) return;
        modelDetailsModalTitle.textContent = `Details: ${escapeHTML(modelName)}`;
        
        let details = `Provider: Puter.com (Assumed for this list)\n`;
        details += `Model ID: ${escapeHTML(modelName)}\n\n`;
        details += `Type: Large Language Model\n\n`;
        details += `Capabilities (Example):\n - Text generation\n - Chat completion\n - Summarization\n - Code generation (for some models)\n\n`;

        if (modelName.includes('gpt-')) details += `Base Model Family: GPT (OpenAI architecture family)\n`;
        else if (modelName.includes('claude-')) details += `Base Model Family: Claude (Anthropic architecture family)\n`;
        else if (modelName.includes('gemini-') || modelName.includes('gemma-')) details += `Base Model Family: Gemini/Gemma (Google architecture family)\n`;
        else if (modelName.includes('llama-')) details += `Base Model Family: Llama (Meta architecture family)\n`;
        else if (modelName.includes('mistral-') || modelName.includes('codestral') || modelName.includes('pixtral')) details += `Base Model Family: Mistral (Mistral AI architecture family)\n`;
        else if (modelName.includes('deepseek-')) details += `Base Model Family: DeepSeek (DeepSeek AI)\n`;
        else if (modelName.includes('grok-')) details += `Base Model Family: Grok (xAI)\n`;
        else if (modelName.includes('o1-') || modelName.includes('o3-') || modelName.includes('o4-')) details += `Base Model Family: Puter Optimized Series (Hypothetical)\n`;
        else details += `Further specific details for "${escapeHTML(modelName)}" would include:\n - Typical use cases\n - Context window size\n - Supported languages/modalities\n - Training data cutoff (if applicable)\n - Rate limits or pricing tiers (if applicable on Puter.com)\n\n`;
        
        details += `Note: This is placeholder information. For accurate and up-to-date details, please refer to official Puter.com documentation.`;

        modelDetailsContent.textContent = details;
        modelDetailsModal.classList.remove('hidden');
    }

    function getSavedDropdownModels() {
        const saved = localStorage.getItem('selectedModelsForDropdown');
        // A smaller, more reasonable default list if nothing is saved
        const defaultPuterModels = ['gpt-4o-mini', 'claude-3-5-sonnet', 'google/gemini-2.5-flash-preview', 'codestral-latest'];
        try {
            const parsed = JSON.parse(saved);
            return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultPuterModels;
        } catch {
            return defaultPuterModels;
        }
    }
    function saveDropdownModels(models) { try { localStorage.setItem('selectedModelsForDropdown', JSON.stringify(models)); } catch(e) {console.warn("LS Error (Save Models):", e);} }
    function populateModelDropdown() {
        if (!modelSelect) return;
        modelSelect.innerHTML = '';
        const modelsToDisplay = getSavedDropdownModels();
        modelsToDisplay.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
        const lastSelected = localStorage.getItem('lastSelectedModel');
        if (lastSelected && modelsToDisplay.includes(lastSelected)) modelSelect.value = lastSelected;
        else if (modelsToDisplay.length > 0) modelSelect.value = modelsToDisplay[0];
    }
    function applyTooltipsSetting(enable) { /* ... (no change from previous, ensure IDs match new icons if any) ... */ }
    
    // --- Checkpoints ---
    function createCheckpoint(reason = "Manual") {
        const currentPrompt = displayedGeneratePrompt.textContent || generatePromptInput.value || "N/A";
        const timestamp = new Date();
        // Deep copy projectFiles to avoid mutation issues
        const filesSnapshot = projectFiles.map(f => ({ ...f })); 
        const checkpoint = { id: timestamp.getTime(), files: filesSnapshot, prompt: currentPrompt, timestamp: timestamp.toISOString(), reason: reason, activeFilePathAtSave: activeFilePath };
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
    function showCheckpointsModal() { /* ... (UI rendering is same, data source is checkpoints array) ... */ }
    function restoreCheckpoint(id) {
        const checkpoint = checkpoints.find(cp => cp.id === id);
        if (checkpoint && checkpoint.files) {
            projectFiles = checkpoint.files.map(f => ({ ...f })); // Restore files (deep copy)
            activeFilePath = checkpoint.activeFilePathAtSave || projectFiles.find(f => f.name === 'index.html')?.path || projectFiles[0]?.path;
            
            openFileForEditing(activeFilePath); // This will update codeOutput and preview
            saveProjectFiles(); // Persist restored files
            renderFileExplorer(); // Update file explorer UI

            if (checkpoint.prompt && checkpoint.prompt !== "N/A") {
                generatePromptInput.value = checkpoint.prompt; 
                displayedGeneratePrompt.textContent = checkpoint.prompt;
                aiToolsSection1Content.classList.add('hidden');
                generatedPromptDisplay.classList.remove('hidden');
                aiToolsSection2.classList.remove('hidden');
                aiToolsSection3.classList.remove('hidden');
            } else { 
                generatePromptInput.value = ''; displayedGeneratePrompt.textContent = '';
                aiToolsSection1Content.classList.remove('hidden');
                generatedPromptDisplay.classList.add('hidden');
                aiToolsSection2.classList.add('hidden');
                aiToolsSection3.classList.add('hidden');
            }
            alert(`Restored checkpoint from ${new Date(checkpoint.timestamp).toLocaleTimeString()}`);
        } else { alert("Failed to find checkpoint or checkpoint data is corrupt."); }
        if (restoreCheckpointsModal) restoreCheckpointsModal.classList.add('hidden');
    }
    
    // --- File Management ---
    function saveProjectFiles() {
        try {
            localStorage.setItem('projectFiles', JSON.stringify(projectFiles));
            localStorage.setItem('activeFilePath', activeFilePath);
        } catch (e) { console.warn("LS Error (Save Project Files):", e); }
    }
    function loadProjectFiles() {
        try {
            const storedFiles = localStorage.getItem('projectFiles');
            if (storedFiles) projectFiles = JSON.parse(storedFiles);
            else projectFiles = [{ name: 'index.html', path: 'index.html', content: DEFAULT_BLANK_PROJECT_HTML_CONTENT, type: 'file' }];

            const storedActivePath = localStorage.getItem('activeFilePath');
            activeFilePath = storedActivePath && projectFiles.some(f => f.path === storedActivePath) ? storedActivePath : projectFiles[0]?.path;
        } catch (e) {
            console.warn("LS Error (Load Project Files):", e);
            projectFiles = [{ name: 'index.html', path: 'index.html', content: DEFAULT_BLANK_PROJECT_HTML_CONTENT, type: 'file' }];
            activeFilePath = 'index.html';
        }
        if (!getActiveFile() && projectFiles.length > 0) activeFilePath = projectFiles[0].path; // Ensure activeFilePath is valid
    }
    function renderFileExplorer() {
        if (!projectFileTree) return;
        projectFileTree.innerHTML = '';
        projectFiles.forEach(file => {
            const li = document.createElement('li');
            li.setAttribute('role', 'button');
            li.dataset.filePath = file.path;
            li.innerHTML = `<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg> <span>${escapeHTML(file.name)}</span>`; // Basic file icon
            if (file.path === activeFilePath) li.classList.add('active-file');
            li.addEventListener('click', () => openFileForEditing(file.path));
            projectFileTree.appendChild(li);
        });
    }
    function openFileForEditing(filePath) {
        activeFilePath = filePath;
        const file = getActiveFile();
        if (file) {
            codeOutput.textContent = file.content;
            updatePreviewFrameForActiveFile();
            if (codePanelTitle) codePanelTitle.textContent = `Code: ${file.name}`;
        } else {
            codeOutput.textContent = "Error: File not found.";
            updatePreviewFramePlaceholder("Error: File not found", true);
            if(codePanelTitle) codePanelTitle.textContent = "Code: Error";
        }
        renderFileExplorer(); // To update active highlight
        saveProjectFiles(); // Save new active file path
        // Ensure code editor is visible
        if (fileExplorer.classList.contains('hidden') === false) {
            toggleFileExplorerView(); 
        }
    }
     function updatePreviewFrameForActiveFile() {
        const file = getActiveFile();
        if (file) {
            // Only attempt to render HTML files directly in preview
            if (file.name.endsWith('.html')) {
                updatePreviewFrameAndPopout(file.content);
            } else {
                updatePreviewFramePlaceholder(`Previewing non-HTML file (${file.name}). Live preview for HTML only.`, false);
            }
        } else {
            updatePreviewFramePlaceholder("No active file.", true);
        }
    }
    function handleCreateNewFile() {
        const fileName = prompt("Enter new file name (e.g., style.css, script.js, page.html):");
        if (!fileName || projectFiles.some(f => f.name === fileName)) {
            alert(fileName ? "File already exists." : "File creation cancelled.");
            return;
        }
        const newFile = { name: fileName, path: fileName, content: `/* New file: ${fileName} */`, type: 'file' };
        if (fileName.endsWith('.html')) newFile.content = `<!DOCTYPE html>\n<html>\n<head><title>${fileName}</title></head>\n<body>\n  <h1>${fileName}</h1>\n</body>\n</html>`;
        else if (fileName.endsWith('.css')) newFile.content = `/* CSS for ${fileName} */\nbody {\n  font-family: sans-serif;\n}`;
        else if (fileName.endsWith('.js')) newFile.content = `// JavaScript for ${fileName}\nconsole.log('${fileName} loaded.');`;
        
        projectFiles.push(newFile);
        openFileForEditing(newFile.path);
        renderFileExplorer();
        saveProjectFiles();
    }
    function handleFileUpload(event) {
        const files = event.target.files;
        if (!files) return;
        Array.from(files).forEach(file => {
            if (projectFiles.some(pf => pf.name === file.name)) { alert(`File "${file.name}" already exists. Skipping.`); return; }
            const reader = new FileReader();
            reader.onload = (e) => {
                const newUploadedFile = { name: file.name, path: file.name, content: e.target.result, type: 'file' };
                projectFiles.push(newUploadedFile);
                if (projectFiles.length === 1 || activeFilePath === newUploadedFile.path) openFileForEditing(newUploadedFile.path); // Open if it's the first or matches current
                renderFileExplorer();
                saveProjectFiles();
            };
            reader.readAsText(file);
        });
        uploadFileInput.value = ''; // Reset input
    }
    function toggleFileExplorerView() {
        const isExplorerVisible = !fileExplorer.classList.contains('hidden');
        fileExplorer.classList.toggle('hidden');
        codeOutput.classList.toggle('hidden');
        filesButton.innerHTML = isExplorerVisible ? 
            `<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg> Files` : 
            `<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></svg> Code`;
        filesButton.setAttribute('aria-label', isExplorerVisible ? "Show Files" : "Show Code Editor");
        if (codePanelTitle) codePanelTitle.textContent = isExplorerVisible ? `Code: ${getActiveFile()?.name || 'N/A'}` : "File Explorer";
        if (!isExplorerVisible) renderFileExplorer(); // Render if switching to explorer
    }


    // --- AI & Code Generation ---
    function extractHtmlContent(aiResponseText) { /* ... (no change) ... */ }
    async function handleCodeGeneration(prompt, button, puterSystemPrompt, inputToClear = null, isModification = false) {
        if (!prompt) return alert("Please provide a prompt.");
        const activeFile = getActiveFile();
        if (!activeFile) { alert("No active file to generate or modify code for."); return; }
        const currentCodeContent = activeFile.content;

        if (isModification && (!currentCodeContent || currentCodeContent.startsWith("Error:"))) return alert("No valid code in the active file to modify.");
        if (autoCreateCheckpointToggle.checked) createCheckpoint(isModification ? "Auto before modification" : "Auto before generation");

        const originalButtonText = button.textContent; button.textContent = 'Thinking...'; button.disabled = true;
        updatePreviewFramePlaceholder("Generating code...");
        let generatedCodeText = "Error: AI response could not be processed."; // Default error

        try {
            if (useGeminiAPI && googleAi) {
                const geminiPromptParts = [];
                if (isModification) {
                    geminiPromptParts.push({ text: `Existing HTML code:\n\`\`\`html\n${currentCodeContent}\n\`\`\`\n\nModification request: ${prompt}\n\nReturn the complete, new, runnable HTML document. The output must ONLY be the raw HTML code, starting with \`<!DOCTYPE html>\` or \`<html>\`.` });
                } else {
                    geminiPromptParts.push({ text: `Generate a complete, single, runnable HTML file based on this request: ${prompt}. The HTML must include all necessary CSS and JavaScript. The output should ONLY be the raw HTML code, starting with \`<!DOCTYPE html>\` or \`<html>\`.` });
                }
                const response = await googleAi.models.generateContent({
                    model: GEMINI_TEXT_MODEL,
                    contents: { parts: geminiPromptParts },
                });
                generatedCodeText = response.text;

            } else { // Use Puter API
                const messages = [{ role: 'system', content: puterSystemPrompt }];
                if (isModification) {
                    messages.push({ role: 'user', content: `Modify the following HTML code:\n\`\`\`html\n${currentCodeContent}\n\`\`\`\n\nUser's request: ${prompt}\n\nReturn the full modified HTML code, starting with \`<!DOCTYPE html>\` or \`<html>\`.`});
                } else {
                    messages.push({ role: 'user', content: prompt });
                }
                const response = await puter.ai.chat(messages, { model: modelSelect.value });
                generatedCodeText = response.message.content;
            }
        } catch (error) {
            console.error("AI Error:", error);
            const errorMessage = error.message || "Unknown AI error.";
            generatedCodeText = `Error: AI generation failed. ${errorMessage}`;
            alert(`AI generation failed. ${errorMessage}`);
        }


        const finalHtmlCode = extractHtmlContent(generatedCodeText); // This might need adjustment if not HTML
        updateActiveFileContent(finalHtmlCode);
        codeOutput.textContent = finalHtmlCode; // Update editor
        updatePreviewFrameForActiveFile(); // Update preview

        if (inputToClear) inputToClear.value = '';
        else { 
            aiToolsSection1Content.classList.add('hidden');
            displayedGeneratePrompt.textContent = prompt;
            try { localStorage.setItem('lastSuccessfulInitialPrompt', prompt); } catch(e) {}
            generatedPromptDisplay.classList.remove('hidden');
            aiToolsSection2.classList.remove('hidden');
            aiToolsSection3.classList.remove('hidden');
            try { localStorage.setItem('initialGenerationDone', JSON.stringify(true)); } catch(e) {}
        }
        button.textContent = originalButtonText; button.disabled = false;
    }

    // --- Element Path Selector & Editor UI ---
    function getElementPathSelector(el) { /* ... (no change) ... */ }
    function updateMainElementEditorUI(element) { /* ... (no change) ... */ }
    function toggleMainAppElementSelectionMode() { /* ... (no change) ... */ }
    window.processSelectionFromAnywhere = (selector, sourceWindowType) => { /* ... (no change) ... */ };
    function setupPreviewInteractionListeners(doc, windowType, isPopOutEditorSelection = false) { /* ... (no change) ... */ }
    
    function applyMainAppManualElementChanges() {
        if (!currentSelectedElementSelector) return alert("No element selected.");
        const activeFile = getActiveFile();
        if (!activeFile || !activeFile.name.endsWith('.html')) { alert("Manual changes can only be applied to the active HTML file."); return;}
        
        const mainFrameEl = getElementBySelector(previewFrame.contentDocument, currentSelectedElementSelector);
        if (!mainFrameEl) return alert("Selected element not found in the main preview.");

        // ... (apply changes to mainFrameEl as before) ...
        const style = mainFrameEl.style;
        if (elementTextContentInput.value !== (mainFrameEl.firstChild?.nodeType === 3 ? mainFrameEl.firstChild.textContent.trim() : '') && mainFrameEl.firstChild?.nodeType === 3) {
             mainFrameEl.firstChild.textContent = elementTextContentInput.value;
        } else if (!mainFrameEl.children.length && mainFrameEl.firstChild?.nodeType !== 3){ // No children and not already text node
            mainFrameEl.textContent = elementTextContentInput.value;
        }

        style.color = elementColorInput.value;
        style.backgroundColor = elementBgColorInput.value;
        if(elementWidthInput.value) style.width = elementWidthInput.value;
        if(elementHeightInput.value) style.height = elementHeightInput.value;
        if(elementPaddingInput.value) style.padding = elementPaddingInput.value;
        if(elementMarginInput.value) style.margin = elementMarginInput.value;
        style.position = elementPositionSelect.value;
        style.display = elementDisplaySelect.value;
        if(elementBorderInput.value) style.border = elementBorderInput.value;

        
        const newHtml = previewFrame.contentDocument.documentElement.outerHTML;
        updateActiveFileContent(newHtml);
        codeOutput.textContent = newHtml;
        updatePreviewFrameAndPopout(newHtml, false, true); 
        alert("Manual changes applied to active HTML file.");
    }
    
    window.handleAIEditRequest = async (elementOuterHTML, aiPrompt, selectorToUpdate) => {
        if (!elementOuterHTML || !aiPrompt || !selectorToUpdate) { alert("Missing data for AI element edit."); return false; }
        const activeFile = getActiveFile();
        if (!activeFile || !activeFile.name.endsWith('.html')) { alert("AI element edits can only be applied to the active HTML file."); return false;}
        
        const mainFrameDoc = previewFrame.contentDocument;
        const mainFrameElToReplace = getElementBySelector(mainFrameDoc, selectorToUpdate);
        if (!mainFrameElToReplace) { alert("Element to replace not found in main preview for AI edit."); return false; }

        let modifiedElementHTML = "Error: AI element edit failed.";
        try {
            if (useGeminiAPI && googleAi) {
                const response = await googleAi.models.generateContent({
                    model: GEMINI_TEXT_MODEL,
                    contents: { parts: [{text: `Original HTML element:\n\`\`\`html\n${elementOuterHTML}\n\`\`\`\n\nModification request: ${aiPrompt}\n\nReturn ONLY the modified HTML for this single element.` }] },
                });
                modifiedElementHTML = response.text;
            } else {
                const messages = [
                    { role: 'system', content: "You are an expert web developer. You will be given an HTML element's code and a user's request to modify it. Return ONLY the modified HTML code for that element." },
                    { role: 'user', content: `Original Element:\n\`\`\`html\n${elementOuterHTML}\n\`\`\`\n\nRequest: ${aiPrompt}` }
                ];
                const response = await puter.ai.chat(messages, { model: modelSelect.value });
                modifiedElementHTML = response.message.content;
            }
             modifiedElementHTML = extractHtmlContent(modifiedElementHTML); // Ensure it's just HTML

            const tempContainer = mainFrameDoc.createElement('div');
            tempContainer.innerHTML = modifiedElementHTML;

            if (tempContainer.firstElementChild && mainFrameElToReplace.parentElement) {
                mainFrameElToReplace.parentElement.replaceChild(tempContainer.firstElementChild, mainFrameElToReplace);
                const newFullHtml = mainFrameDoc.documentElement.outerHTML;
                updateActiveFileContent(newFullHtml);
                codeOutput.textContent = newFullHtml;
                updatePreviewFrameAndPopout(newFullHtml, false, true); // Force highlight sync in case selector changed
                alert("Element modified by AI.");
                return true;
            } else {
                throw new Error("AI did not return a valid element or the original element was detached.");
            }

        } catch (error) {
            console.error("AI Element Edit Error:", error);
            alert(`Failed to edit element with AI: ${error.message}`);
            return false;
        }
    };
    
    // --- UI Updates, Placeholders, Pop-out & Preview Sync ---
    function getPreviewStyles() { /* ... (no change) ... */ }
    function updatePreviewFramePlaceholder(message, isError = false) { /* ... (no change) ... */ }
    function updatePreviewFrameAndPopout(htmlContent, isError = false, forceHighlightSync = false) { /* ... (no change) ... */ }
    const getPopOutEditorHTML = () => { /* ... (no change) ... */ };
    const getPopOutEditorCSS = (themeVars) => { /* ... (no change) ... */ };
    function handlePopOut() { /* ... (no change, but ensure it previews active HTML file) ... */ }

    // --- New Project Reset Function ---
    function resetToBlankProject() {
        projectFiles = [{ name: 'index.html', path: 'index.html', content: DEFAULT_BLANK_PROJECT_HTML_CONTENT, type: 'file' }];
        activeFilePath = 'index.html';
        saveProjectFiles();
        renderFileExplorer();
        openFileForEditing(activeFilePath);

        if (appProjectNameInput) appProjectNameInput.value = "Vibe Code Project";
        try { localStorage.setItem('appProjectName', "Vibe Code Project"); } catch (e) { console.warn("LS Error:", e); }
        if (generatePromptInput) generatePromptInput.value = '';
        if (modifyPromptInput) modifyPromptInput.value = '';
        if (editElementPromptInput) editElementPromptInput.value = '';
        if (aiToolsSection1Content) aiToolsSection1Content.classList.remove('hidden');
        if (generatedPromptDisplay) generatedPromptDisplay.classList.add('hidden');
        if (displayedGeneratePrompt) displayedGeneratePrompt.textContent = '';
        if (aiToolsSection2) aiToolsSection2.classList.add('hidden');
        if (aiToolsSection3) aiToolsSection3.classList.add('hidden');
        if (elementEditorControls) elementEditorControls.classList.add('hidden');
        if (selectedElementIdentifier) selectedElementIdentifier.textContent = 'N/A';
        currentSelectedElementSelector = null;
        try { localStorage.setItem('currentSelectedElementSelector', null); } catch (e) { console.warn("LS Error:", e); }
        if (isMainAppSelectingElement) toggleMainAppElementSelectionMode();
        try { localStorage.setItem('initialGenerationDone', JSON.stringify(false)); localStorage.setItem('lastSuccessfulInitialPrompt', '');} 
        catch(e) { console.warn("LS Error:", e); }
        alert("New blank project started. Your checkpoints are still available.");
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
    
    if (saveModelsButton) saveModelsButton.addEventListener('click', () => { 
        const selected = [...modelListContainer.querySelectorAll('input:checked')].map(cb => cb.value); 
        if (selected.length === 0) return alert("Please select at least one Puter model."); 
        saveDropdownModels(selected); 
        populateModelDropdown(); 
        alert('Puter model selection saved!'); 
        settingsModal.classList.add('hidden'); // Also close settings modal
    });

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
        if (!currentSelectedElementSelector || !prompt) return alert("No element selected or AI prompt provided for element edit.");
        applyElementAIEditButton.textContent = 'Applying...';
        applyElementAIEditButton.disabled = true;
        const targetElement = getElementBySelector(previewFrame.contentDocument, currentSelectedElementSelector);
        if (!targetElement) { alert("Target element for AI edit not found in preview."); applyElementAIEditButton.textContent = 'Apply AI Edit'; applyElementAIEditButton.disabled = false; return; }
        
        await window.handleAIEditRequest(targetElement.outerHTML, prompt, currentSelectedElementSelector);
        
        applyElementAIEditButton.textContent = 'Apply AI Edit';
        applyElementAIEditButton.disabled = false;
        editElementPromptInput.value = ''; // Clear prompt after attempt
    });

    if(fullscreenButton) fullscreenButton.addEventListener('click', () => previewFrame.requestFullscreen?.().catch(err => console.warn("Fullscreen request failed:", err)));
    if(popOutButton) popOutButton.addEventListener('click', handlePopOut);
    if (toggleAiToolsPanelButton) toggleAiToolsPanelButton.addEventListener('click', () => { 
        aiToolsContent.classList.toggle('hidden'); 
        const isHidden = aiToolsContent.classList.contains('hidden'); 
        toggleAiToolsPanelButton.innerHTML = isHidden ? 
            `<svg class="icon icon-toggle-panel" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>` : // Down arrow
            `<svg class="icon icon-toggle-panel" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>`; // Up arrow
        toggleAiToolsPanelButton.ariaLabel = isHidden ? 'Expand AI Tools Panel' : 'Collapse AI Tools Panel'; 
    });
    if (generateMicrophoneButton) generateMicrophoneButton.addEventListener('click', () => startDictation(generatePromptInput, generateMicrophoneButton));
    if (modifyMicrophoneButton) modifyMicrophoneButton.addEventListener('click', () => startDictation(modifyPromptInput, modifyMicrophoneButton));
    if (createCheckpointButton) createCheckpointButton.addEventListener('click', () => createCheckpoint("Manual"));
    if (autoCreateCheckpointToggle) autoCreateCheckpointToggle.addEventListener('change', () => { try { localStorage.setItem('autoCreateCheckpoints', autoCreateCheckpointToggle.checked); } catch (e) { console.warn("Could not save auto-checkpoint preference:", e); }});
    if (viewRestoreCheckpointsButton) viewRestoreCheckpointsButton.addEventListener('click', showCheckpointsModal);
    if (closeRestoreCheckpointsModal) closeRestoreCheckpointsModal.addEventListener('click', () => restoreCheckpointsModal.classList.add('hidden'));
    if (cancelRestoreCheckpointButton) cancelRestoreCheckpointButton.addEventListener('click', () => restoreCheckpointsModal.classList.add('hidden'));
    
    if (downloadActiveFileLink) downloadActiveFileLink.addEventListener('click', (e) => { 
        e.preventDefault(); 
        const file = getActiveFile();
        if(!file) {alert("No active file to download."); return;}
        const blob = new Blob([file.content], {type: 'text/plain'}); // Adjust MIME type based on file extension if needed
        const a = document.createElement('a'); 
        a.href = URL.createObjectURL(blob); 
        a.download = file.name; 
        a.click(); URL.revokeObjectURL(a.href); 
    });
    if (downloadZipLink) downloadZipLink.addEventListener('click', (e) => {e.preventDefault(); alert("ZIP Download of all project files coming soon!");});

    if (newProjectButton && confirmNewProjectModal) {
        newProjectButton.addEventListener('click', () => confirmNewProjectModal.classList.remove('hidden'));
        closeConfirmNewProjectModal.addEventListener('click', () => confirmNewProjectModal.classList.add('hidden'));
        confirmNewProjectCancelButton.addEventListener('click', () => confirmNewProjectModal.classList.add('hidden'));
        confirmNewProjectConfirmButton.addEventListener('click', () => {
            resetToBlankProject();
            confirmNewProjectModal.classList.add('hidden');
        });
    }

    // File Explorer Listeners
    if (filesButton) filesButton.addEventListener('click', toggleFileExplorerView);
    if (createNewFileButton) createNewFileButton.addEventListener('click', handleCreateNewFile);
    if (uploadFileTriggerButton) uploadFileTriggerButton.addEventListener('click', () => uploadFileInput.click());
    if (uploadFileInput) uploadFileInput.addEventListener('change', handleFileUpload);

    // Model Details Modal Listeners
    if (closeModelDetailsModal) closeModelDetailsModal.addEventListener('click', () => modelDetailsModal.classList.add('hidden'));
    if (closeModelDetailsModalFooter) closeModelDetailsModalFooter.addEventListener('click', () => modelDetailsModal.classList.add('hidden'));
    window.addEventListener('click', (event) => {
        if (event.target === modelDetailsModal) modelDetailsModal.classList.add('hidden');
        if (event.target === settingsModal) settingsModal.classList.add('hidden');
        if (event.target === restoreCheckpointsModal) restoreCheckpointsModal.classList.add('hidden');
        if (event.target === confirmNewProjectModal) confirmNewProjectModal.classList.add('hidden');
    });


    // --- Initialization ---
    function init() {
        checkAuthStatus(); 
        try { const storedTheme = localStorage.getItem('theme'); applyTheme(storedTheme || 'dark'); } 
        catch (e) { console.warn("Failed to load theme from localStorage", e); applyTheme('dark'); }
        try { const storedTooltips = localStorage.getItem('tooltipsEnabled'); if (tooltipsToggle && storedTooltips !== null) { tooltipsToggle.checked = JSON.parse(storedTooltips); applyTooltipsSetting(tooltipsToggle.checked); } else if (tooltipsToggle) { tooltipsToggle.checked = false; applyTooltipsSetting(false); } }
        catch (e) { console.warn("Could not load tooltips preference:", e); if(tooltipsToggle) {tooltipsToggle.checked = false; applyTooltipsSetting(false); }}
        
        // Gemini API Initialization and Preference
        let geminiReady = false;
        // Check for API_KEY presence indirectly by trying to initialize.
        // initializeGeminiClient() itself checks process.env.API_KEY.
        geminiReady = initializeGeminiClient();

        const storedGeminiPref = localStorage.getItem('useGeminiAPI');
        if (storedGeminiPref !== null) {
            // A preference exists, respect it
            useGeminiAPI = JSON.parse(storedGeminiPref);
            if (useGeminiAPI && !geminiReady) {
                // User preferred Gemini, but it failed to initialize this time (e.g., key removed/invalidated)
                console.warn("User preferred Gemini, but it failed to initialize. Falling back to Puter API.");
                if(geminiApiToggle) alert("Gemini API was enabled but failed to initialize. Check your API key. Falling back to Puter API.");
                useGeminiAPI = false;
            }
        } else {
            // No preference stored, default to Gemini if it initialized successfully
            useGeminiAPI = geminiReady;
            if (!geminiReady && process.env.API_KEY) { // if key was present but init failed
                 alert("Attempted to default to Gemini API, but initialization failed. Ensure API_KEY is correctly configured. Falling back to Puter API.");
            }
        }
        if (geminiApiToggle) geminiApiToggle.checked = useGeminiAPI;
        updateApiUsageUI();

        populateModelList(); populateModelDropdown(); 
        setupSpeechRecognition(); loadCheckpoints();
        try { const autoCreatePref = localStorage.getItem('autoCreateCheckpoints'); if (autoCreateCheckpointToggle && autoCreatePref !== null) autoCreateCheckpointToggle.checked = JSON.parse(autoCreatePref); else if (autoCreateCheckpointToggle) { autoCreateCheckpointToggle.checked = true; localStorage.setItem('autoCreateCheckpoints', JSON.stringify(true)); }} 
        catch(e) { console.warn("Could not load/set auto-checkpoint preference:", e); if(autoCreateCheckpointToggle) autoCreateCheckpointToggle.checked = true; }

        loadProjectFiles(); // Load files and active file path
        
        const activeFileToLoad = getActiveFile();
        codeOutput.textContent = activeFileToLoad ? activeFileToLoad.content : "No files in project or error loading.";
        updatePreviewFrameForActiveFile();
        renderFileExplorer();
        if(codePanelTitle && activeFileToLoad) codePanelTitle.textContent = `Code: ${activeFileToLoad.name}`;


        let initialPrompt = ''; let initialGenDone = false;
        try {
            const storedInitialPrompt = localStorage.getItem('lastSuccessfulInitialPrompt'); if(storedInitialPrompt) initialPrompt = storedInitialPrompt;
            const storedGenDone = localStorage.getItem('initialGenerationDone'); if(storedGenDone) initialGenDone = JSON.parse(storedGenDone);
            const storedProjectName = localStorage.getItem('appProjectName'); if(appProjectNameInput && storedProjectName) appProjectNameInput.value = storedProjectName;
            const storedSelectedElement = localStorage.getItem('currentSelectedElementSelector'); if(storedSelectedElement && storedSelectedElement !== "null") currentSelectedElementSelector = JSON.parse(storedSelectedElement); else currentSelectedElementSelector = null;
        } catch(e) { console.warn("Error loading state from localStorage during init", e); }
        
        if(initialGenDone && initialPrompt) {
            if (generatePromptInput) generatePromptInput.value = initialPrompt;
            if (displayedGeneratePrompt) displayedGeneratePrompt.textContent = initialPrompt;
            if (aiToolsSection1Content) aiToolsSection1Content.classList.add('hidden');
            if (generatedPromptDisplay) generatedPromptDisplay.classList.remove('hidden');
            if (aiToolsSection2) aiToolsSection2.classList.remove('hidden');
            if (aiToolsSection3) aiToolsSection3.classList.remove('hidden');
        } else {
            if (aiToolsSection1Content) aiToolsSection1Content.classList.remove('hidden');
            if (generatedPromptDisplay) generatedPromptDisplay.classList.add('hidden');
            if (aiToolsSection2) aiToolsSection2.classList.add('hidden');
            if (aiToolsSection3) aiToolsSection3.classList.add('hidden');
        }
        
        setupPreviewInteractionListeners(previewFrame.contentDocument, 'iframe'); 
        if(currentSelectedElementSelector && previewFrame.contentDocument){ 
            const elToHighlight = getElementBySelector(previewFrame.contentDocument, currentSelectedElementSelector);
            if (elToHighlight && window.processSelectionFromAnywhere) { // Ensure function exists
                 // This will internally call updateMainElementEditorUI and setup highlights
                 window.processSelectionFromAnywhere(currentSelectedElementSelector, 'iframe_restore');
            }
        }
        if (isMainAppSelectingElement) { // if it was true from a previous bad state, reset it.
            isMainAppSelectingElement = false; // reset
            toggleMainAppElementSelectionMode(); // call once to set OFF state
        }

        // Set initial state for panel toggle icon
        const isAiToolsHidden = aiToolsContent.classList.contains('hidden');
        toggleAiToolsPanelButton.innerHTML = isAiToolsHidden ? 
            `<svg class="icon icon-toggle-panel" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>` : // Down arrow
            `<svg class="icon icon-toggle-panel" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>`; // Up arrow
         toggleAiToolsPanelButton.setAttribute('aria-label', isAiToolsHidden ? 'Expand AI Tools Panel' : 'Collapse AI Tools Panel');
    }
    init();
});
