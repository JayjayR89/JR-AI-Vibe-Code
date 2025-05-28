
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
    const tabContents = document.querySelectorAll('.modal-content .tab-content'); // More specific selector for settings tabs
    const appVersionSpan = getElem('appVersion');
    const appProjectNameInput = getElem('appProjectNameInput');
    const appMemoryToggle = getElem('appMemoryToggle');
    const fileContextToggle = getElem('fileContextToggle');
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
    const codeOutputWrapper = getElem('codeOutputWrapper');
    const codeOutput = getElem('codeOutput');
    const filesButton = getElem('filesButton');
    const filesToolbar = getElem('filesToolbar');
    const fileTabsContainer = getElem('fileTabsContainer');
    const newFileButton = getElem('newFileButton');
    const uploadFileButton = getElem('uploadFileButton');
    const uploadFolderButton = getElem('uploadFolderButton');
    const fileUploader = getElem('fileUploader');
    const folderUploader = getElem('folderUploader');
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
    const downloadHtmlLink = getElem('downloadHtml');
    const downloadZipLink = getElem('downloadZip');
    const welcomeModal = getElem('welcomeModal');
    const projectTypeButtons = document.querySelectorAll('.project-type-button');
    const dontShowWelcomeAgainCheckbox = getElem('dontShowWelcomeAgain');
    const addKnowledgeDocButton = getElem('addKnowledgeDocButton');
    const addKnowledgeDocModal = getElem('addKnowledgeDocModal');
    const closeAddKnowledgeDocModal = getElem('closeAddKnowledgeDocModal');
    const knowledgeDocTitleInput = getElem('knowledgeDocTitleInput');
    const knowledgeDocContentInput = getElem('knowledgeDocContentInput');
    const saveKnowledgeDocButton = getElem('saveKnowledgeDocButton');
    const cancelAddKnowledgeDocButton = getElem('cancelAddKnowledgeDocButton');
    const knowledgeListContainer = getElem('knowledgeListContainer');
    const noKnowledgeDocsMessage = getElem('noKnowledgeDocsMessage');
    const modelDetailsModal = getElem('modelDetailsModal');
    const closeModelDetailsModal = getElem('closeModelDetailsModal');
    const modelDetailsContent = getElem('modelDetailsContent');
    const closeModelDetailsFooterButton = getElem('closeModelDetailsFooterButton');

    const APP_VERSION = '1.0.7'; 
    if(appVersionSpan) appVersionSpan.textContent = APP_VERSION;

    // --- State & Constants ---
    const GEMINI_TEXT_MODEL = 'gemini-2.5-flash-preview-04-17';
    let useGeminiAPI = false;
    let googleAi = null;
    let checkpoints = [];
    let knowledgeDocs = [];
    let projectFiles = [];
    let activeFileName = 'index.html';
    let popOutWindow = null;
    let currentSelectedElementSelector = null; 
    let isMainAppSelectingElement = false; 
    let recognition = null;
    const defaultReadmeContent = `# Welcome to Your Vibe Code Canvas Project!

This project was generated and can be edited using Vibe Code Canvas.

## Current Files:
- **index.html**: The main HTML structure of your application.
- **README.md**: This file.
- (Other files will be listed here as you create or upload them)

## How to Use:
1.  **Describe your UI**: Use the AI tools in the left panel to generate the initial HTML for \`index.html\`.
2.  **Modify Code**: Make changes to the generated code using AI prompts. This will apply to the currently active file.
3.  **Edit Elements**: Select elements directly in the live preview (which shows \`index.html\`) to edit their styles or content.
4.  **Manage Files**: Use the "Files" toolbar above the code editor to switch between files, create new files (e.g., \`style.css\`, \`script.js\`), or upload existing ones.
    *   **Note**: For CSS and JS to affect your \`index.html\` preview, you'll need to include them with \`<link>\` or \`<script>\` tags in your \`index.html\` file, just like in standard web development. The AI can help you do this!
5.  **Live Preview**: See your \`index.html\` changes in real-time. Pop it out or go fullscreen for a better view.
6.  **Knowledge Base**: Add documents to the Knowledge tab in Settings to give the AI context about your project, APIs, or specific requirements.
7.  **Checkpoints**: Save your progress (all project files) using checkpoints.

Happy Vibe Coding!
`;

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
    const escapeHTML = (str) => str ? str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag])) : '';
    const rgbToHex = (rgb) => { 
        if (!rgb || !rgb.startsWith('rgb')) return null;
        try {
            const match = rgb.match(/(\d+),\s*(\d+),\s*(\d+)/);
            if (!match) return null;
            const [, rStr, gStr, bStr] = match;
            const r = parseInt(rStr, 10);
            const g = parseInt(gStr, 10);
            const b = parseInt(bStr, 10);
            if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
        } catch (e) {
            console.warn("Error converting RGB to Hex:", rgb, e);
            return null;
        }
    };
    function getElementBySelector(doc, selector) { try { return doc.querySelector(selector); } catch (e) { console.warn("getElementBySelector error:", e); return null; } }
    
    function loadFromLocalStorage(key, defaultValue = null) {
        try { const item = localStorage.getItem(key); return item ? JSON.parse(item) : defaultValue; } 
        catch (e) { console.warn(`Failed to load ${key} from localStorage:`, e); return defaultValue; }
    }
    function saveToLocalStorage(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); } 
        catch (e) { console.warn(`Failed to save ${key} to localStorage:`, e); }
    }

    // --- Gemini API Initialization ---
    function initializeGeminiClient() { 
        try {
            if (!process.env.API_KEY) {
                alert("Gemini API key (process.env.API_KEY) is not set. Gemini API will be disabled.");
                return false;
            }
            googleAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
            return true;
        } catch (error) {
            console.error("Failed to initialize Gemini AI Client:", error);
            alert("Failed to initialize Gemini AI. Please check your API key and network. Gemini API will be disabled.");
            return false;
        }
    }
    
    // --- API Usage Management ---
    function updateApiUsageUI() { 
        authContainer.classList.toggle('hidden', useGeminiAPI);
        if (modelSelect) modelSelect.classList.toggle('hidden', useGeminiAPI);
        if (puterModelLabel) puterModelLabel.classList.toggle('hidden', useGeminiAPI);
        if (geminiModelLabelElement) {
            geminiModelLabelElement.classList.toggle('hidden', !useGeminiAPI);
            if (useGeminiAPI) {
                geminiModelLabelElement.textContent = `Model: ${GEMINI_TEXT_MODEL}`;
            }
        }
        saveToLocalStorage('useGeminiAPI', useGeminiAPI);
    }


    // --- Speech Recognition ---
    function setupSpeechRecognition() { 
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (window.SpeechRecognition) {
            recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                alert(`Speech recognition error: ${event.error}`);
            };
             [generateMicrophoneButton, modifyMicrophoneButton].forEach(btn => {
                if(btn) btn.disabled = false;
            });
        } else {
            console.warn('Speech Recognition API not supported.');
            [generateMicrophoneButton, modifyMicrophoneButton].forEach(btn => {
                if(btn) { btn.disabled = true; btn.title = "Speech recognition not supported"; }
            });
        }
    }
    function startDictation(targetInputElement) { 
        if (!recognition) return alert('Speech recognition is not available or not enabled.');
        recognition.onresult = (event) => {
            targetInputElement.value = event.results[0][0].transcript;
        };
        try {
            recognition.start();
        } catch(e) {
            console.error("Error starting speech recognition:", e);
            alert("Could not start speech recognition. Make sure microphone permission is granted.");
        }
    }

    // --- Authentication (Puter) ---
    async function checkAuthStatus() { 
        try {
            const isSignedIn = await puter.auth.isSignedIn();
            updateAuthUI(isSignedIn);
            if (isSignedIn) {
                const user = await puter.auth.getUser();
                if (usernameContainer) usernameContainer.textContent = user.username;
            }
        } catch (error) {
            console.error("Error checking auth status:", error);
            updateAuthUI(false);
        }
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
        saveToLocalStorage('theme', theme);
        
        const indexHtmlFile = projectFiles.find(f => f.name === 'index.html');
        const htmlContentForPreview = indexHtmlFile ? indexHtmlFile.content : "<p>Error: index.html not found in project files.</p>";
        const isErrorContent = !indexHtmlFile || htmlContentForPreview.toLowerCase().startsWith("error");
        const isPlaceholderContent = htmlContentForPreview.startsWith("No code generated yet.") || htmlContentForPreview.startsWith("<!-- Your HTML code will appear here -->");
        
        if (isErrorContent || isPlaceholderContent) {
            const message = isErrorContent ? htmlContentForPreview : "Preview will appear here";
            updatePreviewFramePlaceholder(message, isErrorContent);
        } else {
            updatePreviewFrameAndPopout(htmlContentForPreview);
        }

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
            div.classList.add('model-list-item');
            const checkboxId = `model-checkbox-${model.replace(/[\/\.:-]/g, '_')}`;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = checkboxId;
            checkbox.value = model;
            checkbox.checked = currentDropdownModels.includes(model);
            
            const label = document.createElement('label');
            label.htmlFor = checkboxId;
            label.textContent = model;

            const detailsButton = document.createElement('button');
            detailsButton.classList.add('model-details-button');
            detailsButton.textContent = 'Details';
            detailsButton.dataset.modelName = model;
            detailsButton.addEventListener('click', () => showModelDetails(model));

            div.appendChild(checkbox);
            div.appendChild(label);
            div.appendChild(detailsButton);
            modelListContainer.appendChild(div);
        });
    }
    function showModelDetails(modelName) { 
        if (modelDetailsModal && modelDetailsContent) {
            modelDetailsContent.innerHTML = `
                <p><strong>Model:</strong> ${escapeHTML(modelName)}</p>
                <p><strong>Type:</strong> Text Generation (example)</p>
                <p><strong>Provider:</strong> Puter.com (example)</p>
                <p><em>Note: Specific model capabilities vary. This is placeholder information.</em></p>
            `;
            modelDetailsModal.classList.remove('hidden');
        }
    }
    function getSavedDropdownModels() { return loadFromLocalStorage('selectedModelsForDropdown', ['gpt-4o-mini', 'claude-3-5-sonnet', 'google/gemini-2.5-flash-preview']); }
    function saveDropdownModels(models) { saveToLocalStorage('selectedModelsForDropdown', models); }
    function populateModelDropdown() {
        if (!modelSelect) return;
        modelSelect.innerHTML = '';
        const modelsToDisplay = getSavedDropdownModels();
        modelsToDisplay.forEach(model => { const option = document.createElement('option'); option.value = model; option.textContent = model; modelSelect.appendChild(option); });
        const lastSelected = loadFromLocalStorage('lastSelectedModel');
        modelSelect.value = (lastSelected && modelsToDisplay.includes(lastSelected)) ? lastSelected : (modelsToDisplay.length > 0 ? modelsToDisplay[0] : '');
    }
    function applyTooltipsSetting(enable) { 
        const tooltipMap = {
            'loginButton': 'Login with Puter.com to save and sync.',
            'logoutButton': 'Logout from Puter.com.',
            'settingsButton': 'Open application settings.',
            'appProjectNameInput': 'Set the name for your current project. Used for ZIP download.',
            'downloadButton': 'Download your project files.',
            'downloadHtml': 'Download the active HTML file (usually index.html).',
            'downloadZip': 'Download all project files as a ZIP archive.',
            'toggleAiToolsPanel': 'Toggle visibility of the AI Tools panel.',
            'generateMicrophoneButton': 'Use microphone to dictate UI description.',
            'generateCodeButton': 'Generate code based on your UI description.',
            'editInitialPromptButton': 'Edit your initial UI description.',
            'modifyMicrophoneButton': 'Use microphone to dictate modifications.',
            'modifyCodeButton': 'Modify the current code based on your instructions.',
            'selectElementButton': 'Toggle element selection mode in the preview to edit specific parts.',
            'autoCreateCheckpointToggle': 'Automatically save a checkpoint before generating or modifying code.',
            'createCheckpointButton': 'Manually save the current state of all project files.',
            'viewRestoreCheckpointsButton': 'View and restore previous versions of your project.',
            'filesButton': 'Toggle visibility of the file management toolbar.',
            'newFileButton': 'Create a new file in the project (e.g., style.css, script.js).',
            'uploadFileButton': 'Upload a single file to your project.',
            'uploadFolderButton': 'Upload an entire folder of files to your project.',
            'selectElementsToggle': 'Toggle element selection mode in the live preview.',
            'popOutButton': 'Open the live preview in a new, resizable window.',
            'fullscreenButton': 'View the live preview in fullscreen mode.',
            'darkModeToggle': 'Switch between dark and light UI themes.',
            'tooltipsToggle': 'Enable or disable these descriptive tooltips.',
            'geminiApiToggle': 'Switch to use Google Gemini API (requires API key). Overrides Puter models.',
            'saveModelsButton': 'Save your preferred Puter.com models for the dropdown menu.',
            'addKnowledgeDocButton': 'Add a new text document to the AI\'s knowledge base for better context.',
            'appMemoryToggle': '(Future Feature) Enable persistent chat history for AI context.',
            'fileContextToggle': '(Future Feature) Allow AI to consider all project files when generating code.'
        };
        
        for (const id in tooltipMap) {
            const element = getElem(id);
            if (element) { element.title = enable ? tooltipMap[id] : ''; }
        }
        saveToLocalStorage('tooltipsEnabled', enable);
    }
    
    // --- File Management ---
    function renderFileTabs() {
        if (!fileTabsContainer) return;
        fileTabsContainer.innerHTML = '';
        projectFiles.forEach(file => {
            const tab = document.createElement('button');
            tab.classList.add('file-tab');
            tab.textContent = file.name;
            tab.dataset.filename = file.name;
            if (file.name === activeFileName) {
                tab.classList.add('active');
            }
            tab.addEventListener('click', () => setActiveFile(file.name));
            fileTabsContainer.appendChild(tab);
        });
        saveToLocalStorage('projectFiles', projectFiles);
        saveToLocalStorage('activeFileName', activeFileName);
    }

    function setActiveFile(fileName, newContent = null) {
        const fileToActivate = projectFiles.find(f => f.name === fileName);
        if (!fileToActivate) {
            console.error(`File not found: ${fileName}. Defaulting to index.html or first file.`);
            activeFileName = projectFiles.length > 0 ? projectFiles[0].name : null;
        } else {
            activeFileName = fileName;
        }
        
        projectFiles.forEach(f => f.active = (f.name === activeFileName));

        const activeFileObject = projectFiles.find(f => f.name === activeFileName);
        if (newContent !== null) { 
            if(activeFileObject) activeFileObject.content = newContent;
        }
        if (codeOutput) codeOutput.textContent = activeFileObject ? activeFileObject.content : 'Error: Active file not found or content missing.';
        
        const indexHtmlFile = projectFiles.find(f => f.name === 'index.html');
        if (indexHtmlFile) {
            updatePreviewFrameAndPopout(indexHtmlFile.content);
        } else {
            updatePreviewFramePlaceholder("Error: index.html not found. Preview cannot be rendered.", true);
        }
        renderFileTabs(); 
    }
    
    function handleNewFile() {
        const fileName = prompt("Enter new file name (e.g., style.css, script.js, README.md):");
        if (!fileName || fileName.trim() === "") return;
        if (projectFiles.some(f => f.name === fileName)) {
            alert("A file with this name already exists.");
            return;
        }
        projectFiles.push({ name: fileName, content: `/* New file: ${fileName} */\n`, active: false });
        setActiveFile(fileName);
    }

    function handleFileUpload(event) {
        const files = event.target.files;
        if (!files) return;
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const existingFileIndex = projectFiles.findIndex(pf => pf.name === file.name);
                if (existingFileIndex > -1) {
                    if (confirm(`File "${file.name}" already exists. Overwrite?`)) {
                        projectFiles[existingFileIndex].content = e.target.result;
                        if (projectFiles[existingFileIndex].name === activeFileName) {
                           setActiveFile(file.name, e.target.result); // Update editor if active
                        } else {
                           projectFiles[existingFileIndex].active = false; // Ensure it's not spuriously made active
                           renderFileTabs(); // Just update tabs if not active
                        }
                    }
                } else {
                    projectFiles.push({ name: file.name, content: e.target.result, active: false });
                    setActiveFile(file.name, e.target.result); 
                }
            };
            reader.readAsText(file);
        });
        if (event.target) event.target.value = null; 
    }
    
    function updateActiveFileContentFromEditor() {
        if (!activeFileName || !codeOutput) return;
        const activeFile = projectFiles.find(f => f.name === activeFileName);
        if (activeFile && codeOutput.textContent !== activeFile.content) {
            activeFile.content = codeOutput.textContent;
            saveToLocalStorage('projectFiles', projectFiles); 
            if (activeFile.name === 'index.html') {
                updatePreviewFrameAndPopout(activeFile.content);
            }
        }
    }

    // --- Knowledge Base ---
    function loadKnowledgeDocs() { knowledgeDocs = loadFromLocalStorage('knowledgeDocs', []); renderKnowledgeList(); }
    function saveKnowledgeDocs() { saveToLocalStorage('knowledgeDocs', knowledgeDocs); }
    function renderKnowledgeList() { 
        if (!knowledgeListContainer || !noKnowledgeDocsMessage) return;
        knowledgeListContainer.innerHTML = '';
        if (knowledgeDocs.length === 0) {
            noKnowledgeDocsMessage.classList.remove('hidden');
            return;
        }
        noKnowledgeDocsMessage.classList.add('hidden');
        knowledgeDocs.forEach((doc, index) => {
            const item = document.createElement('div');
            item.classList.add('knowledge-item');
            item.innerHTML = `
                <span class="knowledge-item-title" title="${escapeHTML(doc.title)}">${escapeHTML(doc.title)}</span>
                <div class="knowledge-item-actions">
                    <label class="switch">
                        <input type="checkbox" class="knowledge-active-toggle" data-index="${index}" ${doc.active ? 'checked' : ''}>
                        <span class="slider round"></span>
                    </label>
                    <button class="delete-knowledge-button" data-index="${index}" aria-label="Delete document ${escapeHTML(doc.title)}">🗑️</button>
                </div>
            `;
            knowledgeListContainer.appendChild(item);
        });
        knowledgeListContainer.querySelectorAll('.knowledge-active-toggle').forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                knowledgeDocs[e.target.dataset.index].active = e.target.checked;
                saveKnowledgeDocs();
            });
        });
        knowledgeListContainer.querySelectorAll('.delete-knowledge-button').forEach(button => {
            button.addEventListener('click', (e) => {
                if (confirm(`Are you sure you want to delete the document "${knowledgeDocs[e.target.dataset.index].title}"?`)) {
                    knowledgeDocs.splice(e.target.dataset.index, 1);
                    saveKnowledgeDocs();
                    renderKnowledgeList();
                }
            });
        });
    }
    function handleSaveKnowledgeDoc() { 
        const title = knowledgeDocTitleInput.value.trim();
        const content = knowledgeDocContentInput.value.trim();
        if (!title || !content) return alert("Both title and content are required.");
        knowledgeDocs.push({ title, content, active: true });
        saveKnowledgeDocs();
        renderKnowledgeList();
        knowledgeDocTitleInput.value = '';
        knowledgeDocContentInput.value = '';
        addKnowledgeDocModal.classList.add('hidden');
    }
    function getActiveKnowledgeContent() { 
        return knowledgeDocs.filter(doc => doc.active).map(doc => `Title: ${doc.title}\nContent:\n${doc.content}`).join("\n\n---\n\n");
    }

    // --- Checkpoints ---
    function createCheckpoint(reason = "Manual") {
        const checkpoint = {
            id: Date.now(),
            timestamp: new Date().toLocaleString(),
            reason: reason,
            projectFiles: JSON.parse(JSON.stringify(projectFiles)),
            activeFileName: activeFileName
        };
        checkpoints.push(checkpoint);
        saveToLocalStorage('checkpoints', checkpoints);
        updateCheckpointsStatus();
    }
    function loadCheckpoints() { checkpoints = loadFromLocalStorage('checkpoints', []); updateCheckpointsStatus(); }
    function updateCheckpointsStatus() { 
        if (!checkpointsStatus) return;
        checkpointsStatus.textContent = checkpoints.length > 0 ? 
            `${checkpoints.length} checkpoint${checkpoints.length > 1 ? 's' : ''} available.` : 
            "No checkpoints created yet.";
    }
    function showCheckpointsModal() { 
        if (!checkpointsListContainer || !noCheckpointsMessage || !restoreCheckpointsModal) return;
        checkpointsListContainer.innerHTML = '';
        if (checkpoints.length === 0) {
            noCheckpointsMessage.classList.remove('hidden');
        } else {
            noCheckpointsMessage.classList.add('hidden');
            checkpoints.slice().reverse().forEach(cp => { // Show newest first
                const item = document.createElement('div');
                item.classList.add('checkpoint-list-item');
                item.dataset.checkpointId = cp.id;
                item.innerHTML = `<strong>${escapeHTML(cp.reason)}</strong> <span class="timestamp">(${escapeHTML(cp.timestamp)})</span>`;
                item.addEventListener('click', () => restoreCheckpoint(cp.id));
                checkpointsListContainer.appendChild(item);
            });
        }
        restoreCheckpointsModal.classList.remove('hidden');
    }
    function restoreCheckpoint(id) {
        const checkpoint = checkpoints.find(c => c.id === parseInt(id));
        if (!checkpoint) return alert("Checkpoint not found.");
        projectFiles = JSON.parse(JSON.stringify(checkpoint.projectFiles)); 
        setActiveFile(checkpoint.activeFileName || 'index.html'); 
        
        if (restoreCheckpointsModal) restoreCheckpointsModal.classList.add('hidden');
        alert(`Restored to checkpoint from ${checkpoint.timestamp}.`);
    }
    
    // --- AI & Code Generation ---
    function extractHtmlContent(aiResponseText) { 
        if (!aiResponseText) return "";
        const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
        const match = aiResponseText.match(fenceRegex);
        if (match && match[2]) {
          return match[2].trim();
        }
        return aiResponseText.trim(); 
    }

    async function handleCodeGeneration(prompt, button, puterSystemPrompt, isModification = false) {
        if (!prompt) return alert("Please provide a prompt.");
        const activeFile = projectFiles.find(f => f.name === activeFileName);
        if (!activeFile) return alert("No active file to modify or generate code into.");
        
        const noCodeYetMessages = ["No code generated yet.", "<!-- Your HTML code will appear here -->"];
        const isActiveFileEmpty = !activeFile.content || noCodeYetMessages.some(msg => activeFile.content.includes(msg));

        if (isModification && isActiveFileEmpty) return alert("No valid code in active file to modify.");
        if (autoCreateCheckpointToggle.checked) createCheckpoint(isModification ? "Auto before modification" : "Auto before generation");

        const originalButtonText = button.textContent; button.textContent = 'Thinking...'; button.disabled = true;
        if (activeFile.name === 'index.html') updatePreviewFramePlaceholder("Generating code...");
        let generatedCodeText;
        
        const activeKnowledge = getActiveKnowledgeContent();
        const knowledgePreamble = activeKnowledge ? `Consider the following information as relevant context (Knowledge Base):\n${activeKnowledge}\n\n---\n\n` : "";

        if (useGeminiAPI) {
            if (!googleAi) { alert("Gemini AI client not initialized."); button.textContent = originalButtonText; button.disabled = false; return; }
            let geminiContents;
            const currentCodeForModification = isActiveFileEmpty ? "" : activeFile.content;
            if (isModification) { 
                geminiContents = `${knowledgePreamble}You are an expert web developer. Modify the following code for the file named "${activeFile.name}" based on the user's request. Return ONLY the full, complete, runnable, modified code for this file.\n\nExisting Code in "${activeFile.name}":\n\`\`\`${activeFile.name.split('.').pop()}\n${currentCodeForModification}\n\`\`\`\n\nUser's modification request: ${prompt}`;
            } else { 
                geminiContents = `${knowledgePreamble}You are an expert web developer. Generate complete, runnable code for a file named "${activeFile.name}" based on the user's request. The output should ONLY be the raw code for this file.\n\nUser's request: ${prompt}`; 
            }
            try { const response = await googleAi.models.generateContent({ model: GEMINI_TEXT_MODEL, contents: geminiContents }); generatedCodeText = response.text; } 
            catch (error) { console.error("Gemini API Error:", error); alert(`Gemini API Error: ${error.message}`); button.textContent = originalButtonText; button.disabled = false; return; }
        } else { 
            const messages = [{ role: 'system', content: `${knowledgePreamble}${puterSystemPrompt}` }];
            if (isModification) messages.push({ role: 'user', content: `Modify the following code in file "${activeFile.name}":\n\`\`\`${activeFile.name.split('.').pop()}\n${activeFile.content}\n\`\`\`\n\nUser's request: ${prompt}\n\nReturn the full modified code for "${activeFile.name}":`});
            else messages.push({ role: 'user', content: `Generate code for file "${activeFile.name}" based on this request: ${prompt}` });
            try { const response = await puter.ai.chat(messages, { model: modelSelect.value }); generatedCodeText = response.message.content; } 
            catch (error) { console.error("Puter AI Error:", error); alert(`Puter AI Error: ${error.message}`); button.textContent = originalButtonText; button.disabled = false; return; }
        }
        const finalCode = extractHtmlContent(generatedCodeText); 
        activeFile.content = finalCode;
        if (codeOutput) codeOutput.textContent = finalCode; 
        if (activeFile.name === 'index.html') {
            updatePreviewFrameAndPopout(finalCode);
        }
        saveToLocalStorage('projectFiles', projectFiles);

        if (!isModification && generatePromptInput) { 
            generatePromptInput.value = '';
            if (aiToolsSection1Content) aiToolsSection1Content.classList.add('hidden');
            if (displayedGeneratePrompt) displayedGeneratePrompt.textContent = prompt;
            if (generatedPromptDisplay) generatedPromptDisplay.classList.remove('hidden');
            if (aiToolsSection2) aiToolsSection2.classList.remove('hidden');
            if (aiToolsSection3) aiToolsSection3.classList.remove('hidden');
        } else if (isModification && modifyPromptInput) { 
             modifyPromptInput.value = '';
        }
        button.textContent = originalButtonText; button.disabled = false;
    }

    // --- Element Path Selector ---
    function getElementPathSelector(el) { 
        if (!(el instanceof Element)) return null;
        const path = [];
        while (el.nodeType === Node.ELEMENT_NODE) {
            let selector = el.nodeName.toLowerCase();
            if (el.id) {
                selector += `#${el.id}`;
                path.unshift(selector);
                break; 
            } else {
                let sib = el, nth = 1;
                while (sib = sib.previousElementSibling) {
                    if (sib.nodeName.toLowerCase() === selector) nth++;
                }
                if (nth !== 1) selector += `:nth-of-type(${nth})`;
            }
            path.unshift(selector);
            el = el.parentNode;
        }
        return path.join(' > ');
    }
    
    // --- Main App Element Editor UI Update ---
    function updateMainElementEditorUI(element) { 
        if (!element || !elementEditorControls) return;
        const computedStyle = (element.ownerDocument.defaultView || window).getComputedStyle(element);
        const tagName = element.tagName.toLowerCase();
        const id = element.id ? `#${element.id}` : '';
        const classes = element.className ? `.${[...element.classList].filter(c => !c.startsWith('preview-element-')).join('.')}` : '';
        
        if(selectedElementIdentifier) selectedElementIdentifier.textContent = `${tagName}${id}${classes}`;
        if(elementTextContentInput) elementTextContentInput.value = element.firstChild?.nodeType === 3 ? element.firstChild.textContent.trim() : (element.textContent.trim() || ''); // Prioritize direct text node
        if(elementColorInput) elementColorInput.value = rgbToHex(computedStyle.color) || '#000000';
        if(elementBgColorInput) elementBgColorInput.value = rgbToHex(computedStyle.backgroundColor) || '#ffffff';
        if(elementWidthInput) elementWidthInput.value = computedStyle.width;
        if(elementHeightInput) elementHeightInput.value = computedStyle.height;
        if(elementPaddingInput) elementPaddingInput.value = computedStyle.padding;
        if(elementMarginInput) elementMarginInput.value = computedStyle.margin;
        if(elementPositionSelect) elementPositionSelect.value = computedStyle.position;
        if(elementDisplaySelect) elementDisplaySelect.value = computedStyle.display;
        if(elementBorderInput) elementBorderInput.value = computedStyle.border;
        elementEditorControls.classList.remove('hidden');
    }

    // --- Main App Element Selection Toggle ---
    function toggleMainAppElementSelectionMode(isPopOutRequest = false) { 
        isMainAppSelectingElement = !isMainAppSelectingElement;
        const modeText = isMainAppSelectingElement ? 'ON' : 'OFF';
        if (selectElementsToggle) {
            selectElementsToggle.textContent = `Select Elements: ${modeText}`;
            selectElementsToggle.classList.toggle('active', isMainAppSelectingElement);
        }
        if (selectElementButton) { // In AI Tools panel
            selectElementButton.textContent = isMainAppSelectingElement ? 'Cancel Selection Mode' : 'Select Element to Edit';
            selectElementButton.classList.toggle('active-selection', isMainAppSelectingElement);
        }
        document.body.classList.toggle('element-selection-active', isMainAppSelectingElement);

        const targetFrame = popOutWindow && !popOutWindow.closed && isPopOutRequest ? popOutWindow.document : previewFrame.contentDocument;
        const previewBody = targetFrame?.body;

        if (!previewBody) {
             if (isMainAppSelectingElement) alert("Preview content not loaded for selection.");
             return;
        }
        const action = isMainAppSelectingElement ? 'addEventListener' : 'removeEventListener';
        previewBody[action]('mouseover', highlightElementHandler);
        previewBody[action]('mouseout', clearHighlightHandler);
        previewBody[action]('click', mainAppSelectElementHandler, true);

        if (!isMainAppSelectingElement) { // Clear highlights if selection mode is turned OFF
            previewBody.querySelectorAll('.preview-element-hover-highlight, .preview-element-selected-highlight')
                .forEach(el => el.classList.remove('preview-element-hover-highlight', 'preview-element-selected-highlight'));
            if (currentSelectedElementSelector) { // Re-apply persistent selection highlight if an element was selected
                const previouslySelected = getElementBySelector(previewBody, currentSelectedElementSelector);
                if (previouslySelected) previouslySelected.classList.add('preview-element-selected-highlight');
            }
        } else { // When turning ON selection mode
            if (currentSelectedElementSelector) { // If an element was previously selected, remove its persistent highlight to allow re-selection
                 const el = getElementBySelector(previewBody, currentSelectedElementSelector);
                 if (el) el.classList.remove('preview-element-selected-highlight');
            }
        }
    }
    function highlightElementHandler(e) { if (e.target.tagName !== 'HTML' && e.target.tagName !== 'BODY') e.target.classList.add('preview-element-hover-highlight'); }
    function clearHighlightHandler(e) { e.target.classList.remove('preview-element-hover-highlight'); }
    function mainAppSelectElementHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        if (isMainAppSelectingElement && e.target.tagName !== 'HTML' && e.target.tagName !== 'BODY') {
            window.processSelectionFromAnywhere(getElementPathSelector(e.target), 'iframe');
            toggleMainAppElementSelectionMode(); 
        }
    }


    // --- Cross-window selection processing & highlight sync ---
    window.processSelectionFromAnywhere = (selector, sourceWindowType) => { 
        currentSelectedElementSelector = selector;
        saveToLocalStorage('currentSelectedElementSelector', currentSelectedElementSelector);

        [previewFrame.contentDocument, popOutWindow?.document].forEach((doc, index) => {
            if (doc) {
                doc.querySelectorAll('.preview-element-selected-highlight').forEach(el => el.classList.remove('preview-element-selected-highlight'));
                doc.querySelectorAll('.preview-element-hover-highlight').forEach(el => el.classList.remove('preview-element-hover-highlight'));
                const elToHighlight = getElementBySelector(doc, selector);
                if (elToHighlight) {
                    elToHighlight.classList.add('preview-element-selected-highlight');
                     if (index === 0) { // If it's the main previewFrame, update editor UI
                        updateMainElementEditorUI(elToHighlight);
                    } else if (popOutWindow && popOutWindow.updatePopOutEditorUIWithElement) { // If popout, update its editor
                        popOutWindow.updatePopOutEditorUIWithElement(elToHighlight);
                    }
                }
            }
        });
         if (sourceWindowType === 'popout' && elementEditorControls) elementEditorControls.classList.remove('hidden');
    };

    // --- Preview Interaction Listeners (for both iframe and popout) ---
    function setupPreviewInteractionListeners(doc, windowType, isPopOutEditorSelection = false) { 
        if (!doc || !doc.body) return;
        const clickHandler = (e) => {
            e.preventDefault(); e.stopPropagation();
            if (e.target.tagName !== 'HTML' && e.target.tagName !== 'BODY') {
                const selector = getElementPathSelector(e.target);
                if (windowType === 'popout_editor_select') { // Selection initiated from pop-out's "Select Element" button
                    if (popOutWindow && popOutWindow.processSelectionForPopOutEditor) {
                        popOutWindow.processSelectionForPopOutEditor(selector, e.target);
                    }
                } else if (isMainAppSelectingElement && windowType === 'iframe') { // Selection from main app's toggle
                    window.processSelectionFromAnywhere(selector, 'iframe');
                    if(selectElementButton) selectElementButton.click(); // Auto-turn off main selection mode
                }
            }
        };
        const currentSelectionActive = (windowType === 'popout_editor_select' && popOutWindow?.isPopOutSelectingElement) || (windowType === 'iframe' && isMainAppSelectingElement);
        
        if (currentSelectionActive) {
            doc.body.addEventListener('mouseover', highlightElementHandler);
            doc.body.addEventListener('mouseout', clearHighlightHandler);
            doc.body.addEventListener('click', clickHandler, true);
        } else {
            doc.body.removeEventListener('mouseover', highlightElementHandler);
            doc.body.removeEventListener('mouseout', clearHighlightHandler);
            doc.body.removeEventListener('click', clickHandler, true);
        }
    }
    
    // --- Main App Manual Element Changes ---
    function applyMainAppManualElementChanges() { 
        if (!currentSelectedElementSelector) return alert("No element selected.");
        const indexHtmlFile = projectFiles.find(f => f.name === 'index.html');
        if (!indexHtmlFile) return alert("index.html not found in project files.");

        const tempDoc = new DOMParser().parseFromString(indexHtmlFile.content, 'text/html');
        const el = getElementBySelector(tempDoc, currentSelectedElementSelector);
        if (!el) return alert("Selected element not found in index.html for manual changes.");
        
        const style = el.style;
        if (elementTextContentInput.value !== (el.firstChild?.nodeType === 3 ? el.firstChild.textContent.trim() : (el.textContent || '').trim())) {
            if (el.firstChild?.nodeType === 3) el.firstChild.textContent = elementTextContentInput.value;
            else if (!el.children.length) el.textContent = elementTextContentInput.value;
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
        
        indexHtmlFile.content = tempDoc.documentElement.outerHTML;
        if (activeFileName === 'index.html' && codeOutput) codeOutput.textContent = indexHtmlFile.content;
        updatePreviewFrameAndPopout(indexHtmlFile.content);
        saveToLocalStorage('projectFiles', projectFiles);
        alert("Manual changes applied to index.html.");
    }
    
    // --- Main App AI Element Changes (can be called by popout too) ---
    window.handleAIEditRequest = async (elementOuterHTML, aiPrompt, selectorToUpdate) => {
        if (!elementOuterHTML || !aiPrompt || !selectorToUpdate) { alert("Missing parameters for AI edit request."); return false; }
        const indexHtmlFile = projectFiles.find(f => f.name === 'index.html');
        if (!indexHtmlFile) { alert("index.html not found for AI element edit."); return false; }

        const sourceButton = applyElementAIEditButton; 
        const originalButtonText = sourceButton.textContent;
        sourceButton.textContent = 'Applying AI...'; sourceButton.disabled = true;
        let modifiedElementSnippet;
        const activeKnowledge = getActiveKnowledgeContent();
        const knowledgePreamble = activeKnowledge ? `Consider the following information as relevant context (Knowledge Base):\n${activeKnowledge}\n\n---\n\n` : "";
        const systemPrompt = `${knowledgePreamble}You are an expert web developer. You will be given an HTML element's code and a user's request to modify it. Return ONLY the modified HTML code for that element. Keep existing attributes if not specified to change.`;

        if (useGeminiAPI) { 
            if (!googleAi) { /* ... */ return false;}
            const contents = `${systemPrompt}\n\nOriginal Element:\n\`\`\`html\n${elementOuterHTML}\n\`\`\`\n\nUser's request: ${aiPrompt}`;
            try { const response = await googleAi.models.generateContent({ model: GEMINI_TEXT_MODEL, contents }); modifiedElementSnippet = response.text; }
            catch (e) { /* ... */ return false; }
        } else { 
            const messages = [{ role: 'system', content: systemPrompt }, { role: 'user', content: `Original Element:\n\`\`\`html\n${elementOuterHTML}\n\`\`\`\n\nRequest: ${aiPrompt}` }];
            try { const response = await puter.ai.chat(messages, { model: modelSelect.value }); modifiedElementSnippet = response.message.content; } 
            catch (e) { /* ... */ return false; }
        }
        
        const finalSnippet = extractHtmlContent(modifiedElementSnippet);
        const tempDoc = new DOMParser().parseFromString(indexHtmlFile.content, 'text/html');
        const mainFrameElToReplace = getElementBySelector(tempDoc, selectorToUpdate);

        if (mainFrameElToReplace && mainFrameElToReplace.parentElement) {
            const tempSnippetContainer = tempDoc.createElement('div');
            tempSnippetContainer.innerHTML = finalSnippet; 
            const newElement = tempSnippetContainer.firstElementChild;
            if (newElement) {
                mainFrameElToReplace.parentElement.replaceChild(newElement, mainFrameElToReplace);
                const newSelector = getElementPathSelector(newElement); 
                
                indexHtmlFile.content = tempDoc.documentElement.outerHTML;
                if (activeFileName === 'index.html' && codeOutput) codeOutput.textContent = indexHtmlFile.content;
                updatePreviewFrameAndPopout(indexHtmlFile.content, false, true); // Force sync highlights with new element
                saveToLocalStorage('projectFiles', projectFiles);
                 window.processSelectionFromAnywhere(newSelector, 'ai_edit'); // Update global selection to the new element
                
                if (editElementPromptInput) editElementPromptInput.value = '';
                alert("Element in index.html modified by AI.");
                sourceButton.textContent = originalButtonText; sourceButton.disabled = false;
                return true;
            }
        }
        alert("AI did not return a valid element or target was lost in index.html. Modification failed.");
        console.warn("Failed to apply AI element modification to index.html. Snippet:", finalSnippet);
        sourceButton.textContent = originalButtonText; sourceButton.disabled = false;
        return false;
    };
    
    // --- UI Updates, Placeholders, Pop-out & Preview Sync ---
    function getPreviewStyles() { 
        const theme = loadFromLocalStorage('theme', 'dark');
        const accentColor = theme === 'dark' ? 'var(--accent-color-dark)' : 'var(--accent-color-light)';
        const accentColorRgb = theme === 'dark' ? 'var(--accent-color-rgb-dark)' : 'var(--accent-color-rgb-light)';
        return `
            :root {
                --accent-color-dark: #58a6ff; --accent-color-rgb-dark: 88, 166, 255;
                --accent-color-light: #0969da; --accent-color-rgb-light: 9, 105, 218;
            }
            .preview-element-hover-highlight {
                outline: 2px dashed ${accentColor} !important;
                cursor: pointer !important;
                box-shadow: 0 0 8px rgba(${accentColorRgb}, 0.5) !important;
                transition: outline 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
            }
            .preview-element-selected-highlight {
                outline: 3px solid ${accentColor} !important;
                box-shadow: 0 0 0 4px rgba(${accentColorRgb}, 0.4), inset 0 0 8px rgba(${accentColorRgb}, 0.2) !important;
            }
            ::selection { background-color: rgba(${accentColorRgb}, 0.3); }
        `;
    }
    function updatePreviewFramePlaceholder(message, isError = false) { 
        if (!previewFrame) return;
        const theme = loadFromLocalStorage('theme', 'dark');
        const color = isError ? '#ff4d4d' : (theme === 'dark' ? 'var(--subtle-text-dark)' : 'var(--subtle-text-light)');
        const bgColor = theme === 'dark' ? 'var(--panel-bg-dark)' : 'var(--panel-bg-light)';
        const font = getComputedStyle(document.body).fontFamily;
        const styles = `
            :root {
                --subtle-text-dark: #8b949e; --subtle-text-light: #57606a;
                --panel-bg-dark: #161b22; --panel-bg-light: #ffffff;
            }
            ${getPreviewStyles()}
            body { 
                margin:0; display:flex; justify-content:center; align-items:center; height:100vh;
                font-family: ${font}; color:${color}; background-color:${bgColor}; text-align: center; padding: 20px;
            }`;
        previewFrame.srcdoc = `<!DOCTYPE html><html><head><style>${styles}</style></head><body><p>${escapeHTML(message)}</p></body></html>`;
        if (popOutWindow && !popOutWindow.closed) {
            try { popOutWindow.document.body.innerHTML = `<p style="color:${color}; font-family:${font};">${escapeHTML(message)}</p>`; } 
            catch(e) { console.warn("Error updating popout placeholder", e); }
        }
    }
    function updatePreviewFrameAndPopout(htmlContent, isError = false, forceHighlightSync = false) { 
        if (!previewFrame) return;
        const finalHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${getPreviewStyles()}</style></head><body>${htmlContent}</body></html>`;
        try {
            previewFrame.srcdoc = finalHtml;
            previewFrame.onload = () => { // Ensure listeners are set up after srcdoc loads
                setupPreviewInteractionListeners(previewFrame.contentDocument, 'iframe');
                if (currentSelectedElementSelector) { // Re-apply highlight after load
                    const el = getElementBySelector(previewFrame.contentDocument, currentSelectedElementSelector);
                    if (el) el.classList.add('preview-element-selected-highlight');
                }
            };
        } catch (e) {
            console.error("Error setting previewFrame.srcdoc:", e);
            updatePreviewFramePlaceholder("Error rendering preview. Check console.", true);
        }

        if (popOutWindow && !popOutWindow.closed) {
            try {
                popOutWindow.document.open();
                popOutWindow.document.write(finalHtml);
                popOutWindow.document.close();
                popOutWindow.document.addEventListener('DOMContentLoaded', () => {
                     if (popOutWindow.setupPopOutSpecificUI) popOutWindow.setupPopOutSpecificUI(); // Re-init popout UI
                     if (currentSelectedElementSelector) {
                        const elPop = getElementBySelector(popOutWindow.document, currentSelectedElementSelector);
                        if (elPop) elPop.classList.add('preview-element-selected-highlight');
                     }
                });
            } catch (e) {
                console.warn("Error updating popOutWindow content:", e);
            }
        }
        if(forceHighlightSync && currentSelectedElementSelector){ // Used after AI edit to ensure the new element gets highlighted
             window.processSelectionFromAnywhere(currentSelectedElementSelector, 'internal_sync');
        }
    }
    
    // --- Pop-out Window Specific Logic ---
    const getPopOutEditorHTML = () => { /* ... (existing code) ... */ };
    const getPopOutEditorCSS = (themeVars) => { /* ... (existing code) ... */ };
    function handlePopOut() { /* ... (existing code as before, ensure it calls getPopOutEditorCSS with themeVars) ... */ }

    // --- Welcome Modal ---
    function handleProjectTypeSelection(e) {
        const projectType = e.target.dataset.projectType;
        if (!projectType) return;

        if (welcomeModal) { // Hide modal first
            welcomeModal.classList.add('hidden');
        } else {
            console.error("welcomeModal element not found when trying to hide.");
            return; 
        }
        
        let initialPrompt = "";
        let initialHtmlContent = "<!-- Your HTML code will appear here -->\n<!-- Tip: Use \"Describe your UI\" to get started! -->";
        let readmeContent = defaultReadmeContent;

        if (projectType === 'blank') {
            initialPrompt = "Create a basic HTML structure with a head, title 'My App', and an empty body tag.";
        } else if (projectType === 'simple-web') {
            initialPrompt = "Create a simple HTML page with a heading 'Welcome to My Page' and a paragraph below it saying 'This is a basic HTML page.'";
            initialHtmlContent = "<!-- Generating Simple Web Page... -->";
        }
        
        projectFiles = [
            { name: 'index.html', content: initialHtmlContent, active: true },
            { name: 'README.md', content: readmeContent, active: false }
        ];
        activeFileName = 'index.html';
        setActiveFile(activeFileName); // This updates editor, preview, and file tabs

        if (generatePromptInput) {
            generatePromptInput.value = initialPrompt;
            if(aiToolsSection1Content) aiToolsSection1Content.classList.remove('hidden');
            if(generatedPromptDisplay) generatedPromptDisplay.classList.add('hidden');
            if(aiToolsSection2) aiToolsSection2.classList.add('hidden'); 
            if(aiToolsSection3) aiToolsSection3.classList.add('hidden'); 
        }
    }

    // --- Event Listeners ---
    if (loginButton) loginButton.addEventListener('click', async () => { try { await puter.auth.signIn(); } catch (error) { console.warn("Login attempt finished:", error); } finally { checkAuthStatus(); }});
    if (logoutButton) logoutButton.addEventListener('click', async () => { try { await puter.auth.signOut(); } catch (error) { console.error("Logout failed:", error); alert(`Logout failed: ${error.message}`); } finally { checkAuthStatus(); } });
    if (settingsButton) settingsButton.addEventListener('click', () => settingsModal.classList.remove('hidden'));
    [closeSettingsModal, closeSettingsModalFooter].forEach(btn => { if(btn) btn.addEventListener('click', () => settingsModal.classList.add('hidden')); });
    window.addEventListener('click', (e) => { if (e.target === settingsModal) settingsModal.classList.add('hidden'); });
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tabContents.forEach(content => content.classList.remove('active'));
            const targetTabId = button.dataset.tab;
            const targetTabContent = getElem(targetTabId); 
            if (targetTabContent) {
                 targetTabContent.classList.add('active');
            } else {
                 console.error("Tab content not found for ID:", targetTabId);
            }
        });
    });

    if (darkModeToggle) darkModeToggle.addEventListener('change', () => applyTheme(darkModeToggle.checked ? 'dark' : 'light'));
    if (tooltipsToggle) tooltipsToggle.addEventListener('change', () => { applyTooltipsSetting(tooltipsToggle.checked); saveToLocalStorage('tooltipsEnabled', tooltipsToggle.checked); });
    if (geminiApiToggle) geminiApiToggle.addEventListener('change', () => { useGeminiAPI = geminiApiToggle.checked; if (useGeminiAPI && !googleAi) { if(!initializeGeminiClient()) { useGeminiAPI = false; geminiApiToggle.checked = false; } } updateApiUsageUI(); });
    if (saveModelsButton) saveModelsButton.addEventListener('click', () => {  const selected = [...modelListContainer.querySelectorAll('input:checked')].map(cb => cb.value); if (selected.length === 0) return alert("Please select at least one model."); saveDropdownModels(selected); populateModelDropdown(); alert('Puter model selection saved!'); });
    if (modelSelect) modelSelect.addEventListener('change', () => { saveToLocalStorage('lastSelectedModel', modelSelect.value); });
    if (appProjectNameInput) appProjectNameInput.addEventListener('input', () => saveToLocalStorage('appProjectName', appProjectNameInput.value));
    if (appMemoryToggle) appMemoryToggle.addEventListener('change', () => saveToLocalStorage('appMemoryEnabled', appMemoryToggle.checked));
    if (fileContextToggle) fileContextToggle.addEventListener('change', () => saveToLocalStorage('fileContextEnabled', fileContextToggle.checked));


    if (generateCodeButton) generateCodeButton.addEventListener('click', () => { 
        const systemPrompt = `You are an expert web developer. Generate complete code for the file named "${activeFileName}" based on the user's request. The output should ONLY be the raw code for this file. If it's an HTML file, include all necessary CSS and JavaScript directly in it or clearly state how to link external files if the user intends to create them.`;
        handleCodeGeneration(generatePromptInput.value.trim(), generateCodeButton, systemPrompt); 
    });
    if (generatePromptInput) generatePromptInput.addEventListener('keypress', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if(generateCodeButton) generateCodeButton.click(); } });
    if (editInitialPromptButton) editInitialPromptButton.addEventListener('click', () => { if(aiToolsSection1Content) aiToolsSection1Content.classList.remove('hidden'); if(generatedPromptDisplay) generatedPromptDisplay.classList.add('hidden'); if(generatePromptInput) generatePromptInput.focus(); });
    if (modifyCodeButton) modifyCodeButton.addEventListener('click', () => { 
        const systemPrompt = `You are an expert web developer. You will be given existing code in a file named "${activeFileName}" and a request to modify it. Apply the modifications and return the complete, new code for this file. Ensure the response contains ONLY the full code for "${activeFileName}".`;
        handleCodeGeneration(modifyPromptInput.value.trim(), modifyCodeButton, systemPrompt, true);
    });
    if (modifyPromptInput) modifyPromptInput.addEventListener('keypress', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (modifyCodeButton) modifyCodeButton.click(); } });
    
    [selectElementButton, selectElementsToggle].forEach(btn => { if(btn) btn.addEventListener('click', () => toggleMainAppElementSelectionMode(false)) });
    if(saveManualElementChangesButton) saveManualElementChangesButton.addEventListener('click', applyMainAppManualElementChanges);
    if(applyElementAIEditButton) applyElementAIEditButton.addEventListener('click', async () => { 
        if (!currentSelectedElementSelector || !editElementPromptInput) return alert("No element selected or AI prompt input missing.");
        const activePreviewDoc = (popOutWindow && !popOutWindow.closed) ? popOutWindow.document : (previewFrame ? previewFrame.contentDocument : null);
        if (!activePreviewDoc) return alert("Preview document not available.");
        const selectedEl = getElementBySelector(activePreviewDoc, currentSelectedElementSelector);
        if (!selectedEl) return alert("Element to edit not found in preview (index.html).");
        window.handleAIEditRequest(selectedEl.outerHTML, editElementPromptInput.value.trim(), currentSelectedElementSelector);
     });

    if(fullscreenButton && previewFrame) fullscreenButton.addEventListener('click', () => previewFrame.requestFullscreen?.().catch(err => console.warn("Fullscreen request failed:", err)));
    if(popOutButton) popOutButton.addEventListener('click', handlePopOut);
    if (toggleAiToolsPanelButton) toggleAiToolsPanelButton.addEventListener('click', () => { 
        if (!aiToolsContent) return;
        aiToolsContent.classList.toggle('hidden');
        const isHidden = aiToolsContent.classList.contains('hidden');
        toggleAiToolsPanelButton.textContent = isHidden ? '🔽' : '🔼';
        toggleAiToolsPanelButton.setAttribute('aria-label', isHidden ? 'Expand AI Tools Panel' : 'Collapse AI Tools Panel');
        saveToLocalStorage('aiToolsPanelCollapsed', isHidden);
    });
    if (generateMicrophoneButton) generateMicrophoneButton.addEventListener('click', () => startDictation(generatePromptInput));
    if (modifyMicrophoneButton) modifyMicrophoneButton.addEventListener('click', () => startDictation(modifyPromptInput));
    if (createCheckpointButton) createCheckpointButton.addEventListener('click', () => createCheckpoint("Manual"));
    if (autoCreateCheckpointToggle) autoCreateCheckpointToggle.addEventListener('change', () => { saveToLocalStorage('autoCreateCheckpoints', autoCreateCheckpointToggle.checked); });
    if (viewRestoreCheckpointsButton) viewRestoreCheckpointsButton.addEventListener('click', showCheckpointsModal);
    if (closeRestoreCheckpointsModal) closeRestoreCheckpointsModal.addEventListener('click', () => restoreCheckpointsModal.classList.add('hidden'));
    if (cancelRestoreCheckpointButton) cancelRestoreCheckpointButton.addEventListener('click', () => restoreCheckpointsModal.classList.add('hidden'));
    
    if (codeOutput) codeOutput.addEventListener('blur', updateActiveFileContentFromEditor);

    if (downloadHtmlLink) downloadHtmlLink.addEventListener('click', (e) => { 
        e.preventDefault();
        const htmlFile = projectFiles.find(f => f.name === activeFileName && activeFileName.endsWith('.html')); // Check if active file is HTML
        if (!htmlFile) { // If active is not HTML, try to find index.html
            const fallbackHtmlFile = projectFiles.find(f => f.name === 'index.html');
            if(fallbackHtmlFile){
                const blob = new Blob([fallbackHtmlFile.content], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fallbackHtmlFile.name;
                document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
                return;
            }
            return alert("No active HTML file or index.html found to download.");
        }
        const blob = new Blob([htmlFile.content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = htmlFile.name;
        document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    });
    if (downloadZipLink) downloadZipLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof JSZip === 'undefined') return alert("JSZip library not loaded. Cannot create ZIP.");
        const zip = new JSZip();
        projectFiles.forEach(file => {
            zip.file(file.name, file.content);
        });
        zip.generateAsync({ type: "blob" })
            .then(function(content) {
                const projectName = (appProjectNameInput ? appProjectNameInput.value.trim().replace(/\s+/g, '_') : 'VibeCodeProject') || 'VibeCodeProject';
                const a = document.createElement('a');
                a.href = URL.createObjectURL(content);
                a.download = `${projectName}.zip`;
                document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(a.href);
            });
    });

    projectTypeButtons.forEach(button => button.addEventListener('click', handleProjectTypeSelection));
    if (dontShowWelcomeAgainCheckbox) { // Add listener for the checkbox
        dontShowWelcomeAgainCheckbox.addEventListener('change', () => {
            saveToLocalStorage('dontShowWelcomeAgain', dontShowWelcomeAgainCheckbox.checked);
        });
    }

    if (filesButton) filesButton.addEventListener('click', () => { filesToolbar.classList.toggle('hidden'); saveToLocalStorage('filesToolbarVisible', !filesToolbar.classList.contains('hidden')); });
    if (newFileButton) newFileButton.addEventListener('click', handleNewFile);
    if (uploadFileButton) uploadFileButton.addEventListener('click', () => fileUploader.click());
    if (fileUploader) fileUploader.addEventListener('change', handleFileUpload);
    if (uploadFolderButton) uploadFolderButton.addEventListener('click', () => folderUploader.click());
    if (folderUploader) folderUploader.addEventListener('change', handleFileUpload); 

    if (addKnowledgeDocButton) addKnowledgeDocButton.addEventListener('click', () => addKnowledgeDocModal.classList.remove('hidden'));
    if (closeAddKnowledgeDocModal) closeAddKnowledgeDocModal.addEventListener('click', () => addKnowledgeDocModal.classList.add('hidden'));
    if (cancelAddKnowledgeDocButton) cancelAddKnowledgeDocButton.addEventListener('click', () => addKnowledgeDocModal.classList.add('hidden'));
    if (saveKnowledgeDocButton) saveKnowledgeDocButton.addEventListener('click', handleSaveKnowledgeDoc);
    if (closeModelDetailsModal) closeModelDetailsModal.addEventListener('click', () => modelDetailsModal.classList.add('hidden'));
    if (closeModelDetailsFooterButton) closeModelDetailsFooterButton.addEventListener('click', () => modelDetailsModal.classList.add('hidden'));

    // --- Initialization ---
    function init() {
        checkAuthStatus(); 
        applyTheme(loadFromLocalStorage('theme', 'dark'));
        if (tooltipsToggle) {
            tooltipsToggle.checked = loadFromLocalStorage('tooltipsEnabled', false); 
            applyTooltipsSetting(tooltipsToggle.checked);
        }
        
        useGeminiAPI = loadFromLocalStorage('useGeminiAPI', false);
        if (useGeminiAPI && !googleAi) { if(!initializeGeminiClient()) useGeminiAPI = false; }
        if (geminiApiToggle) geminiApiToggle.checked = useGeminiAPI; 
        updateApiUsageUI();
        
        populateModelList(); populateModelDropdown(); 
        setupSpeechRecognition(); 
        loadCheckpoints();
        loadKnowledgeDocs();
        
        if (autoCreateCheckpointToggle) autoCreateCheckpointToggle.checked = loadFromLocalStorage('autoCreateCheckpoints', false);
        if (appProjectNameInput) appProjectNameInput.value = loadFromLocalStorage('appProjectName', 'Vibe Code Project');
        if (appMemoryToggle) appMemoryToggle.checked = loadFromLocalStorage('appMemoryEnabled', true);
        if (fileContextToggle) fileContextToggle.checked = loadFromLocalStorage('fileContextEnabled', false);

        const storedProjectFiles = loadFromLocalStorage('projectFiles');
        if (storedProjectFiles && storedProjectFiles.length > 0) {
            projectFiles = storedProjectFiles;
            activeFileName = loadFromLocalStorage('activeFileName', 'index.html');
        } else {
            projectFiles = [
                { name: 'index.html', content: '<!-- Your HTML code will appear here -->\n<!-- Tip: Use "Describe your UI" to get started! -->', active: true },
                { name: 'README.md', content: defaultReadmeContent, active: false }
            ];
            activeFileName = 'index.html';
        }
        if (!projectFiles.find(f => f.name === 'README.md')) {
            projectFiles.push({ name: 'README.md', content: defaultReadmeContent, active: false });
        }
        setActiveFile(activeFileName); 

        const aiToolsCollapsed = loadFromLocalStorage('aiToolsPanelCollapsed', false);
        if (toggleAiToolsPanelButton && aiToolsContent) {
            if (aiToolsCollapsed) {
                aiToolsContent.classList.add('hidden');
                toggleAiToolsPanelButton.textContent = '🔽';
                toggleAiToolsPanelButton.setAttribute('aria-label', 'Expand AI Tools Panel');
            } else {
                aiToolsContent.classList.remove('hidden');
                toggleAiToolsPanelButton.textContent = '🔼';
                toggleAiToolsPanelButton.setAttribute('aria-label', 'Collapse AI Tools Panel');
            }
        }

        if (filesToolbar) {
            const filesToolbarVisible = loadFromLocalStorage('filesToolbarVisible', false);
            if(filesToolbarVisible) filesToolbar.classList.remove('hidden');
            else filesToolbar.classList.add('hidden');
        }
        
        const shouldShowWelcome = !loadFromLocalStorage('dontShowWelcomeAgain', false);
        if (shouldShowWelcome && welcomeModal) {
            welcomeModal.classList.remove('hidden');
        } else if (welcomeModal) {
            welcomeModal.classList.add('hidden');
        }
        
        if (previewFrame && previewFrame.contentDocument) {
            setupPreviewInteractionListeners(previewFrame.contentDocument, 'iframe'); 
        } else if (previewFrame) {
            previewFrame.addEventListener('load', () => { // Fallback if contentDocument not ready
                 setupPreviewInteractionListeners(previewFrame.contentDocument, 'iframe');
            });
        }
        currentSelectedElementSelector = loadFromLocalStorage('currentSelectedElementSelector', null);
        if (currentSelectedElementSelector) { // Restore selection highlight on load
            window.processSelectionFromAnywhere(currentSelectedElementSelector, 'init_load');
        }
    }
    init();
});
