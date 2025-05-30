
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
    
    const toggleAiToolsPanelButton = getElem('toggleAiToolsPanelButton'); 
    const aiToolsPanel = getElem('aiToolsPanel');
    const aiToolsContent = getElem('aiToolsContent');
    const aiHistoryButton = getElem('aiHistoryButton');
    const aiHistoryModal = getElem('aiHistoryModal');
    const closeAiHistoryModal = getElem('closeAiHistoryModal');
    const aiHistoryList = getElem('aiHistoryList');
    const noAiHistoryMessage = getElem('noAiHistoryMessage');

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
    const selectElementButton = getElem('selectElementButton'); // In AI Tools
    const elementEditorControls = getElem('elementEditorControls');
    const selectedElementIdentifier = getElem('selectedElementIdentifier');
    // Reorganized Element Editor Inputs
    const elementTextContentInput = getElem('elementTextContent'); // Now a textarea
    const elementColorInput = getElem('elementColor');
    const elementBgColorInput = getElem('elementBgColor');
    const elementWidthInput = getElem('elementWidth');
    const elementHeightInput = getElem('elementHeight');
    const elementPaddingInput = getElem('elementPadding');
    const elementMarginInput = getElem('elementMargin');
    const elementPositionSelect = getElem('elementPosition');
    const elementDisplaySelect = getElem('elementDisplay');
    const elementTextAlignSelect = getElem('elementTextAlign'); // New
    const elementBorderInput = getElem('elementBorder');
    const elementBorderRadiusInput = getElem('elementBorderRadius'); // New
    const elementCustomCSSInput = getElem('elementCustomCSS'); // New (textarea)
    const editElementPromptInput = getElem('editElementPromptInput'); // AI prompt for element
    const saveManualElementChangesButton = getElem('saveManualElementChangesButton');
    const applyElementAIEditButton = getElem('applyElementAIEditButton');

    const aiPromptFileTarget = getElem('aiPromptFileTarget');
    const aiModifyFileTarget = getElem('aiModifyFileTarget');
    
    const codeEditorPanel = getElem('codeEditorPanel'); 
    const codePanelTitle = getElem('codePanelTitle');
    const filesButton = getElem('filesButton');
    const fileExplorer = getElem('fileExplorer');
    const codeFilesContent = getElem('codeFilesContent'); 
    const createNewFileButton = getElem('createNewFileButton');
    const createNewFolderButton = getElem('createNewFolderButton');
    const uploadFileInput = getElem('uploadFileInput');
    const uploadFileTriggerButton = getElem('uploadFileTriggerButton');
    const deleteAllFilesButton = getElem('deleteAllFilesButton');
    const projectFileTree = getElem('projectFileTree');
    const codeOutputPre = getElem('codeOutput'); 
    const codeOutputCode = codeOutputPre ? codeOutputPre.querySelector('code') : null; 

    const newFileFolderInputContainer = getElem('newFileFolderInputContainer');
    const newFileFolderNameInput = getElem('newFileFolderNameInput');
    const saveNewFileFolderButton = getElem('saveNewFileFolderButton');
    const cancelNewFileFolderButton = getElem('cancelNewFileFolderButton');

    const previewPanel = getElem('previewPanel'); 
    const reloadPreviewButton = getElem('reloadPreviewButton');
    const selectElementsToggle = getElem('selectElementsToggle'); // In main preview header
    const dragElementToggle = getElem('dragElementToggle'); // In main preview header - New
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
    const downloadActiveFileLink = getElem('downloadActiveFile');
    const downloadZipLink = getElem('downloadZip');

    const confirmNewProjectModal = getElem('confirmNewProjectModal');
    const closeConfirmNewProjectModal = getElem('closeConfirmNewProjectModal');
    const confirmNewProjectConfirmButton = getElem('confirmNewProjectConfirmButton');
    const confirmNewProjectCancelButton = getElem('confirmNewProjectCancelButton');

    const welcomeModal = getElem('welcomeModal');
    const welcomeLoginButton = getElem('welcomeLoginButton');
    const welcomeUsernameDisplay = getElem('welcomeUsernameDisplay');
    const welcomeProjectNameInput = getElem('welcomeProjectNameInput');
    const templateSelectionContainer = getElem('templateSelectionContainer');
    const hideWelcomeModalToggle = getElem('hideWelcomeModalToggle');
    const welcomeVersionText = getElem('welcomeVersionText');

    const showWelcomeModalToggle = getElem('showWelcomeModalToggle');


    const toggleCodeEditorPanelButton = getElem('toggleCodeEditorPanelButton');
    const togglePreviewPanelButton = getElem('togglePreviewPanelButton');
    const resizerAiEditor = getElem('resizerAiEditor');
    const resizerEditorPreview = getElem('resizerEditorPreview');
    const minimizedPanelRestoreArea = getElem('minimizedPanelRestoreArea');

    const aiDocsListContainer = getElem('aiDocsListContainer');
    const noAiDocsMessage = getElem('noAiDocsMessage');
    const uploadAiDocButton = getElem('uploadAiDocButton');
    const aiDocFileInput = getElem('aiDocFileInput');
    const typeOrEditAiDocButton = getElem('typeOrEditAiDocButton');
    const typeAiDocFormContainer = getElem('typeAiDocFormContainer');
    const typeAiDocFormTitle = getElem('typeAiDocFormTitle');
    const aiDocTitleInput = getElem('aiDocTitleInput');
    const aiDocContentInput = getElem('aiDocContentInput');
    const pasteAiDocContentButton = getElem('pasteAiDocContentButton');
    const saveTypedAiDocButton = getElem('saveTypedAiDocButton');
    const cancelTypedAiDocButton = getElem('cancelTypedAiDocButton');
    const aiDocsStorageAlert = getElem('aiDocsStorageAlert');
    const PUTER_AI_DOCS_BASE_PATH = '~/AppData/JR Vibe Code/ai_context_docs/';


    const APP_VERSION = '1.2.0'; 
    if(appVersionSpan) appVersionSpan.textContent = APP_VERSION;
    if(welcomeVersionText) welcomeVersionText.textContent = `Created by Jamie Reddin using the Puter.com API and Google Gemini API. || Version ${APP_VERSION}`;


    // --- State & Constants ---
    const GEMINI_TEXT_MODEL = 'gemini-2.5-flash-preview-04-17';
    let useGeminiAPI = false;
    let googleAi = null;
    let checkpoints = [];
    let popOutWindow = null;
    let currentSelectedElementSelector = null; 
    let isMainAppSelectingElement = false; 
    let isMainAppDraggingElement = false; // New state for drag mode
    let recognition = null;
    
    let projectFiles = []; 
    let activeFileName = null;
    let puterSystemPromptContent = null; 
    let currentProjectTemplate = 'blank'; 
    let aiContextDocuments = []; 
    let aiPromptHistory = [];
    let editingAiDocId = null; 
    let draggedElement = null; // For drag and drop
    let dropIndicator = null; // For drag and drop visual
    let currentNewFileOperation = null; // 'file' or 'folder'

    let panelStates = {
        aiTools: { minimized: false, id: 'aiTools', element: aiToolsPanel, content: aiToolsContent, toggleButton: toggleAiToolsPanelButton, resizerAfter: resizerAiEditor, restoreButton: null },
        codeEditor: { minimized: false, id: 'codeEditor', element: codeEditorPanel, content: codeFilesContent, toggleButton: toggleCodeEditorPanelButton, resizerBefore: resizerAiEditor, resizerAfter: resizerEditorPreview, restoreButton: null },
        preview: { minimized: false, id: 'preview', element: previewPanel, content: previewFrame, toggleButton: togglePreviewPanelButton, resizerBefore: resizerEditorPreview, restoreButton: null }
    };


    const allModels = [ 
        'claude-sonnet-4', 'claude-opus-4', 'claude-3-7-sonnet', 'claude-3-5-sonnet',
        'gpt-4o-mini', 'gpt-4o', 'gpt-4.1', 'gpt-4.1-mini', 
        'deepseek-chat', 'deepseek-reasoner',
        'google/gemini-2.5-pro-exp-03-25:free', 'google/gemini-2.5-flash-preview', 
        'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
        'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo', 'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo',
        'mistral-large-latest', 'codestral-latest'
    ];
    const DEFAULT_BLANK_PROJECT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project</title>
  <style>
    body { font-family: system-ui, sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f4f4f9; color: #333; text-align: center; padding: 20px; }
    .container { background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    h1 { color: #007aff; margin-bottom: 15px; }
    p { line-height: 1.6; }
    .tip { font-size: 0.9em; color: #555; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 JR Vibe Code Project Initialized!</h1>
    <p>Your blank canvas is ready.</p>
    <p class="tip">Use the AI Tools panel to describe the UI you want to create, or start coding directly!</p>
  </div>
</body>
</html>`;

    const PUTER_SYSTEM_PROMPT_RAW = `
IMPORTANT: This file contains the concatenated documentation for puter.js, a JavaScript SDK for the Puter Web OS. Use this documentation to answer questions about puter.js, its features, usage, and APIs. 
WAIT FOR MY QUESTIONS BEFORE PROVIDING ANY INFORMATION. DO NOT SAY ANYTHING UNTIL I START ASKING QUESTIONS.

<!-- File: AI/chat.md -->

Given a prompt returns the completion that best matches the prompt.

## Syntax
\`\`\`js
puter.ai.chat(prompt)
puter.ai.chat(prompt, options = {})
puter.ai.chat(prompt, testMode = false, options = {})
puter.ai.chat(prompt, imageURL, testMode = false, options = {})
puter.ai.chat(prompt, [imageURLArray], testMode = false, options = {})
puter.ai.chat([messages], testMode = false, options = {})
\`\`\`
## Parameters
#### \`prompt\` (String)
A string containing the prompt you want to complete.
#### \`options\` (Object) (Optional)
An object containing the following properties:
- \`model\` (String) - The model you want to use for the completion. Defaults to \`gpt-4o-mini\`.
- \`stream\` (Boolean) - A boolean indicating whether you want to stream the completion. Defaults to \`false\`.
- \`tools\` (Array) (Optional) - An array of function definitions that the AI can call.
#### \`testMode\` (Boolean) (Optional)
A boolean indicating whether you want to use the test API. Defaults to \`false\`.
#### \`imageURL\` (String)
A string containing the URL of an image you want to provide as context for the completion.
#### \`imageURLArray\` (Array)
An array of strings containing the URLs of images you want to provide as context for the completion. 
#### \`messages\` (Array)
An array of objects containing the messages you want to complete. Each object must have a \`role\` and a \`content\` property. The \`role\` property must be one of \`system\`, \`assistant\`, \`user\`, or \`function\`. The \`content\` property must be a string containing the message.
(Content truncated for brevity - full Puter.js documentation would be here)

<!-- File: Utils/randName.md -->
A function that generates a domain-safe name by combining a random adjective, a random noun, and a random number (between 0 and 9999). The result is returned as a string with components separated by hyphens by default. You can change the separator by passing a string as the first argument to the function.
## Syntax
\`\`\`js
puter.randName()
puter.randName(separator)
\`\`\`
## Parameters
#### \`separator\` (String)
The separator to use between components. Defaults to \`-\`.
`;


    // --- Utility Functions ---
    const escapeHTML = (str) => str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag]));
    const rgbToHex = (rgb) => {
        if (!rgb || typeof rgb !== 'string' || !rgb.startsWith('rgb')) return null; // Basic check
        if (rgb.startsWith('rgba')) { 
            const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
            if (!match) return null;
            const [r, g, b] = match.slice(1).map(Number);
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
        }
        const match = rgb.match(/\d+/g);
        if (!match || match.length < 3) return null; 
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
    function createIconSVG(pathData, classes = "icon") {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", classes);
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "currentColor");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        svg.appendChild(path);
        return svg;
    }
    const ICONS = {
        aiTools: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z", 
        codeEditor: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
        preview: "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zM7 10h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z",
        history: "M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8H12z", 
        delete: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
        edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
        upload: "M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z",
        file: "M13 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9l-7-7zm4 18H7v-2h10v2zm0-4H7v-2h10v2zm-2-4V3.5L19.5 9H15z",
        folder: "M10 4H4c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z",
        togglePanel: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z",
        selectElement: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z", // Example, same as AI Tools for now
        drag: "M10 20l-8-8m8 8l8-8m-8-8l-8 8m8-8l8 8" // Simple arrows
    };

    // --- File Management ---
    function getFileType(fileName) {
        if (!fileName) return 'file';
        if (fileName.endsWith('/')) return 'folder';
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'html': return 'html';
            case 'css': return 'css';
            case 'js': return 'javascript';
            case 'md': return 'markdown';
            case 'json': return 'json';
            case 'txt': return 'text';
            case 'png': case 'jpg': case 'jpeg': case 'gif': case 'svg': case 'webp': return 'image';
            default: return 'file'; 
        }
    }

    function renderFileTree() {
        if (!projectFileTree) return;
        projectFileTree.innerHTML = '';
        const filesToRender = [...projectFiles].sort((a,b) => {
            const aIsFolder = a.type === 'folder';
            const bIsFolder = b.type === 'folder';
            if (aIsFolder && !bIsFolder) return -1;
            if (!aIsFolder && bIsFolder) return 1;
            return a.name.localeCompare(b.name);
        });

        filesToRender.forEach(file => {
            const li = document.createElement('li');
            li.setAttribute('role', 'option');
            li.dataset.fileName = file.name;
            
            const fileNameWrapper = document.createElement('div');
            fileNameWrapper.classList.add('file-name-wrapper');

            const iconSpan = document.createElement('span');
            iconSpan.classList.add('icon');
            
            if (file.type === 'folder') {
                iconSpan.appendChild(createIconSVG(ICONS.folder));
                li.classList.add('folder-item');
            } else if (file.type === 'html') {
                iconSpan.appendChild(createIconSVG(ICONS.file)); 
            } else if (file.type === 'css') {
                iconSpan.appendChild(createIconSVG("M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z")); 
            } else if (file.type === 'javascript') {
                iconSpan.appendChild(createIconSVG("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2 13.5h-1.5V14h-1v1.5H10v-3h1.5V11h1v1.5H14v3zm-3-4H9.5v-1H11V7H8v1.5h1.5v1H8V11h3v-1.5z")); 
            } else if (file.type === 'image') {
                iconSpan.appendChild(createIconSVG("M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"));
            } else { 
                iconSpan.appendChild(createIconSVG(ICONS.file));
            }
            fileNameWrapper.appendChild(iconSpan);
            
            const fileNameSpan = document.createElement('span');
            let displayName = file.name.split('/').pop() || file.name; 
            if (file.type === 'folder') {
                 displayName = file.name.substring(0, file.name.length -1).split('/').pop(); 
            }
            fileNameSpan.textContent = displayName;
            fileNameWrapper.appendChild(fileNameSpan);
            li.appendChild(fileNameWrapper);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-file-button');
            deleteButton.setAttribute('aria-label', `Delete ${displayName}`);
            deleteButton.appendChild(createIconSVG(ICONS.delete));
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); 
                handleDeleteFileOrFolder(file.name);
            });
            li.appendChild(deleteButton);


            if (file.name === activeFileName) {
                li.classList.add('active-file');
                li.setAttribute('aria-selected', 'true');
            } else {
                li.setAttribute('aria-selected', 'false');
            }

            li.addEventListener('click', () => setActiveFile(file.name));
            li.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') setActiveFile(file.name); });
            projectFileTree.appendChild(li);
        });
    }

    function setActiveFile(fileName, newContent = null) {
        const file = projectFiles.find(f => f.name === fileName);
        activeFileName = fileName;

        const isEditable = file && file.type !== 'folder' && file.type !== 'image';
        if (codeOutputPre) codeOutputPre.contentEditable = isEditable ? 'true' : 'false';

        if (codeOutputCode) {
            if (file && isEditable) {
                 codeOutputCode.textContent = newContent !== null ? newContent : (file.content || '');
            } else if (file && file.type === 'folder') {
                codeOutputCode.textContent = `Folder: ${escapeHTML(file.name)}\n\nSelect a file to view or edit its content.`;
            } else if (file && file.type === 'image') {
                codeOutputCode.textContent = `Image: ${escapeHTML(file.name)}\n\n(Image preview/editing not available in text editor)`;
            } else if (fileName === null) {
                codeOutputCode.textContent = 'No file selected.';
            } else {
                 codeOutputCode.textContent = `File "${escapeHTML(fileName)}" not found or cannot be displayed.`;
            }
        }
        
        const displayFileName = activeFileName ? (activeFileName.endsWith('/') ? activeFileName.slice(0,-1).split('/').pop() : activeFileName.split('/').pop()) : 'No file selected';
        if(codePanelTitle) codePanelTitle.textContent = `Editor: ${escapeHTML(displayFileName)}`;
        if(aiPromptFileTarget) aiPromptFileTarget.textContent = escapeHTML(displayFileName);
        if(aiModifyFileTarget) aiModifyFileTarget.textContent = escapeHTML(displayFileName);
        
        renderFileTree();
        updatePreview(); 
        try { localStorage.setItem('activeFileName', activeFileName); } catch(e) { console.warn("LS error saving activeFileName", e); }
        saveProjectFilesToLocalStorage();
    }
    
    function addFileToProject(name, content, type = null, makeActive = true) {
        if (!name || name.trim() === "") { alert("File or folder name cannot be empty."); return false; }
        name = name.trim();

        if (projectFiles.find(f => f.name === name)) {
            alert(`File or folder named "${name}" already exists.`);
            return false;
        }
        if (!type) type = getFileType(name);
        if (type === 'folder' && !name.endsWith('/')) name += '/';
        
        projectFiles.push({ name, content: content || '', type });
        
        if (makeActive && type !== 'folder' && type !== 'image') {
            setActiveFile(name, content);
        } else {
            renderFileTree(); 
        }
        saveProjectFilesToLocalStorage();
        return true;
    }

    function updateFileInProject(name, newContent) {
        const file = projectFiles.find(f => f.name === name);
        if (file) {
            if (file.type === 'folder' || file.type === 'image') {
                console.warn(`Cannot update content of folder or image directly: ${name}`);
                return false;
            }
            file.content = newContent;
            if (name === activeFileName && codeOutputCode && codeOutputPre.contentEditable === 'true') { 
                if (document.activeElement !== codeOutputPre) { 
                    codeOutputCode.textContent = newContent;
                }
            }
            saveProjectFilesToLocalStorage();
            if (name === 'index.html' || (activeFileName === name && name.endsWith('.html'))) { 
                 updatePreview();
            }
            return true;
        }
        return false;
    }
    
    function handleDeleteFileOrFolder(fileNameToDelete) {
        const fileEntry = projectFiles.find(f => f.name === fileNameToDelete);
        if (!fileEntry) return;

        const displayName = fileNameToDelete.endsWith('/') ? fileNameToDelete.slice(0,-1).split('/').pop() : fileNameToDelete.split('/').pop();
        if (!confirm(`Are you sure you want to delete "${displayName}"? This action cannot be undone.`)) {
            return;
        }

        if (fileEntry.type === 'folder') {
            projectFiles = projectFiles.filter(f => !f.name.startsWith(fileNameToDelete));
        } else {
            projectFiles = projectFiles.filter(f => f.name !== fileNameToDelete);
        }

        if (activeFileName === fileNameToDelete || (fileEntry.type === 'folder' && activeFileName && activeFileName.startsWith(fileNameToDelete))) {
            const nextFile = projectFiles.find(f => f.type !== 'folder' && f.type !== 'image');
            setActiveFile(nextFile ? nextFile.name : null);
        }
        
        saveProjectFilesToLocalStorage();
        renderFileTree();
    }

    function handleDeleteAllFiles() {
        if (!confirm("Are you sure you want to delete ALL project files? This action cannot be undone. (Your checkpoints will remain.)")) {
            return;
        }
        projectFiles = [];
        activeFileName = null;
        saveProjectFilesToLocalStorage();
        localStorage.removeItem('activeFileName');
        loadTemplate('blank'); 
        alert("All project files have been deleted.");
    }

    function handleNewFileOrFolder(type) {
        currentNewFileOperation = type;
        if (newFileFolderNameInput) newFileFolderNameInput.placeholder = type === 'file' ? 'Enter file name (e.g., style.css)' : 'Enter folder name';
        if (newFileFolderInputContainer) newFileFolderInputContainer.classList.remove('hidden');
        if (newFileFolderNameInput) newFileFolderNameInput.focus();
    }

    function saveNewFileOrFolder() {
        if (!newFileFolderNameInput || !currentNewFileOperation) return;
        const name = newFileFolderNameInput.value.trim();
        if (!name) {
            alert(`${currentNewFileOperation.charAt(0).toUpperCase() + currentNewFileOperation.slice(1)} name cannot be empty.`);
            return;
        }

        const success = addFileToProject(name, currentNewFileOperation === 'folder' ? '' : `/* New ${name} */`, currentNewFileOperation);
        if (success) {
            newFileFolderNameInput.value = '';
            if (newFileFolderInputContainer) newFileFolderInputContainer.classList.add('hidden');
            currentNewFileOperation = null;
        }
    }
    
    function cancelNewFileOrFolder() {
        if (newFileFolderNameInput) newFileFolderNameInput.value = '';
        if (newFileFolderInputContainer) newFileFolderInputContainer.classList.add('hidden');
        currentNewFileOperation = null;
    }

    async function handleFileUpload(event) {
        const files = event.target.files;
        if (!files.length) return;

        for (const file of files) {
            try {
                const content = await file.text(); // For simplicity, assuming text files
                addFileToProject(file.name, content, getFileType(file.name), projectFiles.length === 0); // Make first uploaded file active
            } catch (err) {
                console.error("Error reading uploaded file:", file.name, err);
                alert(`Could not read file: ${file.name}. It might be a binary file or too large.`);
            }
        }
        if (uploadFileInput) uploadFileInput.value = ''; // Reset file input
    }


    function saveProjectFilesToLocalStorage() {
        try {
            localStorage.setItem('projectFiles', JSON.stringify(projectFiles));
        } catch (e) {
            console.warn("Could not save project files to localStorage:", e);
            // Potentially alert the user if storage is full or disabled
        }
    }

    function loadProjectFilesFromLocalStorage() {
        try {
            const storedFiles = localStorage.getItem('projectFiles');
            if (storedFiles) {
                projectFiles = JSON.parse(storedFiles);
                // Ensure 'type' property exists for older data
                projectFiles.forEach(file => {
                    if (!file.type) file.type = getFileType(file.name);
                });
            } else {
                projectFiles = []; // Initialize if nothing stored
            }

            const storedActiveFile = localStorage.getItem('activeFileName');
            if (storedActiveFile && projectFiles.find(f => f.name === storedActiveFile)) {
                activeFileName = storedActiveFile;
            } else if (projectFiles.length > 0) {
                // Default to first editable file if stored active file is invalid or not found
                const firstEditableFile = projectFiles.find(f => f.type !== 'folder' && f.type !== 'image');
                activeFileName = firstEditableFile ? firstEditableFile.name : (projectFiles[0] ? projectFiles[0].name : null);
            } else {
                activeFileName = null; // No files, no active file
            }
        } catch (e) {
            console.warn("Could not load project files from localStorage:", e);
            projectFiles = []; // Reset to empty on error
            activeFileName = null;
        }
    }

    // --- Gemini API Initialization ---
function initializeGeminiClient() {
    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            console.warn("Gemini API key not set. Gemini API will be unavailable.");
            useGeminiAPI = false;
            updateApiUsageUI();
            return false;
        }
        googleAi = new GoogleGenAI({ apiKey });
        console.log("GoogleGenAI client initialized.");
        return true;
    } catch (error) {
        console.error("Error initializing Gemini API client:", error);
        useGeminiAPI = false;
        updateApiUsageUI();
        return false;
    }
}
    
    // --- API Usage Management ---
function updateApiUsageUI() { 
    if (useGeminiAPI && googleAi) { 
        if(authContainer) authContainer.classList.add('hidden');
        if(modelSelect) modelSelect.classList.add('hidden');
        if(puterModelLabel) puterModelLabel.classList.add('hidden');
        if(geminiModelLabelElement) {
            geminiModelLabelElement.classList.remove('hidden');
            geminiModelLabelElement.textContent = `Gemini API: ${GEMINI_TEXT_MODEL}`;
        }
    } else {
        if(authContainer) authContainer.classList.remove('hidden');
        if(modelSelect) modelSelect.classList.remove('hidden');
        if(puterModelLabel) puterModelLabel.classList.remove('hidden');
        if(geminiModelLabelElement) geminiModelLabelElement.classList.add('hidden');
    }
    try { 
        localStorage.setItem('useGeminiAPI', JSON.stringify(useGeminiAPI)); 
    } catch (e) { 
        console.warn("Could not save Gemini API preference:", e); 
    }
}

    // --- Speech Recognition ---
    function setupSpeechRecognition() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (window.SpeechRecognition) {
            recognition = new SpeechRecognition();
            recognition.continuous = false; recognition.lang = 'en-US'; recognition.interimResults = false;
            recognition.onstart = () => { 
                [generateMicrophoneButton, modifyMicrophoneButton].forEach(btn => { if(btn) btn.classList.add('recording');});
            };
            recognition.onend = () => {
                [generateMicrophoneButton, modifyMicrophoneButton].forEach(btn => { if(btn) btn.classList.remove('recording');});
            };
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
            let username = null;
            if (isSignedIn) { 
                const user = await puter.auth.getUser(); 
                username = user.username;
            }
            updateAuthUI(isSignedIn, username);
        } catch (error) { 
            console.error("Error checking auth status:", error); 
            updateAuthUI(false, null); 
        }
    }

    function updateAuthUI(isSignedIn, username) {
        if (loginButton) loginButton.classList.toggle('hidden', isSignedIn);
        if (userInfo) userInfo.classList.toggle('hidden', !isSignedIn);
        if (usernameContainer) usernameContainer.textContent = isSignedIn ? username : '';
        
        if (welcomeModal && !welcomeModal.classList.contains('hidden')) {
            if (welcomeLoginButton) {
                if (isSignedIn) {
                    welcomeLoginButton.classList.add('fading-out');
                    setTimeout(() => {
                        welcomeLoginButton.classList.add('hidden');
                        welcomeLoginButton.classList.remove('fading-out');
                        if (welcomeUsernameDisplay) {
                            welcomeUsernameDisplay.textContent = username;
                            welcomeUsernameDisplay.classList.remove('hidden');
                            welcomeUsernameDisplay.classList.add('fading-in');
                            setTimeout(() => welcomeUsernameDisplay.classList.remove('fading-in'), 300);
                        }
                    }, 300); 
                } else {
                    welcomeLoginButton.classList.remove('hidden', 'fading-out');
                     if (welcomeUsernameDisplay) {
                        welcomeUsernameDisplay.classList.add('hidden');
                        welcomeUsernameDisplay.classList.remove('fading-in');
                        welcomeUsernameDisplay.textContent = '';
                     }
                }
            }
        }
    }

    // --- Settings, Theme, Tooltips ---
    function applyTheme(theme) {
        document.body.className = theme + '-mode';
        if (darkModeToggle) darkModeToggle.checked = theme === 'dark';
        try { localStorage.setItem('theme', theme); } 
        catch (e) { console.warn("Could not save theme to localStorage:", e); }
        updatePreview(); 
        if (popOutWindow && !popOutWindow.closed) {
             if(popOutWindow.updateTheme) popOutWindow.updateTheme(theme);
        }
    }
    function populateModelList() { 
        if (!modelListContainer) return;
        modelListContainer.innerHTML = '';
        const currentDropdownModels = getSavedDropdownModels();
        allModels.forEach(model => {
            const div = document.createElement('div');
            const checkboxId = `model-checkbox-${model.replace(/[\/\.:-]/g, '_')}`; // Sanitize model name for ID
            div.innerHTML = `<input type="checkbox" id="${checkboxId}" value="${model}" ${currentDropdownModels.includes(model) ? 'checked' : ''}><label for="${checkboxId}">${model}</label>`;
            modelListContainer.appendChild(div);
        });
    }
    function getSavedDropdownModels() {
        let saved; try { saved = localStorage.getItem('selectedModelsForDropdown'); } catch (e) { saved = null; }
        const defaultModels = ['gpt-4o-mini', 'claude-3-5-sonnet']; 
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
        let lastSelected; try { lastSelected = localStorage.getItem('selectedPuterModel'); } catch (e) { lastSelected = null; }
        modelSelect.value = (lastSelected && modelsToDisplay.includes(lastSelected)) ? lastSelected : (modelsToDisplay.length > 0 ? modelsToDisplay[0] : '');
    }
    function applyTooltipsSetting(enable) {
        const tooltipMap = {
            settingsButton: "Open Settings",
            aiHistoryButton: "View AI Prompt History",
            toggleAiToolsPanelButton: "Minimize/Maximize AI Tools Panel",
            filesButton: "Toggle File Explorer",
            toggleCodeEditorPanelButton: "Minimize/Maximize Editor Panel",
            reloadPreviewButton: "Reload Preview",
            selectElementsToggle: "Toggle Element Selection Mode",
            dragElementToggle: "Toggle Element Drag Mode",
            popOutButton: "Pop-out Preview into New Window",
            fullscreenButton: "Toggle Fullscreen Preview",
            togglePreviewPanelButton: "Minimize/Maximize Preview Panel",
            createNewFileButton: "Create New File",
            createNewFolderButton: "Create New Folder",
            uploadFileTriggerButton: "Upload Files",
            deleteAllFilesButton: "Delete All Project Files",
            generateMicrophoneButton: "Use Microphone for UI Description",
            modifyMicrophoneButton: "Use Microphone for Modify Request",
            createCheckpointButton: "Create a new checkpoint",
            viewRestoreCheckpointsButton: "View and restore checkpoints",
            uploadAiDocButton: "Upload .txt or .md files",
            typeOrEditAiDocButton: "Type or Edit a Document",
            pasteAiDocContentButton: "Paste content from clipboard",
        };
        for (const id in tooltipMap) { const element = getElem(id); if (element) element.title = enable ? tooltipMap[id] : ''; }
        try { localStorage.setItem('tooltipsEnabled', JSON.stringify(enable)); }
        catch (e) { console.warn("Could not save tooltips preference to localStorage:", e); }
    }
    
    // --- Checkpoints ---
    function createCheckpoint(reason = "Manual") {
        const currentPrompt = displayedGeneratePrompt.textContent || generatePromptInput.value || "N/A";
        const timestamp = new Date();
        const checkpoint = { 
            id: timestamp.getTime(), 
            projectFiles: JSON.parse(JSON.stringify(projectFiles)), 
            activeFileName: activeFileName,
            prompt: currentPrompt, 
            timestamp: timestamp.toISOString(), 
            reason: reason 
        };
        checkpoints.unshift(checkpoint); 
        if (checkpoints.length > 20) checkpoints.pop();
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
        if (checkpoints.length === 0) { noCheckpointsMessage.classList.remove('hidden'); } 
        else {
            noCheckpointsMessage.classList.add('hidden');
            checkpoints.forEach(cp => {
                const item = document.createElement('div'); item.classList.add('checkpoint-list-item');
                item.setAttribute('role', 'button'); item.setAttribute('tabindex', '0');
                item.innerHTML = `<strong>${escapeHTML(cp.reason)}</strong> - <span class="timestamp">${new Date(cp.timestamp).toLocaleString()}</span>
                                  <p style="font-size:0.8em; opacity: 0.7; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="Active file: ${escapeHTML(cp.activeFileName || 'N/A')}">Active: ${escapeHTML(cp.activeFileName || 'N/A')}</p>`;
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
            projectFiles = JSON.parse(JSON.stringify(checkpoint.projectFiles)); 
            activeFileName = checkpoint.activeFileName;
            
            setActiveFile(activeFileName); // This will update editor and preview

            if (checkpoint.prompt && checkpoint.prompt !== "N/A") {
                if (generatePromptInput) generatePromptInput.value = checkpoint.prompt;
                if (displayedGeneratePrompt) displayedGeneratePrompt.textContent = checkpoint.prompt;
                if (aiToolsSection1Content) aiToolsSection1Content.classList.add('hidden');
                if (generatedPromptDisplay) generatedPromptDisplay.classList.remove('hidden');
                if (aiToolsSection2) aiToolsSection2.classList.remove('hidden');
                if (aiToolsSection3) aiToolsSection3.classList.remove('hidden');
            } else { 
                if (generatePromptInput) generatePromptInput.value = "";
                if (displayedGeneratePrompt) displayedGeneratePrompt.textContent = "";
                if (aiToolsSection1Content) aiToolsSection1Content.classList.remove('hidden');
                if (generatedPromptDisplay) generatedPromptDisplay.classList.add('hidden');
                if (aiToolsSection2) aiToolsSection2.classList.add('hidden');
                if (aiToolsSection3) aiToolsSection3.classList.add('hidden');
             }
            alert(`Restored checkpoint from ${new Date(checkpoint.timestamp).toLocaleTimeString()}`);
        } else { alert("Failed to find checkpoint."); }
        if (restoreCheckpointsModal) restoreCheckpointsModal.classList.add('hidden');
        saveProjectFilesToLocalStorage(); 
        try {localStorage.setItem('activeFileName', activeFileName); } catch(e) {}
    }
    
    // --- AI & Code Generation ---
    function extractCodeFromAIResponse(aiResponseText, targetFileType) {
        if (!aiResponseText || typeof aiResponseText !== 'string') return ""; 
        let text = aiResponseText.trim();
        
        const langFenceRegex = new RegExp("```(?:" + targetFileType + ")?\\s*([\\s\\S]*?)\\s*```", "is");
        const genericFenceRegex = /```(?:\w*\n)?([\s\\S]*?)```/s; 

        let match = text.match(langFenceRegex);
        if (match && match[1]) return match[1].trim();
        
        match = text.match(genericFenceRegex);
        if (match && match[1]) return match[1].trim();

        if (targetFileType === 'html') {
            if (text.toLowerCase().startsWith('<!doctype html>') || text.toLowerCase().startsWith('<html')) return text;
        }
        return text; 
    }

    async function handleCodeGeneration(prompt, button, isModification = false) {
        if (!prompt && isModification) { alert("Please describe the modification."); return; }
        if (!prompt && !isModification) { alert("Please describe the UI to generate."); return; }

        const currentActiveFile = projectFiles.find(f => f.name === activeFileName);
        if (!currentActiveFile || currentActiveFile.type === 'folder' || currentActiveFile.type === 'image') {
            alert("No editable file selected. Please select or create a text-based file (HTML, CSS, JS, etc.).");
            return;
        }
        
        const currentCodeContent = currentActiveFile.content || '';
        if (isModification && !currentCodeContent && currentActiveFile.type !== 'folder' && currentActiveFile.type !== 'image') { 
            /* Allow modifying empty editable files */ 
        } else if (isModification && !currentCodeContent && (currentActiveFile.type === 'folder' || currentActiveFile.type === 'image')) { 
            alert("Active file is empty or not suitable for text modification."); return; 
        }


        if (autoCreateCheckpointToggle.checked) createCheckpoint(isModification ? "Auto before modification" : "Auto before generation");

        const originalButtonText = button.textContent; button.textContent = 'Thinking...'; button.disabled = true;
        updatePreviewFramePlaceholder(`AI is working on ${activeFileName}...`, false);
        
        let generatedCodeText = ""; 
        const activeFileType = currentActiveFile.type; 
        const activeContextDocs = getActiveAiContext();

        let systemInstruction = isModification 
            ? `You are an expert web developer. The user wants to modify the file named '${activeFileName}'. This file is of type '${activeFileType}'. Apply the user's modification request to the existing code. Respond ONLY with the complete, runnable, modified code for THIS FILE. Do not include explanations or apologies.`
            : `You are an expert web developer. The user wants to generate code for a file named '${activeFileName}'. This file should be of type '${activeFileType}'. Respond ONLY with the complete, runnable code for THIS FILE. Do not include explanations or apologies.`;
        
        if (activeContextDocs.length > 0) {
            systemInstruction += "\n\nConsider the following context provided by the user from their documents:\n";
            activeContextDocs.forEach(doc => {
                systemInstruction += `--- START OF DOCUMENT: ${doc.title} ---\n${doc.content}\n--- END OF DOCUMENT: ${doc.title} ---\n\n`;
            });
        }
        
        if (currentProjectTemplate === 'puter_app' && puterSystemPromptContent && !useGeminiAPI) {
             systemInstruction = puterSystemPromptContent + "\n\n" + systemInstruction;
        }


        let userPromptForAI;
        if (isModification) {
            userPromptForAI = `Existing Code for ${activeFileName}:\n\`\`\`${activeFileType}\n${currentCodeContent}\n\`\`\`\n\nUser's modification request: ${prompt}`;
        } else {
            userPromptForAI = `User's request for ${activeFileName}: ${prompt}`;
        }

        try {
            if (useGeminiAPI) {
                if (!googleAi) { initializeGeminiClient(); if(!googleAi) { alert('Gemini API not initialized.'); button.textContent = originalButtonText; button.disabled = false; return; }}
                
                const response = await googleAi.models.generateContent({ 
                    model: GEMINI_TEXT_MODEL, 
                    contents: userPromptForAI,
                    config: { systemInstruction } 
                }); 
                generatedCodeText = response.text; 
                if (typeof generatedCodeText !== 'string') { 
                    console.warn("Gemini API response.text is not a string:", response);
                    generatedCodeText = ""; 
                }
            } else { 
                const messages = [{ role: 'system', content: systemInstruction }, { role: 'user', content: userPromptForAI }];
                const response = await puter.ai.chat(messages, { model: modelSelect.value }); 
                generatedCodeText = response?.message?.content; 
                 if (typeof generatedCodeText !== 'string') { 
                    console.warn("Puter AI response.message.content is not a string:", response);
                    generatedCodeText = ""; 
                }
            }
        } catch (error) { 
            console.error("AI API error:", error); 
            const apiName = useGeminiAPI ? 'Gemini' : 'Puter AI';
            alert(`Error generating code with ${apiName}: ${error.message || 'Unknown error'}`); 
            button.textContent = originalButtonText; button.disabled = false; 
            updatePreview(); // Restore preview if there was an error
            return; 
        } finally {
            if (!useGeminiAPI) checkAuthStatus(); 
        }
        
        const finalCodeForFile = extractCodeFromAIResponse(generatedCodeText, activeFileType);
        updateFileInProject(activeFileName, finalCodeForFile);
        if(activeFileName === currentActiveFile.name && codeOutputCode) {
            codeOutputCode.textContent = finalCodeForFile;
        }

        addAiPromptToHistory({
            type: isModification ? 'Modify Code' : 'Generate Code',
            prompt: prompt,
            file: activeFileName,
            timestamp: new Date().toISOString(),
            api: useGeminiAPI ? 'Gemini' : 'Puter AI',
            model: useGeminiAPI ? GEMINI_TEXT_MODEL : modelSelect.value
        });

        const inputToClear = isModification ? modifyPromptInput : generatePromptInput;
        if (inputToClear) inputToClear.value = '';
        
        if (!isModification && generatePromptInput && displayedGeneratePrompt && aiToolsSection1Content && generatedPromptDisplay && aiToolsSection2 && aiToolsSection3) { 
            aiToolsSection1Content.classList.add('hidden');
            displayedGeneratePrompt.textContent = prompt; // Show the original prompt here
            try { localStorage.setItem('lastSuccessfulInitialPrompt', prompt); } catch(e) {}
            generatedPromptDisplay.classList.remove('hidden');
            aiToolsSection2.classList.remove('hidden');
            aiToolsSection3.classList.remove('hidden');
            try { localStorage.setItem('initialGenerationDone', JSON.stringify(true)); } catch(e) {}
        }
        button.textContent = originalButtonText; button.disabled = false;
        updatePreview(); // Ensure preview is updated with new content
    }

    // --- Element Path Selector ---
    function getElementPathSelector(el) {
        if (!el || !el.parentElement) return 'body';
        if (el.id && /^[a-zA-Z][\w-]*$/.test(el.id)) return `#${el.id}`; 

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
    
    // --- Main App & PopOut Element Editor UI Update & Sync ---
    function updateElementEditorUI(element, editorType = 'main') { // editorType: 'main' or 'popout'
        let controlsPrefix = '';
        let targetIdentifier = selectedElementIdentifier;
        let targetTextContent = elementTextContentInput;
        let targetColor = elementColorInput;
        let targetBgColor = elementBgColorInput;
        let targetWidth = elementWidthInput;
        let targetHeight = elementHeightInput;
        let targetPadding = elementPaddingInput;
        let targetMargin = elementMarginInput;
        let targetPosition = elementPositionSelect;
        let targetDisplay = elementDisplaySelect;
        let targetTextAlign = elementTextAlignSelect;
        let targetBorder = elementBorderInput;
        let targetBorderRadius = elementBorderRadiusInput;
        let targetCustomCSS = elementCustomCSSInput;
        let targetEditorControls = elementEditorControls;

        if (editorType === 'popout' && popOutWindow && popOutWindow.document) {
            controlsPrefix = 'popout_';
            targetIdentifier = popOutWindow.document.getElementById(`${controlsPrefix}selectedElementIdentifier`);
            targetTextContent = popOutWindow.document.getElementById(`${controlsPrefix}elementTextContent`);
            targetColor = popOutWindow.document.getElementById(`${controlsPrefix}elementColor`);
            targetBgColor = popOutWindow.document.getElementById(`${controlsPrefix}elementBgColor`);
            targetWidth = popOutWindow.document.getElementById(`${controlsPrefix}elementWidth`);
            targetHeight = popOutWindow.document.getElementById(`${controlsPrefix}elementHeight`);
            targetPadding = popOutWindow.document.getElementById(`${controlsPrefix}elementPadding`);
            targetMargin = popOutWindow.document.getElementById(`${controlsPrefix}elementMargin`);
            targetPosition = popOutWindow.document.getElementById(`${controlsPrefix}elementPosition`);
            targetDisplay = popOutWindow.document.getElementById(`${controlsPrefix}elementDisplay`);
            targetTextAlign = popOutWindow.document.getElementById(`${controlsPrefix}elementTextAlign`);
            targetBorder = popOutWindow.document.getElementById(`${controlsPrefix}elementBorder`);
            targetBorderRadius = popOutWindow.document.getElementById(`${controlsPrefix}elementBorderRadius`);
            targetCustomCSS = popOutWindow.document.getElementById(`${controlsPrefix}elementCustomCSS`);
            targetEditorControls = popOutWindow.document.getElementById('popoutEditElementCard');
        }
        
        if (!element || !targetEditorControls) {
            if(targetEditorControls) targetEditorControls.classList.add('hidden');
            if(targetIdentifier) targetIdentifier.textContent = 'N/A';
            return;
        }

        const tagName = element.tagName.toLowerCase(); 
        const id = element.id ? `#${element.id}` : '';
        let classes = ''; 
        if (element.className && typeof element.className === 'string') {
            classes = `.${element.className.split(' ').filter(c => c && !c.startsWith('preview-element-')).join('.')}`;
        }
        if(targetIdentifier) targetIdentifier.textContent = `${tagName}${id}${classes}`;
        
        const computedStyle = element.ownerDocument.defaultView.getComputedStyle(element);
        if(targetTextContent) targetTextContent.value = element.firstChild?.nodeType === 3 ? element.firstChild.textContent.trim() : (element.textContent || '').trim();
        if(targetColor) targetColor.value = rgbToHex(computedStyle.color) || '#000000';
        if(targetBgColor) targetBgColor.value = rgbToHex(computedStyle.backgroundColor) || '#ffffff';
        if(targetWidth) targetWidth.value = computedStyle.width === 'auto' ? '' : computedStyle.width;
        if(targetHeight) targetHeight.value = computedStyle.height === 'auto' ? '' : computedStyle.height;
        if(targetPadding) targetPadding.value = computedStyle.padding;
        if(targetMargin) targetMargin.value = computedStyle.margin;
        if(targetPosition) targetPosition.value = computedStyle.position === 'static' ? '' : computedStyle.position; 
        if(targetDisplay) targetDisplay.value = computedStyle.display === 'block' ? '' : computedStyle.display; 
        if(targetTextAlign) targetTextAlign.value = computedStyle.textAlign === 'start' || computedStyle.textAlign === 'auto' ? '' : computedStyle.textAlign;
        if(targetBorder) targetBorder.value = computedStyle.border.includes('none') || computedStyle.borderWidth === "0px" ? '' : computedStyle.border;
        if(targetBorderRadius) targetBorderRadius.value = computedStyle.borderRadius === '0px' ? '' : computedStyle.borderRadius;
        if(targetCustomCSS) targetCustomCSS.value = ''; 
        
        targetEditorControls.classList.remove('hidden');
    }

    function syncEditorInputChange(sourceEditorType, propertyName, value) {
        const targetEditorType = sourceEditorType === 'main' ? 'popout' : 'main';
        let targetInput;
        let inputId = propertyName; // Default to direct match for main app
    
        // Construct ID for popout or map to main app input
        if (targetEditorType === 'popout' && popOutWindow && popOutWindow.document) {
            if (propertyName === 'textContent') inputId = 'popout_elementTextContent';
            else if (propertyName === 'color') inputId = 'popout_elementColor';
            else if (propertyName === 'backgroundColor') inputId = 'popout_elementBgColor';
            else if (propertyName === 'width') inputId = 'popout_elementWidth';
            else if (propertyName === 'height') inputId = 'popout_elementHeight';
            else if (propertyName === 'padding') inputId = 'popout_elementPadding';
            else if (propertyName === 'margin') inputId = 'popout_elementMargin';
            else if (propertyName === 'position') inputId = 'popout_elementPosition';
            else if (propertyName === 'display') inputId = 'popout_elementDisplay';
            else if (propertyName === 'textAlign') inputId = 'popout_elementTextAlign';
            else if (propertyName === 'border') inputId = 'popout_elementBorder';
            else if (propertyName === 'borderRadius') inputId = 'popout_elementBorderRadius';
            else if (propertyName === 'customCSS') inputId = 'popout_elementCustomCSS';
            targetInput = popOutWindow.document.getElementById(inputId);
        } else if (targetEditorType === 'main') {
            if (propertyName === 'textContent') targetInput = elementTextContentInput;
            else if (propertyName === 'color') targetInput = elementColorInput;
            else if (propertyName === 'backgroundColor') targetInput = elementBgColorInput;
            else if (propertyName === 'width') targetInput = elementWidthInput;
            else if (propertyName === 'height') targetInput = elementHeightInput;
            else if (propertyName === 'padding') targetInput = elementPaddingInput;
            else if (propertyName === 'margin') targetInput = elementMarginInput;
            else if (propertyName === 'position') targetInput = elementPositionSelect;
            else if (propertyName === 'display') targetInput = elementDisplaySelect;
            else if (propertyName === 'textAlign') targetInput = elementTextAlignSelect;
            else if (propertyName === 'border') targetInput = elementBorderInput;
            else if (propertyName === 'borderRadius') targetInput = elementBorderRadiusInput;
            else if (propertyName === 'customCSS') targetInput = elementCustomCSSInput;
        }
    
        if (targetInput && targetInput.value !== value) {
            targetInput.value = value;
        }
    }
    
    const elementEditorInputIds = [
        'elementTextContent', 'elementColor', 'elementBgColor', 'elementWidth', 'elementHeight',
        'elementPadding', 'elementMargin', 'elementPosition', 'elementDisplay', 'elementTextAlign',
        'elementBorder', 'elementBorderRadius', 'elementCustomCSS'
    ];

    elementEditorInputIds.forEach(id => {
        const input = getElem(id);
        if (input) {
            input.addEventListener('input', () => {
                if (currentSelectedElementSelector) { 
                    const propertyKey = id.replace(/^element/, '').charAt(0).toLowerCase() + id.replace(/^element/, '').slice(1);
                    syncEditorInputChange('main', propertyKey, input.value);
                }
            });
        }
    });


    // --- Main App Element Selection Toggle ---
    function toggleMainAppElementSelectionMode() {
        isMainAppSelectingElement = !isMainAppSelectingElement;
        isMainAppDraggingElement = false; 

        if(selectElementButton) { 
            selectElementButton.textContent = isMainAppSelectingElement ? 'Cancel Selection' : 'Select Element to Edit';
            selectElementButton.classList.toggle('active-selection', isMainAppSelectingElement);
        }
        if(selectElementsToggle) { 
            selectElementsToggle.classList.toggle('active-selection', isMainAppSelectingElement);
            selectElementsToggle.title = isMainAppSelectingElement ? 'Turn OFF Element Selection' : 'Turn ON Element Selection';
        }
        if(dragElementToggle) dragElementToggle.classList.remove('active-selection'); 

        document.body.classList.toggle('element-selection-active', isMainAppSelectingElement);
        document.body.classList.remove('element-dragging-active');


        if (!isMainAppSelectingElement) { 
            [previewFrame?.contentDocument, popOutWindow?.document].forEach(doc => {
                if (doc) doc.querySelectorAll('.preview-element-hover-highlight').forEach(el => el.classList.remove('preview-element-hover-highlight'));
            });
        }
        if (popOutWindow && popOutWindow.setPopOutSelectionMode) {
            popOutWindow.setPopOutSelectionMode(isMainAppSelectingElement, false); 
        }
    }
    
    function toggleMainAppDragMode() {
        isMainAppDraggingElement = !isMainAppDraggingElement;
        isMainAppSelectingElement = false; 

        if(dragElementToggle) {
            dragElementToggle.classList.toggle('active-selection', isMainAppDraggingElement);
            dragElementToggle.title = isMainAppDraggingElement ? 'Turn OFF Drag Mode' : 'Turn ON Drag Mode';
        }
        if(selectElementsToggle) selectElementsToggle.classList.remove('active-selection');
        if(selectElementButton) { // Main AI tools select button
            selectElementButton.classList.remove('active-selection');
            selectElementButton.textContent = 'Select Element to Edit';
        }


        document.body.classList.toggle('element-dragging-active', isMainAppDraggingElement);
        document.body.classList.remove('element-selection-active');

        if(popOutWindow && popOutWindow.setPopOutDragMode) {
            popOutWindow.setPopOutDragMode(isMainAppDraggingElement);
        }
        
        setupDragListeners(previewFrame?.contentDocument, 'iframe', isMainAppDraggingElement);
        if (popOutWindow && popOutWindow.document) {
            setupDragListeners(popOutWindow.document, 'popout', isMainAppDraggingElement);
        }
    }


    // --- Cross-window selection processing & highlight sync ---
    window.processSelectionFromAnywhere = (selector, sourceWindowType) => { 
        currentSelectedElementSelector = selector;
        try { localStorage.setItem('currentSelectedElementSelector', selector); } catch(e) {}
        
        let selectedElInstance = null;
        if (previewFrame && previewFrame.contentDocument) {
            const mainFrameEl = getElementBySelector(previewFrame.contentDocument, selector);
            const prevSelectedInMain = previewFrame.contentDocument.querySelector('.preview-element-selected-highlight');
            if (prevSelectedInMain) prevSelectedInMain.classList.remove('preview-element-selected-highlight');
            if (mainFrameEl) {
                mainFrameEl.classList.add('preview-element-selected-highlight');
                selectedElInstance = mainFrameEl;
            }
            updateElementEditorUI(mainFrameEl, 'main'); 
        }

        if (popOutWindow && !popOutWindow.closed && popOutWindow.document) {
            const popOutEl = getElementBySelector(popOutWindow.document, selector);
            const prevSelectedInPopOut = popOutWindow.document.querySelector('.preview-element-selected-highlight');
            if (prevSelectedInPopOut) prevSelectedInPopOut.classList.remove('preview-element-selected-highlight');
            if (popOutEl) {
                popOutEl.classList.add('preview-element-selected-highlight');
                if (!selectedElInstance) selectedElInstance = popOutEl; 
            }
            
            if(popOutWindow.updatePopOutEditorUIFromMain) popOutWindow.updatePopOutEditorUIFromMain(selectedElInstance);
        }
        
        // If selection was initiated from main app's AI Tools "Select Element" button, deactivate that button.
        if (isMainAppSelectingElement && sourceWindowType !== 'popout_button_initiated' && sourceWindowType !== 'main_preview_header_button_initiated') {
            if(selectElementButton && selectElementButton.classList.contains('active-selection')) {
                toggleMainAppElementSelectionMode(); // This will also update selectElementsToggle in main preview
            }
        }
        // If selection was initiated by the main preview header's select button, it remains active for further selections.
        // If selection was initiated by the popout's select button, its own logic handles deactivation.
    };

    // --- Preview Interaction Listeners (for both iframe and popout) ---
    function setupPreviewInteractionListeners(doc, windowType) { 
        if (!doc || !doc.body) return;
        
        const getSelectionController = () => {
            if (windowType === 'popout') return popOutWindow?.isPopOutEditorSelectingElementForWindow;
            return isMainAppSelectingElement;
        };

        doc.body.addEventListener('mouseover', (e) => {
            if (!getSelectionController() || e.target === doc.body || e.target === doc.documentElement) return;
            if (e.target.closest && e.target.closest('.popout-edit-element-card')) return;
            e.target.classList.add('preview-element-hover-highlight');
        });
        doc.body.addEventListener('mouseout', (e) => {
            e.target.classList.remove('preview-element-hover-highlight');
        });
        doc.body.addEventListener('click', (e) => {
            if (!getSelectionController() || e.target === doc.body || e.target === doc.documentElement) return;
             if (e.target.closest && e.target.closest('.popout-edit-element-card')) return; 
            e.preventDefault(); e.stopPropagation();
            const selector = getElementPathSelector(e.target);

            if (windowType === 'popout') {
                if(popOutWindow?.processSelectionInPopOutWindow) popOutWindow.processSelectionInPopOutWindow(selector, 'popout_click');
            } else { // iframe
                window.processSelectionFromAnywhere(selector, 'iframe_click');
            }
        }, true);
    }
    
    // --- Main App Manual Element Changes (can be called by popout too) ---
    window.applyElementChanges = (data, sourceEditorType = 'main') => { 
        if (!currentSelectedElementSelector) { alert("No element selected."); return false; }
        const indexHtmlFile = projectFiles.find(f => f.name === 'index.html');
        if (!indexHtmlFile) { alert("index.html not found. Element edits currently target index.html only."); return false; }

        const tempDoc = new DOMParser().parseFromString(indexHtmlFile.content, 'text/html');
        const elInTempDoc = getElementBySelector(tempDoc, currentSelectedElementSelector);
        if (!elInTempDoc) { alert("Selected element not found in the stored index.html content."); return false; }

        if (data.textContent !== undefined ) {
            // Clear existing child nodes if they are not elements (to replace text content)
            let onlyTextOrNoChildren = true;
            elInTempDoc.childNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) onlyTextOrNoChildren = false;
            });

            if (onlyTextOrNoChildren) {
                elInTempDoc.textContent = data.textContent;
            } else if (elInTempDoc.firstChild?.nodeType === Node.TEXT_NODE) {
                elInTempDoc.firstChild.textContent = data.textContent;
            } else {
                // If complex children, maybe insert text at beginning or warn user. For now, prefer replacing if simple.
                console.warn("Element has complex children, text content change might be ambiguous. Applied to .textContent");
                elInTempDoc.textContent = data.textContent;
            }
        }
        
        let styleChanges = [];
        if (data.color) styleChanges.push(`color: ${data.color};`);
        if (data.backgroundColor) styleChanges.push(`background-color: ${data.backgroundColor};`);
        if (data.width) styleChanges.push(`width: ${data.width};`);
        if (data.height) styleChanges.push(`height: ${data.height};`);
        if (data.padding) styleChanges.push(`padding: ${data.padding};`);
        if (data.margin) styleChanges.push(`margin: ${data.margin};`);
        if (data.position) styleChanges.push(`position: ${data.position};`);
        if (data.display) styleChanges.push(`display: ${data.display};`);
        if (data.textAlign) styleChanges.push(`text-align: ${data.textAlign};`);
        if (data.border) styleChanges.push(`border: ${data.border};`);
        if (data.borderRadius) styleChanges.push(`border-radius: ${data.borderRadius};`);
        
        let existingStyle = elInTempDoc.getAttribute('style') || "";
        if (existingStyle && !existingStyle.endsWith(';')) existingStyle += '; ';
        
        let combinedStyle = existingStyle;
        styleChanges.forEach(change => {
            const prop = change.substring(0, change.indexOf(':')).trim();
            const styleRegex = new RegExp(`(^|;\\s*)${prop}\\s*:[^;]+(;|\$)`, 'gi');
            combinedStyle = combinedStyle.replace(styleRegex, '$1').trim(); 
            combinedStyle = (combinedStyle ? combinedStyle + (combinedStyle.endsWith(';') ? ' ' : '; ') : '') + change;
        });
        
        if (data.customCSS) { 
             combinedStyle = (combinedStyle.trim() ? combinedStyle.trim() + (combinedStyle.endsWith(';') ? ' ' : '; ') : '') + data.customCSS.trim();
        }

        if (combinedStyle.trim()) {
            elInTempDoc.setAttribute('style', combinedStyle.trim());
        } else {
            elInTempDoc.removeAttribute('style');
        }
        
        const newHtml = tempDoc.documentElement.outerHTML;
        updateFileInProject('index.html', newHtml); 
        
        processSelectionFromAnywhere(currentSelectedElementSelector, 'manual_edit_applied');

        if (sourceEditorType === 'popout' && popOutWindow && popOutWindow.hidePopOutEditCard) {
            popOutWindow.hidePopOutEditCard();
            if (popOutWindow.setPopOutSelectionMode) popOutWindow.setPopOutSelectionMode(false, false);
        }
        return true;
    };

    
    // --- Main App AI Element Changes (can be called by popout too) ---
    window.handleAIEditRequest = async (elementOuterHTML, aiPrompt, selectorToUpdate, sourceButton, sourceEditorType = 'main') => {
        if (!selectorToUpdate) { alert("No element selector provided for AI edit."); return false; }
        const indexHtmlFile = projectFiles.find(f => f.name === 'index.html');
        if (!indexHtmlFile) { alert("index.html not found. AI element edits currently target index.html only."); return false; }

        const originalButtonText = sourceButton.textContent; sourceButton.textContent = 'AI Thinking...'; sourceButton.disabled = true;
        let modifiedElementSnippet = "";

        const activeContextDocs = getActiveAiContext();
        let systemInstruction = "You are an expert web developer. Given an HTML element's code and a modification request, return ONLY the modified HTML code for that element. Ensure your response is just the new HTML snippet for the element. Do not include explanations or apologies.";
        if (activeContextDocs.length > 0) {
            systemInstruction += "\n\nConsider the following context provided by the user from their documents:\n";
            activeContextDocs.forEach(doc => {
                systemInstruction += `--- START OF DOCUMENT: ${doc.title} ---\n${doc.content}\n--- END OF DOCUMENT: ${doc.title} ---\n\n`;
            });
        }

        const fullPromptForAI = `Original element code:\n\`\`\`html\n${elementOuterHTML}\n\`\`\`\n\nModification request: ${aiPrompt}\n\nReturn only the modified HTML for this element:`;

        try {
            if (useGeminiAPI) {
                if (!googleAi) { initializeGeminiClient(); if(!googleAi){ alert("Gemini API not initialized for element edit."); sourceButton.textContent = originalButtonText; sourceButton.disabled = false; return false; }}
                const response = await googleAi.models.generateContent({ model: GEMINI_TEXT_MODEL, contents: fullPromptForAI, config: { systemInstruction } });
                modifiedElementSnippet = response.text; 
                 if (typeof modifiedElementSnippet !== 'string') { 
                    console.warn("Gemini API response.text for element edit is not a string:", response);
                    modifiedElementSnippet = ""; 
                }
            } else {
                const response = await puter.ai.chat([{ role: 'system', content: systemInstruction }, { role: 'user', content: fullPromptForAI }], { model: modelSelect.value });
                modifiedElementSnippet = response?.message?.content; 
                 if (typeof modifiedElementSnippet !== 'string') { 
                    console.warn("Puter AI response.message.content for element edit is not a string:", response);
                    modifiedElementSnippet = ""; 
                }
            }
        } catch (error) { 
            console.error("AI Element Edit error:", error); 
            alert(`Error modifying element with AI: ${error.message || 'Unknown error'}`); 
            sourceButton.textContent = originalButtonText; sourceButton.disabled = false; 
            return false; 
        } finally {
            if (!useGeminiAPI) checkAuthStatus(); 
        }


        modifiedElementSnippet = extractCodeFromAIResponse(modifiedElementSnippet, 'html'); 

        const tempDoc = new DOMParser().parseFromString(indexHtmlFile.content, 'text/html');
        const elToReplaceInTempDoc = getElementBySelector(tempDoc, selectorToUpdate);

        if (elToReplaceInTempDoc && elToReplaceInTempDoc.parentElement) {
            const tempContainer = tempDoc.createElement('div');
            tempContainer.innerHTML = modifiedElementSnippet; 
            const newElement = tempContainer.firstElementChild;
            if (newElement) {
                elToReplaceInTempDoc.parentElement.replaceChild(newElement, elToReplaceInTempDoc);
                const newFullHtml = tempDoc.documentElement.outerHTML;
                updateFileInProject('index.html', newFullHtml);
                
                const newSelector = getElementPathSelector(newElement);
                currentSelectedElementSelector = newSelector || selectorToUpdate; 

                try { localStorage.setItem('currentSelectedElementSelector', currentSelectedElementSelector); } catch(e) {}
                processSelectionFromAnywhere(currentSelectedElementSelector, 'ai_edit_applied'); 

                if (sourceEditorType === 'main' && editElementPromptInput) editElementPromptInput.value = '';
                else if (sourceEditorType === 'popout' && popOutWindow && popOutWindow.clearPopoutAiPrompt) popOutWindow.clearPopoutAiPrompt();
                
                sourceButton.textContent = originalButtonText; sourceButton.disabled = false;
                 if (sourceEditorType === 'popout' && popOutWindow && popOutWindow.hidePopOutEditCard) {
                    popOutWindow.hidePopOutEditCard();
                    if (popOutWindow.setPopOutSelectionMode) popOutWindow.setPopOutSelectionMode(false, false);
                }
                return true;
            }
        }
        alert("Failed to apply AI modification. The AI's response might not have been valid HTML or the element structure changed too much.");
        sourceButton.textContent = originalButtonText; sourceButton.disabled = false;
        return false;
    };
    
    // --- UI Updates, Placeholders, Pop-out & Preview Sync ---
    function getPreviewStyles() {
        let currentTheme = 'dark'; try { currentTheme = localStorage.getItem('theme') || 'dark'; } catch(e) {}
        const mainDocStyle = getComputedStyle(document.documentElement);
        const accentColor = mainDocStyle.getPropertyValue(currentTheme === 'dark' ? '--accent-color-dark' : '--accent-color-light').trim();
        const accentColorRgb = mainDocStyle.getPropertyValue(currentTheme === 'dark' ? '--accent-color-rgb-dark' : '--accent-color-rgb-light').trim();
        
        return `
            :root { 
                --preview-accent-color: ${accentColor};
                --preview-accent-color-rgb: ${accentColorRgb};
            }
            .preview-element-hover-highlight { 
                outline: 2px dashed var(--preview-accent-color) !important; 
                cursor: pointer !important; 
                box-shadow: 0 0 8px rgba(var(--preview-accent-color-rgb), 0.5) !important; 
                background-color: rgba(var(--preview-accent-color-rgb), 0.05) !important;
            }
            .preview-element-selected-highlight { 
                outline: 3px solid var(--preview-accent-color) !important; 
                box-shadow: 0 0 0 4px rgba(var(--preview-accent-color-rgb), 0.7), inset 0 0 6px rgba(var(--preview-accent-color-rgb), 0.2) !important;
                background-color: rgba(var(--preview-accent-color-rgb), 0.1) !important;
            }
            .preview-element-draggable {
                cursor: grab !important;
                opacity: 0.7;
                border: 2px dashed var(--preview-accent-color) !important;
            }
            .preview-element-draggable:active { cursor: grabbing !important; }
            .drop-target-indicator {
                height: 3px;
                background-color: var(--preview-accent-color);
                margin: 1px 0;
                box-shadow: 0 0 5px var(--preview-accent-color);
                pointer-events: none; 
            }
            body.element-dragging-active * { 
                 user-select: none !important;
                -webkit-user-select: none !important;
            }

        `;
    }
    function updatePreviewFramePlaceholder(message, isError = false) {
        if (!previewFrame) return;
        let currentTheme = 'dark'; try { currentTheme = localStorage.getItem('theme') || 'dark'; } catch(e) {}
        const color = isError ? (currentTheme === 'dark' ? 'var(--error-color-dark)' : 'var(--error-color-light)') 
                              : (currentTheme === 'dark' ? 'var(--subtle-text-dark)' : 'var(--subtle-text-light)');
        const bgColor = currentTheme === 'dark' ? 'var(--panel-bg-dark)' : 'var(--panel-bg-light)';
        const fontFamily = getComputedStyle(document.body).fontFamily;
        const injectedStyles = getPreviewStyles();

        const placeholderHtml = `<!DOCTYPE html><html><head><style>
            ${injectedStyles} 
            body { margin:0; display:flex; justify-content:center; align-items:center; height:100vh; font-family: ${fontFamily}; color:${color}; background-color:${bgColor}; text-align: center; padding: 20px; }
            p { max-width: 80%; }
            </style></head><body><p>${escapeHTML(message)}</p></body></html>`;
        previewFrame.srcdoc = placeholderHtml;
        if (popOutWindow && !popOutWindow.closed && popOutWindow.document) {
            popOutWindow.document.open(); popOutWindow.document.write(placeholderHtml); popOutWindow.document.close();
            if(popOutWindow.document.body) {
                setupPreviewInteractionListeners(popOutWindow.document, 'popout'); 
                 if (popOutWindow.setPopOutSelectionMode) popOutWindow.setPopOutSelectionMode(isMainAppSelectingElement, false); 
                 if (popOutWindow.setPopOutDragMode) popOutWindow.setPopOutDragMode(isMainAppDraggingElement); 
                 setupDragListeners(popOutWindow.document, 'popout', isMainAppDraggingElement);
            }
            if (popOutWindow.setupPopOutSpecificUI) popOutWindow.setupPopOutSpecificUI(); 
        }
    }
    function updatePreview() {
        const indexHtmlFile = projectFiles.find(f => f.name === 'index.html');
        let htmlContentToPreview;

        if (indexHtmlFile && indexHtmlFile.type === 'html') {
            htmlContentToPreview = indexHtmlFile.content || '';
        } else {
            const activeFile = projectFiles.find(f => f.name === activeFileName);
            if (activeFile && activeFile.type === 'html') {
                htmlContentToPreview = activeFile.content || '';
            } else {
                updatePreviewFramePlaceholder("No index.html found. Create one, or select an HTML file to preview it.", false);
                return;
            }
        }
        updatePreviewFrameAndPopout(htmlContentToPreview, false);
    }
    function updatePreviewFrameAndPopout(htmlContent, isError = false, forceHighlightSync = false) { 
        if (!previewFrame) return;
        if (isError) { updatePreviewFramePlaceholder(htmlContent, true); return; }
        if (!htmlContent || htmlContent.startsWith("No code generated yet.")) { updatePreviewFramePlaceholder(htmlContent || "Preview will appear here"); return; }
        
        const styleInjection = `<style id="jr-vibe-code-preview-styles">${getPreviewStyles()}</style>`;
        let finalHtmlContent = htmlContent;

        const headMatch = finalHtmlContent.match(/<head[^>]*>/i);
        if (headMatch) {
            finalHtmlContent = finalHtmlContent.replace(headMatch[0], headMatch[0] + styleInjection);
        } else {
            const htmlTagMatch = finalHtmlContent.match(/<html[^>]*>/i);
            if (htmlTagMatch) {
                finalHtmlContent = finalHtmlContent.replace(htmlTagMatch[0], `${htmlTagMatch[0]}<head>${styleInjection}</head>`);
            } else { 
                finalHtmlContent = `<html><head>${styleInjection}</head><body>${htmlContent}</body></html>`;
            }
        }
        previewFrame.srcdoc = finalHtmlContent;

        function setupInteractionsAndSyncHighlights(doc, windowType) {
            if(!doc || !doc.body) return; 
            setupPreviewInteractionListeners(doc, windowType);
            setupDragListeners(doc, windowType, isMainAppDraggingElement || (popOutWindow && popOutWindow.isPopOutDraggingElement));

            if (currentSelectedElementSelector) {
                 const elToHighlight = getElementBySelector(doc, currentSelectedElementSelector);
                 if (elToHighlight) {
                    const prevSelected = doc.querySelector('.preview-element-selected-highlight');
                    if(prevSelected) prevSelected.classList.remove('preview-element-selected-highlight');
                    elToHighlight.classList.add('preview-element-selected-highlight');
                 }
            }
        }
        previewFrame.onload = () => { 
            if (previewFrame.contentDocument) {
                setupInteractionsAndSyncHighlights(previewFrame.contentDocument, 'iframe'); 
            }
            previewFrame.onload = null; 
        };

        if (popOutWindow && !popOutWindow.closed && popOutWindow.document) {
            const currentScrollX = popOutWindow.scrollX; const currentScrollY = popOutWindow.scrollY;
            popOutWindow.document.open(); popOutWindow.document.write(finalHtmlContent); popOutWindow.document.close();
            if (popOutWindow.document.body) { 
                setupInteractionsAndSyncHighlights(popOutWindow.document, 'popout');
                if (popOutWindow.setupPopOutSpecificUI) popOutWindow.setupPopOutSpecificUI(); 
                popOutWindow.scrollTo(currentScrollX, currentScrollY); 
            }
        } else if (forceHighlightSync && currentSelectedElementSelector && previewFrame.contentDocument) {
             const mainFrameEl = getElementBySelector(previewFrame.contentDocument, currentSelectedElementSelector);
             if (mainFrameEl) {
                const prevSelected = previewFrame.contentDocument.querySelector('.preview-element-selected-highlight'); 
                if(prevSelected) prevSelected.classList.remove('preview-element-selected-highlight');
                mainFrameEl.classList.add('preview-element-selected-highlight');
             }
        }
    }
    
    // --- Pop-out Window Specific Logic ---
    function handlePopOut() {
        if (popOutWindow && !popOutWindow.closed) { popOutWindow.focus(); return; }
        popOutWindow = window.open('', 'VibeCodePreviewPopOut', 'width=1024,height=768,resizable=yes,scrollbars=yes');
        if (popOutWindow) {
            popOutWindow.document.title = "Live Preview - JR Vibe Code";
            popOutWindow.openerApp = { 
                getElementPathSelector: getElementPathSelector, 
                processSelectionInMain: window.processSelectionFromAnywhere,
                applyElementChangesFromPopOut: (data) => window.applyElementChanges(data, 'popout'),
                handleAIEditRequestFromPopOut: (html, prompt, selector, button) => window.handleAIEditRequest(html, prompt, selector, button, 'popout'),
                getThemeVars: () => { 
                    const mainDocStyle = getComputedStyle(document.documentElement);
                    const isDark = document.body.classList.contains('dark-mode');
                    return {
                        fontFamily: mainDocStyle.fontFamily,
                        panelBg: isDark ? mainDocStyle.getPropertyValue('--panel-bg-dark').trim() : mainDocStyle.getPropertyValue('--panel-bg-light').trim(),
                        panelBgRgb: isDark ? '36, 36, 36' : '255, 255, 255', // Example RGB values, adjust if needed
                        textColor: isDark ? mainDocStyle.getPropertyValue('--text-color-dark').trim() : mainDocStyle.getPropertyValue('--text-color-light').trim(),
                        buttonSecondaryBorder: isDark ? mainDocStyle.getPropertyValue('--button-secondary-border-dark').trim() : mainDocStyle.getPropertyValue('--button-secondary-border-light').trim(),
                        buttonSecondaryText: isDark ? mainDocStyle.getPropertyValue('--button-secondary-text-dark').trim() : mainDocStyle.getPropertyValue('--button-secondary-text-light').trim(),
                        buttonSecondaryHoverBg: isDark ? mainDocStyle.getPropertyValue('--button-secondary-hover-bg-dark').trim() : mainDocStyle.getPropertyValue('--button-secondary-hover-bg-light').trim(),
                        accentColor: isDark ? mainDocStyle.getPropertyValue('--accent-color-dark').trim() : mainDocStyle.getPropertyValue('--accent-color-light').trim(),
                        accentColorRgb: isDark ? mainDocStyle.getPropertyValue('--accent-color-rgb-dark').trim() : mainDocStyle.getPropertyValue('--accent-color-rgb-light').trim(),
                        buttonPrimaryText: isDark ? mainDocStyle.getPropertyValue('--button-primary-text-dark').trim() : mainDocStyle.getPropertyValue('--button-primary-text-light').trim(),
                    };
                 },
                getPreviewStylesForPopOut: getPreviewStyles,
                notifyInputChangeToMain: syncEditorInputChange,
                getCurrentSelectedElementOuterHTML: () => {
                    if (currentSelectedElementSelector && previewFrame.contentDocument) {
                        const el = getElementBySelector(previewFrame.contentDocument, currentSelectedElementSelector);
                        return el ? el.outerHTML : null;
                    }
                    return null;
                },
                toggleMainDragMode: toggleMainAppDragMode, 
                isMainAppDragging: () => isMainAppDraggingElement, 
                 performDropInMain: (draggedSelector, targetSelector, position) => {
                    return handleDrop(draggedSelector, targetSelector, position, 'popout_initiated');
                }
            };
            
            const popOutDoc = popOutWindow.document;
            const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            const themeVars = popOutWindow.openerApp.getThemeVars();

            const mainEditorControlsHTML = elementEditorControls.innerHTML;
            const popoutEditorControlsHTML = mainEditorControlsHTML.replace(/id="(\w+)"/g, (match, id) => `id="popout_${id}"`)
                                                                .replace(/for="(\w+)"/g, (match, id) => `for="popout_${id}"`);
            
            popOutDoc.write(`
                <html><head><title>Pop-out Preview</title>
                <style id="popout-base-styles">
                    body { margin: 0; font-family: ${themeVars.fontFamily}; background-color: ${themeVars.panelBg}; color: ${themeVars.textColor}; overflow: auto; }
                    .popout-toolbar { position: fixed; top: 5px; right: 5px; z-index: 2001; background-color: rgba(${themeVars.panelBgRgb},0.8); backdrop-filter: blur(5px); padding: 5px; border-radius: 6px; display: flex; gap: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
                    .popout-header-button { background: none; border: 1px solid ${themeVars.buttonSecondaryBorder}; color: ${themeVars.buttonSecondaryText}; padding: 6px 8px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }
                    .popout-header-button .icon { width: 1em; height: 1em; fill: currentColor; }
                    .popout-header-button:hover { background-color: ${themeVars.buttonSecondaryHoverBg}; }
                    .popout-header-button.active-selection { background-color: ${themeVars.accentColor} !important; color: ${themeVars.buttonPrimaryText} !important; border-color: ${themeVars.accentColor} !important; box-shadow: 0 0 8px rgba(${themeVars.accentColorRgb.split(',').join(',')}, 0.7); }
                </style>
                <style id="popout-ui-styles"></style> <!-- For dynamic UI styles like .popout-edit-element-card -->
                <style id="main-highlight-styles"></style> <!-- For .preview-element-* styles -->
                </head><body>
                <div class="popout-toolbar">
                    <button id="popout_selectElementButton" class="popout-header-button" title="Select Element">
                        ${ICONS.selectElement ? createIconSVG(ICONS.selectElement, "icon").outerHTML : 'Select'}
                    </button>
                    <button id="popout_dragElementButton" class="popout-header-button" title="Drag Element">
                        ${ICONS.drag ? createIconSVG(ICONS.drag, "icon").outerHTML : 'Drag'}
                    </button>
                </div>
                <div id="popoutEditElementCard" class="popout-edit-element-card hidden">
                    <h5>Editing: <span id="popout_selectedElementIdentifier">N/A</span></h5>
                    ${popoutEditorControlsHTML}
                </div>
                </body></html>`);
            
            const scriptEl = popOutDoc.createElement('script');
            scriptEl.textContent = `
                let popOutSelectButton = document.getElementById('popout_selectElementButton');
                let popOutDragButton = document.getElementById('popout_dragElementButton');
                let popOutEditCard = document.getElementById('popoutEditElementCard');
                window.isPopOutEditorSelectingElementForWindow = false; // Expose to parent for checking
                window.isPopOutDraggingElement = false; // Expose to parent for checking
                let popoutSelectedElementSelector = null;
                let popoutDraggedElement = null;
                let popoutDropIndicator = null;


                function setupPopOutSpecificUI() {
                    if (!window.openerApp || !document.body) { setTimeout(setupPopOutSpecificUI, 50); return; }
                    
                    document.getElementById('main-highlight-styles').textContent = window.openerApp.getPreviewStylesForPopOut();
                    const popoutUIStyles = document.getElementById('popout-ui-styles');
                    if (popoutUIStyles) { // Inject styles for the card itself
                        const theme = window.openerApp.getThemeVars();
                        popoutUIStyles.textContent = \`
                            .popout-edit-element-card { position: fixed; top: 50px; right: 10px; width: 300px; max-height: calc(100vh - 70px); overflow-y: auto; padding: 15px; border-radius: 8px; z-index: 2000; transition: opacity 0.3s, transform 0.3s; 
                                background-color: \${theme.panelBg}; border: 1px solid \${theme.buttonSecondaryBorder}; box-shadow: 0 4px 15px rgba(0,0,0,0.2); color: \${theme.textColor};
                            }
                            .popout-edit-element-card.hidden { opacity: 0; transform: translateX(100%); pointer-events: none; }
                            .popout-edit-element-card h5 { margin-top: 0; margin-bottom: 10px; font-size: 1em; }
                            .popout-edit-element-card label { display: block; font-size: 0.85em; margin-bottom: 3px; font-weight: 500; color: \${theme.buttonSecondaryText}; }
                            .popout-edit-element-card .control-grid { display: grid; gap: 10px 15px; margin-bottom: 10px; }
                            .popout-edit-element-card .control-grid.two-columns { grid-template-columns: 1fr 1fr; }
                            .popout-edit-element-card .control-grid.three-columns { grid-template-columns: 1fr 1fr 1fr; }
                            .popout-edit-element-card .control-grid input[type="text"],
                            .popout-edit-element-card .control-grid input[type="color"],
                            .popout-edit-element-card .control-grid select,
                            .popout-edit-element-card textarea { width: 100%; padding: 8px; border-radius: 4px; font-size: 0.9em; border: 1px solid \${theme.buttonSecondaryBorder}; background-color: \${theme.panelBg === '#1A1A1A' || theme.panelBg === '#242424' ? '#1E1E1E' : '#FFFFFF'}; color: \${theme.textColor}; }
                            .popout-edit-element-card .control-grid input[type="color"] { height: 38px; padding: 4px; }
                            .popout-edit-element-card .ai-edit-label { font-size: 0.85em; margin: 15px 0 5px; font-weight: 500; color: \${theme.buttonSecondaryText}; }
                            .popout-edit-element-card .element-editor-buttons { display: flex; gap: 10px; margin-top: 15px; }
                            .popout-edit-element-card .element-editor-buttons button { flex-grow: 1; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 0.9em; border: 1px solid \${theme.buttonSecondaryBorder}; background-color: \${theme.accentColor}; color: \${theme.buttonPrimaryText}; }
                            .popout-edit-element-card .element-editor-buttons button:hover { opacity: 0.8; }
                            .popout-edit-element-card #popout_saveManualElementChangesButton { background-color: \${theme.accentColor}; }
                            .popout-edit-element-card #popout_applyElementAIEditButton { background-color: \${theme.buttonSecondaryBorder}; color: \${theme.buttonSecondaryText}; }
                            .popout-edit-element-card #popout_applyElementAIEditButton:hover { background-color: \${theme.buttonSecondaryHoverBg}; }
                        \`;
                    }


                    popOutSelectButton.onclick = togglePopOutElementSelectionMode;
                    popOutDragButton.onclick = togglePopOutDragMode;

                    updatePopOutSelectButtonUI();
                    updatePopOutDragButtonUI();
                    
                    const popoutInputIds = [
                        'popout_elementTextContent', 'popout_elementColor', 'popout_elementBgColor', 
                        'popout_elementWidth', 'popout_elementHeight', 'popout_elementPadding', 'popout_elementMargin',
                        'popout_elementPosition', 'popout_elementDisplay', 'popout_elementTextAlign',
                        'popout_elementBorder', 'popout_elementBorderRadius', 'popout_elementCustomCSS', 'popout_editElementPromptInput'
                    ];
                    popoutInputIds.forEach(id => {
                        const input = document.getElementById(id);
                        if (input) {
                            input.addEventListener('input', () => {
                                if (popoutSelectedElementSelector) { 
                                     const propertyKey = id.replace(/^popout_element/, '').charAt(0).toLowerCase() + id.replace(/^popout_element/, '').slice(1).replace('PromptInput', 'AiPrompt');
                                     window.openerApp.notifyInputChangeToMain('popout', propertyKey, input.value);
                                }
                            });
                        }
                    });

                    const popoutSaveManualButton = document.getElementById('popout_saveManualElementChangesButton');
                    if(popoutSaveManualButton) popoutSaveManualButton.onclick = applyPopOutManualChanges;
                    
                    const popoutApplyAIButton = document.getElementById('popout_applyElementAIEditButton');
                    if(popoutApplyAIButton) popoutApplyAIButton.onclick = applyPopOutAIChanges;

                    if (window.openerApp.isMainAppSelecting()) setPopOutSelectionMode(true, false);
                    if (window.openerApp.isMainAppDragging()) setPopOutDragMode(true);

                    setupPopoutDragListeners(document, 'popout', window.isPopOutDraggingElement); 
                }
                window.setupPopOutSpecificUI = setupPopOutSpecificUI; 

                function togglePopOutElementSelectionMode() {
                    window.isPopOutEditorSelectingElementForWindow = !window.isPopOutEditorSelectingElementForWindow;
                    window.isPopOutDraggingElement = false; 
                    updatePopOutSelectButtonUI();
                    updatePopOutDragButtonUI();
                    if (window.isPopOutEditorSelectingElementForWindow) {
                        popOutEditCard.classList.add('hidden'); 
                    } else {
                         popOutEditCard.classList.add('hidden'); 
                         document.querySelectorAll('.preview-element-hover-highlight').forEach(el => el.classList.remove('preview-element-hover-highlight'));
                    }
                }
                window.setPopOutSelectionMode = function(isActive, showCardIfSelected) {
                    window.isPopOutEditorSelectingElementForWindow = isActive;
                    updatePopOutSelectButtonUI();
                    if (!isActive && popOutEditCard) popOutEditCard.classList.add('hidden');
                    else if (isActive && showCardIfSelected && popoutSelectedElementSelector && popOutEditCard) {
                       // Handled by updatePopOutEditorUIFromMain
                    }
                };
                
                function togglePopOutDragMode() {
                    window.isPopOutDraggingElement = !window.isPopOutDraggingElement;
                    window.isPopOutEditorSelectingElementForWindow = false; 
                    updatePopOutDragButtonUI();
                    updatePopOutSelectButtonUI();
                    popOutEditCard.classList.add('hidden');
                    // window.openerApp.toggleMainDragMode(); // Popout manages its own drag state visually, main app provides drop handling
                    setupPopoutDragListeners(document, 'popout', window.isPopOutDraggingElement); 
                }
                window.setPopOutDragMode = function(isActive) {
                    window.isPopOutDraggingElement = isActive;
                    updatePopOutDragButtonUI();
                    setupPopoutDragListeners(document, 'popout', window.isPopOutDraggingElement); 
                };


                function updatePopOutSelectButtonUI() { 
                    if (popOutSelectButton) { 
                        popOutSelectButton.classList.toggle('active-selection', window.isPopOutEditorSelectingElementForWindow); 
                    }
                }
                 function updatePopOutDragButtonUI() { 
                    if (popOutDragButton) { 
                        popOutDragButton.classList.toggle('active-selection', window.isPopOutDraggingElement); 
                    }
                }

                window.processSelectionInPopOutWindow = function(selector, source) {
                    popoutSelectedElementSelector = selector;
                    window.openerApp.processSelectionInMain(selector, 'popout_button_initiated'); // Notify main app
                    // Card visibility controlled by updatePopOutEditorUIFromMain
                    if (window.isPopOutEditorSelectingElementForWindow && source === 'popout_click') { 
                        // Don't toggle off if initiated by main app, only if popout's own button was active
                        togglePopOutElementSelectionMode(); 
                    }
                };

                window.updatePopOutEditorUIFromMain = function(selectedElementInstance) {
                    popoutSelectedElementSelector = selectedElementInstance ? window.openerApp.getElementPathSelector(selectedElementInstance) : null;

                    const identifier = document.getElementById('popout_selectedElementIdentifier');
                    const textContent = document.getElementById('popout_elementTextContent');
                    const color = document.getElementById('popout_elementColor');
                    const bgColor = document.getElementById('popout_elementBgColor');
                    const width = document.getElementById('popout_elementWidth');
                    const height = document.getElementById('popout_elementHeight');
                    const padding = document.getElementById('popout_elementPadding');
                    const margin = document.getElementById('popout_elementMargin');
                    const position = document.getElementById('popout_elementPosition');
                    const display = document.getElementById('popout_elementDisplay');
                    const textAlign = document.getElementById('popout_elementTextAlign');
                    const border = document.getElementById('popout_elementBorder');
                    const borderRadius = document.getElementById('popout_elementBorderRadius');
                    const customCSS = document.getElementById('popout_elementCustomCSS');

                    if (!selectedElementInstance || !popOutEditCard) {
                        if(popOutEditCard) popOutEditCard.classList.add('hidden');
                        if(identifier) identifier.textContent = 'N/A';
                        return;
                    }
                    const tagName = selectedElementInstance.tagName.toLowerCase();
                    const id = selectedElementInstance.id ? '#' + selectedElementInstance.id : '';
                    let classes = '';
                    if(selectedElementInstance.className && typeof selectedElementInstance.className === 'string') {
                        classes = '.' + selectedElementInstance.className.split(' ').filter(c => c && !c.startsWith('preview-element-')).join('.');
                    }
                    if(identifier) identifier.textContent = tagName + id + classes;

                    const computedStyle = window.getComputedStyle(selectedElementInstance);
                    if(textContent) textContent.value = selectedElementInstance.firstChild?.nodeType === 3 ? selectedElementInstance.firstChild.textContent.trim() : (selectedElementInstance.textContent || '').trim();
                    if(color) color.value = window.openerApp.rgbToHex(computedStyle.color) || '#000000';
                    if(bgColor) bgColor.value = window.openerApp.rgbToHex(computedStyle.backgroundColor) || '#ffffff';
                    if(width) width.value = computedStyle.width === 'auto' ? '' : computedStyle.width;
                    if(height) height.value = computedStyle.height === 'auto' ? '' : computedStyle.height;
                    if(padding) padding.value = computedStyle.padding;
                    if(margin) margin.value = computedStyle.margin;
                    if(position) position.value = computedStyle.position === 'static' ? '' : computedStyle.position;
                    if(display) display.value = computedStyle.display === 'block' ? '' : computedStyle.display;
                    if(textAlign) textAlign.value = computedStyle.textAlign === 'start' || computedStyle.textAlign === 'auto' ? '' : computedStyle.textAlign;
                    if(border) border.value = computedStyle.border.includes('none') || computedStyle.borderWidth === "0px" ? '' : computedStyle.border;
                    if(borderRadius) borderRadius.value = computedStyle.borderRadius === '0px' ? '' : computedStyle.borderRadius;
                    if(customCSS) customCSS.value = '';
                    
                    popOutEditCard.classList.remove('hidden');
                };
                
                function applyPopOutManualChanges() {
                    if (!popoutSelectedElementSelector) return;
                    const data = {
                        textContent: document.getElementById('popout_elementTextContent').value,
                        color: document.getElementById('popout_elementColor').value,
                        backgroundColor: document.getElementById('popout_elementBgColor').value,
                        width: document.getElementById('popout_elementWidth').value,
                        height: document.getElementById('popout_elementHeight').value,
                        padding: document.getElementById('popout_elementPadding').value,
                        margin: document.getElementById('popout_elementMargin').value,
                        position: document.getElementById('popout_elementPosition').value,
                        display: document.getElementById('popout_elementDisplay').value,
                        textAlign: document.getElementById('popout_elementTextAlign').value,
                        border: document.getElementById('popout_elementBorder').value,
                        borderRadius: document.getElementById('popout_elementBorderRadius').value,
                        customCSS: document.getElementById('popout_elementCustomCSS').value,
                    };
                    window.openerApp.applyElementChangesFromPopOut(data);
                    // hidePopOutEditCard(); // Main app will re-sync, card might stay open if main select still active
                }

                function applyPopOutAIChanges() {
                    if (!popoutSelectedElementSelector) return;
                    const aiPrompt = document.getElementById('popout_editElementPromptInput').value;
                    if (!aiPrompt) { alert("Please describe the changes for AI."); return; }
                    const elementHTML = window.openerApp.getCurrentSelectedElementOuterHTML();
                    if (!elementHTML) { alert("Could not get current element HTML."); return; }
                    window.openerApp.handleAIEditRequestFromPopOut(elementHTML, aiPrompt, popoutSelectedElementSelector, document.getElementById('popout_applyElementAIEditButton'));
                }
                window.clearPopoutAiPrompt = function() { const input = document.getElementById('popout_editElementPromptInput'); if(input) input.value = ''; };
                window.hidePopOutEditCard = function() { if(popOutEditCard) popOutEditCard.classList.add('hidden'); popoutSelectedElementSelector = null; };
                window.updateTheme = function(theme) {
                    const themeVars = window.openerApp.getThemeVars();
                    document.body.style.backgroundColor = themeVars.panelBg;
                    document.body.style.color = themeVars.textColor;
                    document.getElementById('main-highlight-styles').textContent = window.openerApp.getPreviewStylesForPopOut(); // Re-apply highlight styles
                    // Update popout toolbar styles too
                    const popoutToolbar = document.querySelector('.popout-toolbar');
                    if (popoutToolbar) {
                        popoutToolbar.style.backgroundColor = \`rgba(\${themeVars.panelBgRgb},0.8)\`;
                    }
                    document.querySelectorAll('.popout-header-button').forEach(btn => {
                        btn.style.borderColor = themeVars.buttonSecondaryBorder;
                        btn.style.color = themeVars.buttonSecondaryText;
                        // Active state is handled by class, but hover might need dynamic update if not CSS var based
                    });
                     const popoutUIStyles = document.getElementById('popout-ui-styles');
                     if (popoutUIStyles) { /* Re-apply card styles as done in setupPopOutSpecificUI */ }

                };

                function setupPopoutDragListeners(doc, windowType, enable) {
                    if (!doc || !doc.body) return;
                    const elements = Array.from(doc.body.querySelectorAll('*')); // Potentially refine selector
                    elements.forEach(el => {
                        if (el.closest && (el.closest('.popout-toolbar') || el.closest('.popout-edit-element-card'))) return; // Don't make UI draggable

                        if (enable && popoutSelectedElementSelector && window.openerApp.getElementPathSelector(el) === popoutSelectedElementSelector) {
                            el.draggable = true;
                            el.classList.add('preview-element-draggable');
                            el.addEventListener('dragstart', handlePopoutDragStart);
                            el.addEventListener('dragend', handlePopoutDragEnd);
                        } else {
                            el.draggable = false;
                            el.classList.remove('preview-element-draggable');
                            el.removeEventListener('dragstart', handlePopoutDragStart);
                            el.removeEventListener('dragend', handlePopoutDragEnd);
                        }
                        // Universal dragover/drop listeners on potential drop targets (siblings, parents)
                        if (enable) {
                            el.addEventListener('dragover', handlePopoutDragOver);
                            el.addEventListener('dragleave', handlePopoutDragLeave);
                            el.addEventListener('drop', handlePopoutDrop);
                        } else {
                            el.removeEventListener('dragover', handlePopoutDragOver);
                            el.removeEventListener('dragleave', handlePopoutDragLeave);
                            el.removeEventListener('drop', handlePopoutDrop);
                        }
                    });
                }
                window.setupPopoutDragListeners = setupPopoutDragListeners;

                function handlePopoutDragStart(e) {
                    if (!window.isPopOutDraggingElement) { e.preventDefault(); return; }
                    popoutDraggedElement = e.target;
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', window.openerApp.getElementPathSelector(popoutDraggedElement));
                    setTimeout(() => e.target.style.opacity = '0.5', 0);
                }
                function handlePopoutDragOver(e) {
                    e.preventDefault();
                    if (!popoutDraggedElement || popoutDraggedElement === e.target || e.target.contains(popoutDraggedElement)) return;
                    if (e.target.closest && (e.target.closest('.popout-toolbar') || e.target.closest('.popout-edit-element-card'))) return;

                    if (!popoutDropIndicator) {
                        popoutDropIndicator = document.createElement('div');
                        popoutDropIndicator.className = 'drop-target-indicator';
                        // Styles for dropIndicator should be in getPreviewStyles and applied via main-highlight-styles
                    }
                    const rect = e.target.getBoundingClientRect();
                    const isAfter = e.clientY > rect.top + rect.height / 2;
                    if (isAfter) e.target.parentNode.insertBefore(popoutDropIndicator, e.target.nextSibling);
                    else e.target.parentNode.insertBefore(popoutDropIndicator, e.target);
                }
                function handlePopoutDragLeave(e) {
                    if (popoutDropIndicator && popoutDropIndicator.parentElement) {
                        popoutDropIndicator.parentElement.removeChild(popoutDropIndicator);
                    }
                }
                function handlePopoutDrop(e) {
                    e.preventDefault(); e.stopPropagation();
                    if (!popoutDraggedElement || popoutDraggedElement === e.target || e.target.contains(popoutDraggedElement)) return;
                    if (e.target.closest && (e.target.closest('.popout-toolbar') || e.target.closest('.popout-edit-element-card'))) return;

                    if (popoutDropIndicator && popoutDropIndicator.parentElement) {
                        popoutDropIndicator.parentElement.removeChild(popoutDropIndicator);
                    }
                    const draggedSelector = e.dataTransfer.getData('text/plain');
                    const targetSelector = window.openerApp.getElementPathSelector(e.target);
                    const rect = e.target.getBoundingClientRect();
                    const position = e.clientY > rect.top + rect.height / 2 ? 'after' : 'before';
                    
                    window.openerApp.performDropInMain(draggedSelector, targetSelector, position);
                    // Main app will handle HTML update and refresh both previews
                }
                function handlePopoutDragEnd(e) {
                    if (popoutDraggedElement) popoutDraggedElement.style.opacity = '';
                    if (popoutDropIndicator && popoutDropIndicator.parentElement) {
                         popoutDropIndicator.parentElement.removeChild(popoutDropIndicator);
                    }
                    popoutDraggedElement = null;
                    popoutDropIndicator = null;
                    // Potentially turn off drag mode if desired after one drag
                    // togglePopOutDragMode(); 
                }
            `;
            popOutDoc.head.appendChild(scriptEl);
            popOutDoc.close(); // Important after writing script
            
            const indexHtmlFile = projectFiles.find(f => f.name === 'index.html');
            updatePreviewFrameAndPopout(indexHtmlFile ? indexHtmlFile.content : DEFAULT_BLANK_PROJECT_HTML);
            
            popOutWindow.onbeforeunload = () => {
                currentSelectedElementSelector = null; // Clear selection if popout closes
                if(elementEditorControls) elementEditorControls.classList.add('hidden');
                if(selectedElementIdentifier) selectedElementIdentifier.textContent = 'N/A';
                if(selectElementsToggle) selectElementsToggle.classList.remove('active-selection'); // Main preview header button
                if(selectElementButton) { // AI tools select button
                    selectElementButton.classList.remove('active-selection');
                    selectElementButton.textContent = 'Select Element to Edit';
                }
                isMainAppSelectingElement = false;
                document.body.classList.remove('element-selection-active');
                
                if(dragElementToggle) dragElementToggle.classList.remove('active-selection');
                isMainAppDraggingElement = false;
                document.body.classList.remove('element-dragging-active');

                popOutWindow = null;
            };
        }
    }
    
    // --- Element Drag and Drop ---
    function setupDragListeners(doc, windowType, enable) {
        if (!doc || !doc.body) return;
        const elements = Array.from(doc.body.querySelectorAll('*')); 
        
        elements.forEach(el => {
            // Avoid making UI elements draggable (like popout card if it's in the same doc)
            if (el.closest && (el.closest('.popout-toolbar') || el.closest('.popout-edit-element-card'))) return;

            if (enable && currentSelectedElementSelector && getElementPathSelector(el) === currentSelectedElementSelector) {
                el.draggable = true;
                el.classList.add('preview-element-draggable');
                el.addEventListener('dragstart', handleDragStart);
                el.addEventListener('dragend', handleDragEnd);
            } else {
                el.draggable = false;
                el.classList.remove('preview-element-draggable');
                el.removeEventListener('dragstart', handleDragStart);
                el.removeEventListener('dragend', handleDragEnd);
            }
            // Universal dragover/drop listeners on potential drop targets
            if (enable) {
                el.addEventListener('dragover', handleDragOver);
                el.addEventListener('dragleave', handleDragLeave);
                el.addEventListener('drop', handleDropEvent);
            } else {
                el.removeEventListener('dragover', handleDragOver);
                el.removeEventListener('dragleave', handleDragLeave);
                el.removeEventListener('drop', handleDropEvent);
            }
        });
    }

    function handleDragStart(e) {
        if (!isMainAppDraggingElement && !(popOutWindow && popOutWindow.isPopOutDraggingElement)) {
            e.preventDefault(); return;
        }
        draggedElement = e.target;
        e.dataTransfer.effectAllowed = 'move';
        // Store selector of dragged element
        e.dataTransfer.setData('text/plain', getElementPathSelector(draggedElement)); 
        // Visual feedback
        setTimeout(() => e.target.style.opacity = '0.5', 0); 
    }

    function handleDragOver(e) {
        e.preventDefault(); // Necessary to allow dropping
        if (!draggedElement || draggedElement === e.target || e.target.contains(draggedElement)) return;
         // Avoid dropping onto UI elements if they are part of the document
        if (e.target.closest && (e.target.closest('.popout-toolbar') || e.target.closest('.popout-edit-element-card'))) return;

        if (!dropIndicator) {
            dropIndicator = document.createElement('div');
            dropIndicator.className = 'drop-target-indicator';
            // Styles should be injected via getPreviewStyles()
        }
        // Position indicator relative to target element
        const rect = e.target.getBoundingClientRect();
        const isAfter = e.clientY > rect.top + rect.height / 2;
        if (isAfter) e.target.parentNode.insertBefore(dropIndicator, e.target.nextSibling);
        else e.target.parentNode.insertBefore(dropIndicator, e.target);
    }
    
    function handleDragLeave(e) {
        // Remove indicator if mouse leaves the current target unless it's over the indicator itself
        if (dropIndicator && dropIndicator.parentElement && e.relatedTarget !== dropIndicator && !e.target.contains(e.relatedTarget)) {
            dropIndicator.parentElement.removeChild(dropIndicator);
        }
    }
    
    function handleDropEvent(e) {
        e.preventDefault(); e.stopPropagation(); // Prevent default action and bubbling
        if (!draggedElement || draggedElement === e.target || e.target.contains(draggedElement)) return;
         if (e.target.closest && (e.target.closest('.popout-toolbar') || e.target.closest('.popout-edit-element-card'))) return;

        if (dropIndicator && dropIndicator.parentElement) {
            dropIndicator.parentElement.removeChild(dropIndicator);
        }
        
        const draggedSelector = e.dataTransfer.getData('text/plain');
        const targetSelector = getElementPathSelector(e.target);
        const rect = e.target.getBoundingClientRect();
        const position = e.clientY > rect.top + rect.height / 2 ? 'after' : 'before';

        handleDrop(draggedSelector, targetSelector, position, e.currentTarget.ownerDocument === popOutWindow?.document ? 'popout_drop' : 'iframe_drop');
    }

    function handleDrop(draggedSelector, targetSelector, position, sourceInfo) {
        const indexHtmlFile = projectFiles.find(f => f.name === 'index.html');
        if (!indexHtmlFile) { alert("index.html not found for drag/drop."); return false; }

        const tempDoc = new DOMParser().parseFromString(indexHtmlFile.content, 'text/html');
        const draggedElInTemp = getElementBySelector(tempDoc, draggedSelector);
        const targetElInTemp = getElementBySelector(tempDoc, targetSelector);

        if (!draggedElInTemp || !targetElInTemp || !draggedElInTemp.parentElement || !targetElInTemp.parentElement) {
            console.error("Drag/drop elements not found in temp doc", draggedSelector, targetSelector);
            return false;
        }
        if (draggedElInTemp === targetElInTemp || targetElInTemp.contains(draggedElInTemp)) {
            console.warn("Cannot drop element onto itself or its descendant.");
            return false;
        }

        // Basic reordering: move within the same parent or to a sibling's parent
        const parent = targetElInTemp.parentElement;
        if (position === 'before') {
            parent.insertBefore(draggedElInTemp, targetElInTemp);
        } else { // 'after'
            parent.insertBefore(draggedElInTemp, targetElInTemp.nextSibling);
        }
        
        updateFileInProject('index.html', tempDoc.documentElement.outerHTML);
        
        // Update currentSelectedElementSelector if the dragged element was the selected one
        // The path might change if it moved to a different parent, so re-calculate
        if (currentSelectedElementSelector === draggedSelector) {
            currentSelectedElementSelector = getElementPathSelector(draggedElInTemp); // Path in tempDoc
            try {localStorage.setItem('currentSelectedElementSelector', currentSelectedElementSelector);}catch(e){}
        }
        updatePreviewFrameAndPopout(tempDoc.documentElement.outerHTML, false, true); // Force highlight sync
        
        // Optionally, turn off drag mode after a successful drop
        if (isMainAppDraggingElement) toggleMainAppDragMode(); 
        if (popOutWindow && popOutWindow.isPopOutDraggingElement) popOutWindow.togglePopOutDragMode(); // Assuming popout has this

        return true;
    }

    function handleDragEnd(e) {
        if (draggedElement) draggedElement.style.opacity = ''; // Restore opacity
        if (dropIndicator && dropIndicator.parentElement) {
             dropIndicator.parentElement.removeChild(dropIndicator);
        }
        draggedElement = null;
        dropIndicator = null;
        // Main app's drag mode button remains active until toggled off by user.
    }

    // --- Panel Resizing & Minimization ---
    function makeResizable(panel, resizer, nextPanel, isVertical = false) {
        let x, y, panelWidth, panelHeight, nextPanelWidth, nextPanelHeight;
        resizer.onmousedown = (e) => {
            e.preventDefault();
            x = e.clientX; y = e.clientY;
            panelWidth = panel.offsetWidth; panelHeight = panel.offsetHeight;
            if (nextPanel) { nextPanelWidth = nextPanel.offsetWidth; nextPanelHeight = nextPanel.offsetHeight; }
            document.onmousemove = onMouseMove; document.onmouseup = onMouseUp;
        };
        function onMouseMove(e) {
            const dx = e.clientX - x; const dy = e.clientY - y;
            if (isVertical) {
                const newPanelHeight = panelHeight + dy; const newNextPanelHeight = nextPanel ? nextPanelHeight - dy : 0;
                if (newPanelHeight > 50 && (!nextPanel || newNextPanelHeight > 50)) { 
                    panel.style.flexBasis = newPanelHeight + 'px'; 
                    if (nextPanel) nextPanel.style.flexBasis = newNextPanelHeight + 'px';
                }
            } else {
                const newPanelWidth = panelWidth + dx; const newNextPanelWidth = nextPanel ? nextPanelWidth - dx : 0;
                if (newPanelWidth > 50 && (!nextPanel || newNextPanelWidth > 50)) { 
                    panel.style.flexBasis = newPanelWidth + 'px'; 
                    if (nextPanel) nextPanel.style.flexBasis = newNextPanelWidth + 'px';
                }
            }
        }
        function onMouseUp() { document.onmousemove = document.onmouseup = null; savePanelSizes(); }
    }
    function savePanelSizes() {
        const sizes = { 
            aiTools: aiToolsPanel.style.flexBasis, 
            codeEditor: codeEditorPanel.style.flexBasis, 
            preview: previewPanel.style.flexBasis 
        };
        try { localStorage.setItem('panelSizes', JSON.stringify(sizes)); } catch(e) {}
    }
    function loadPanelSizes() {
        try {
            const sizes = JSON.parse(localStorage.getItem('panelSizes'));
            if (sizes) {
                if (sizes.aiTools && !panelStates.aiTools.minimized) aiToolsPanel.style.flexBasis = sizes.aiTools;
                if (sizes.codeEditor && !panelStates.codeEditor.minimized) codeEditorPanel.style.flexBasis = sizes.codeEditor;
                if (sizes.preview && !panelStates.preview.minimized) previewPanel.style.flexBasis = sizes.preview;
            }
        } catch(e) { /* Use defaults */ }
    }
    
    function togglePanelMinimize(panelKey) {
        const state = panelStates[panelKey];
        if (!state || !state.element || !state.content || !state.toggleButton) return;

        state.minimized = !state.minimized;
        state.content.classList.toggle('panel-content-minimized', state.minimized);
        state.element.classList.toggle('panel-minimized', state.minimized); // For potential panel-level styling
        
        const icon = state.toggleButton.querySelector('.icon-toggle-panel');
        if (icon) icon.classList.toggle('icon-toggle-panel-minimized', state.minimized);
        state.toggleButton.setAttribute('aria-expanded', String(!state.minimized));
        state.toggleButton.title = state.minimized ? `Maximize ${panelKey.replace(/([A-Z])/g, ' $1')}` : `Minimize ${panelKey.replace(/([A-Z])/g, ' $1')}`;

        if (state.minimized) {
            state.element.dataset.originalFlexBasis = state.element.style.flexBasis || getComputedStyle(state.element).flexBasis;
            state.element.style.flexBasis = 'auto'; // Collapse to header size
            state.element.style.minWidth = 'auto'; 
            state.element.style.minHeight = 'auto'; 

            // Create restore button
            if (!state.restoreButton && minimizedPanelRestoreArea) {
                state.restoreButton = document.createElement('button');
                state.restoreButton.classList.add('header-button', 'icon-button');
                state.restoreButton.title = `Restore ${panelKey.replace(/([A-Z])/g, ' $1')} Panel`;
                let panelIconPath = ICONS.file; // Default
                if (panelKey === 'aiTools') panelIconPath = ICONS.aiTools;
                else if (panelKey === 'codeEditor') panelIconPath = ICONS.codeEditor;
                else if (panelKey === 'preview') panelIconPath = ICONS.preview;
                state.restoreButton.appendChild(createIconSVG(panelIconPath));
                state.restoreButton.addEventListener('click', () => togglePanelMinimize(panelKey));
                minimizedPanelRestoreArea.appendChild(state.restoreButton);
            }


        } else {
            state.element.style.flexBasis = state.element.dataset.originalFlexBasis || '';
            // Remove restore button
            if (state.restoreButton && state.restoreButton.parentElement) {
                state.restoreButton.parentElement.removeChild(state.restoreButton);
                state.restoreButton = null;
            }
        }
        adjustVisibleResizers();
        savePanelStates();
        if (!state.minimized) loadPanelSizes(); // Restore original size when maximizing
    }

    function adjustVisibleResizers() {
        if (panelStates.aiTools.minimized && panelStates.codeEditor.minimized) {
            if(resizerAiEditor) resizerAiEditor.classList.add('panel-hidden');
        } else {
            if(resizerAiEditor) resizerAiEditor.classList.remove('panel-hidden');
        }
        
        if (panelStates.codeEditor.minimized && panelStates.preview.minimized) {
            if(resizerEditorPreview) resizerEditorPreview.classList.add('panel-hidden');
        } else {
            if(resizerEditorPreview) resizerEditorPreview.classList.remove('panel-hidden');
        }

        if (panelStates.aiTools.minimized || panelStates.codeEditor.minimized) {
             if(resizerAiEditor && panelStates.aiTools.minimized) resizerAiEditor.classList.add('panel-hidden');
             else if(resizerAiEditor) resizerAiEditor.classList.remove('panel-hidden');
        }
        if (panelStates.codeEditor.minimized || panelStates.preview.minimized) {
            if(resizerEditorPreview && panelStates.codeEditor.minimized) resizerEditorPreview.classList.add('panel-hidden');
            else if(resizerEditorPreview) resizerEditorPreview.classList.remove('panel-hidden');
        }

        // Special case: if middle panel is minimized, hide both its resizers
        if (panelStates.codeEditor.minimized) {
             if(resizerAiEditor) resizerAiEditor.classList.add('panel-hidden');
             if(resizerEditorPreview) resizerEditorPreview.classList.add('panel-hidden');
        } else {
            // If middle is not minimized, then visibility depends on its neighbors
            if(resizerAiEditor && !panelStates.aiTools.minimized) resizerAiEditor.classList.remove('panel-hidden');
            else if(resizerAiEditor) resizerAiEditor.classList.add('panel-hidden');

            if(resizerEditorPreview && !panelStates.preview.minimized) resizerEditorPreview.classList.remove('panel-hidden');
            else if(resizerEditorPreview) resizerEditorPreview.classList.add('panel-hidden');
        }


        // Final pass: if a panel is minimized, its preceding resizer might need to be hidden
        // if its previous neighbor is also minimized or doesn't exist
         if(panelStates.codeEditor.element.style.display === 'none' || panelStates.codeEditor.minimized) {
            if(resizerAiEditor) resizerAiEditor.style.display = 'none';
        } else if (panelStates.aiTools.element.style.display !== 'none' && !panelStates.aiTools.minimized) {
            if(resizerAiEditor) resizerAiEditor.style.display = 'flex'; // or 'block'
        }

        if(panelStates.preview.element.style.display === 'none' || panelStates.preview.minimized) {
            if(resizerEditorPreview) resizerEditorPreview.style.display = 'none';
        } else if (panelStates.codeEditor.element.style.display !== 'none' && !panelStates.codeEditor.minimized) {
            if(resizerEditorPreview) resizerEditorPreview.style.display = 'flex';
        }
    }
    function savePanelStates() {
        const statesToSave = {};
        for (const key in panelStates) {
            statesToSave[key] = { minimized: panelStates[key].minimized };
        }
        try { localStorage.setItem('panelStates', JSON.stringify(statesToSave)); } catch(e) {}
    }
    function loadPanelStates() {
        try {
            const savedStates = JSON.parse(localStorage.getItem('panelStates'));
            if (savedStates) {
                for (const key in savedStates) {
                    if (panelStates[key] && savedStates[key].minimized) {
                        // Call togglePanelMinimize if it's not already in the desired state to avoid infinite loops
                        // This needs careful handling if called during init. Simpler to just apply state and then update UI.
                        panelStates[key].minimized = false; // Ensure it's not minimized before toggling
                        togglePanelMinimize(key);
                    }
                }
            }
        } catch(e) { /* Use defaults */ }
        adjustVisibleResizers();
    }

    // --- Event Listeners Setup ---
    function setupEventListeners() {
        if(loginButton) loginButton.addEventListener('click', () => puter.auth.signIn().then(() => checkAuthStatus()));
        if(logoutButton) logoutButton.addEventListener('click', () => puter.auth.signOut().then(() => checkAuthStatus()));
        if(settingsButton) settingsButton.addEventListener('click', () => { if(settingsModal) settingsModal.classList.remove('hidden'); });
        if(closeSettingsModal) closeSettingsModal.addEventListener('click', () => { if(settingsModal) settingsModal.classList.add('hidden'); });
        if(darkModeToggle) darkModeToggle.addEventListener('change', (e) => applyTheme(e.target.checked ? 'dark' : 'light'));
        if(tooltipsToggle) tooltipsToggle.addEventListener('change', (e) => applyTooltipsSetting(e.target.checked));
        if(geminiApiToggle) geminiApiToggle.addEventListener('change', (e) => { 
            useGeminiAPI = e.target.checked; 
            if (useGeminiAPI && !googleAi) { // If enabling and not initialized
                 if (!initializeGeminiClient()) { // Try to init, if fails, revert toggle
                    useGeminiAPI = false;
                    e.target.checked = false;
                 }
            }
            updateApiUsageUI(); 
        });
        if(saveModelsButton) saveModelsButton.addEventListener('click', () => {
            const selected = Array.from(modelListContainer.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
            if (selected.length === 0) { alert("Please select at least one Puter.com model."); return; }
            saveDropdownModels(selected); populateModelDropdown(); alert("Puter.com model selection saved.");
        });
        tabButtons.forEach(button => button.addEventListener('click', () => {
            tabButtons.forEach(btn => { btn.classList.remove('active'); btn.setAttribute('aria-selected', 'false'); });
            button.classList.add('active'); button.setAttribute('aria-selected', 'true');
            tabContents.forEach(content => content.classList.remove('active'));
            const tabContentId = button.dataset.tab;
            const activeTabContent = getElem(tabContentId);
            if (activeTabContent) activeTabContent.classList.add('active');
        }));
        if(appProjectNameInput) appProjectNameInput.addEventListener('input', (e) => {
            if(welcomeProjectNameInput) welcomeProjectNameInput.value = e.target.value;
            try { localStorage.setItem('appProjectName', e.target.value); } catch(e){}
        });
         if(welcomeProjectNameInput) welcomeProjectNameInput.addEventListener('input', (e) => {
            if(appProjectNameInput) appProjectNameInput.value = e.target.value;
            try { localStorage.setItem('appProjectName', e.target.value); } catch(e){}
        });

        if(generateMicrophoneButton) generateMicrophoneButton.addEventListener('click', () => startDictation(generatePromptInput));
        if(generateCodeButton) generateCodeButton.addEventListener('click', () => handleCodeGeneration(generatePromptInput.value, generateCodeButton, false));
        if(generatePromptInput) generatePromptInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleCodeGeneration(generatePromptInput.value, generateCodeButton, false); } });
        if(editInitialPromptButton) editInitialPromptButton.addEventListener('click', () => {
            if (aiToolsSection1Content) aiToolsSection1Content.classList.remove('hidden');
            if (generatedPromptDisplay) generatedPromptDisplay.classList.add('hidden');
            if (generatePromptInput && displayedGeneratePrompt) generatePromptInput.value = displayedGeneratePrompt.textContent;
            if (generatePromptInput) generatePromptInput.focus();
        });
        if(modifyMicrophoneButton) modifyMicrophoneButton.addEventListener('click', () => startDictation(modifyPromptInput));
        if(modifyCodeButton) modifyCodeButton.addEventListener('click', () => handleCodeGeneration(modifyPromptInput.value, modifyCodeButton, true));
        if(modifyPromptInput) modifyPromptInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleCodeGeneration(modifyPromptInput.value, modifyCodeButton, true); } });

        if(selectElementButton) selectElementButton.addEventListener('click', toggleMainAppElementSelectionMode); // AI Tools select button
        if(selectElementsToggle) selectElementsToggle.addEventListener('click', toggleMainAppElementSelectionMode); // Preview header select button
        if(dragElementToggle) dragElementToggle.addEventListener('click', toggleMainAppDragMode); // Preview header drag button

        if(saveManualElementChangesButton) saveManualElementChangesButton.addEventListener('click', () => {
            const data = {
                textContent: elementTextContentInput.value, color: elementColorInput.value, backgroundColor: elementBgColorInput.value,
                width: elementWidthInput.value, height: elementHeightInput.value, padding: elementPaddingInput.value, margin: elementMarginInput.value,
                position: elementPositionSelect.value, display: elementDisplaySelect.value, textAlign: elementTextAlignSelect.value,
                border: elementBorderInput.value, borderRadius: elementBorderRadiusInput.value, customCSS: elementCustomCSSInput.value
            };
            window.applyElementChanges(data, 'main');
        });
        if(applyElementAIEditButton) applyElementAIEditButton.addEventListener('click', () => {
            if (!currentSelectedElementSelector) { alert("No element selected for AI edit."); return; }
            const prompt = editElementPromptInput.value;
            if (!prompt) { alert("Please describe the AI changes for the element."); return; }
            const mainFrameEl = previewFrame.contentDocument ? getElementBySelector(previewFrame.contentDocument, currentSelectedElementSelector) : null;
            if (!mainFrameEl) { alert("Selected element not found in preview."); return; }
            window.handleAIEditRequest(mainFrameEl.outerHTML, prompt, currentSelectedElementSelector, applyElementAIEditButton, 'main');
        });

        if (codeOutputPre) {
            codeOutputPre.addEventListener('input', (e) => {
                if (activeFileName) {
                    const file = projectFiles.find(f => f.name === activeFileName);
                    if (file && file.type !== 'folder' && file.type !== 'image') {
                         updateFileInProject(activeFileName, e.target.textContent);
                    }
                }
            });
            codeOutputPre.addEventListener('paste', (e) => {
                e.preventDefault();
                const text = (e.clipboardData || window.clipboardData).getData('text/plain');
                document.execCommand('insertText', false, text);
            });
        }
        if(reloadPreviewButton) reloadPreviewButton.addEventListener('click', updatePreview);
        if(popOutButton) popOutButton.addEventListener('click', handlePopOut);
        if(fullscreenButton) fullscreenButton.addEventListener('click', () => { if (previewFrame.requestFullscreen) previewFrame.requestFullscreen(); });
        if(createCheckpointButton) createCheckpointButton.addEventListener('click', () => createCheckpoint("Manual"));
        if(viewRestoreCheckpointsButton) viewRestoreCheckpointsButton.addEventListener('click', showCheckpointsModal);
        if(autoCreateCheckpointToggle) autoCreateCheckpointToggle.addEventListener('change', (e) => { try { localStorage.setItem('autoCreateCheckpoints', JSON.stringify(e.target.checked)); } catch(e){} });
        if(closeRestoreCheckpointsModal) closeRestoreCheckpointsModal.addEventListener('click', () => { if(restoreCheckpointsModal) restoreCheckpointsModal.classList.add('hidden'); });
        if(cancelRestoreCheckpointButton) cancelRestoreCheckpointButton.addEventListener('click', () => { if(restoreCheckpointsModal) restoreCheckpointsModal.classList.add('hidden'); });
        
        if(downloadActiveFileLink) downloadActiveFileLink.addEventListener('click', (e) => {
            e.preventDefault();
            const file = projectFiles.find(f => f.name === activeFileName);
            if (file && file.type !== 'folder') {
                const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = file.name.split('/').pop(); document.body.appendChild(a); a.click();
                document.body.removeChild(a); URL.revokeObjectURL(url);
            } else { alert("No active editable file to download or it's a folder."); }
        });
        if(downloadZipLink) downloadZipLink.addEventListener('click', async (e) => {
            e.preventDefault();
            alert("ZIP download functionality is basic and might be slow or fail for large projects. It's currently handled client-side.");
            if (typeof JSZip === 'undefined') { 
                const zipScript = document.createElement('script');
                zipScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
                zipScript.onload = () => generateAndDownloadZip();
                document.head.appendChild(zipScript);
            } else { generateAndDownloadZip(); }
        });
        
        async function generateAndDownloadZip() {
            const zip = new JSZip();
            projectFiles.forEach(file => {
                if (file.type !== 'folder') {
                    zip.file(file.name, file.content);
                } else {
                    zip.folder(file.name.slice(0, -1)); // JSZip handles folder creation implicitly via path
                }
            });
            try {
                const content = await zip.generateAsync({ type: "blob" });
                const projectName = (appProjectNameInput.value || 'VibeCodeProject').replace(/\s+/g, '_');
                saveAs(content, `${projectName}.zip`);
                if (typeof saveAs === 'undefined') { // saveAs might not be available if FileSaver.js is not loaded
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(content);
                    link.download = `${projectName}.zip`;
                    link.click();
                    URL.revokeObjectURL(link.href);
                 }

            } catch (err) { console.error("Error generating ZIP:", err); alert("Failed to generate ZIP file."); }
        }
        // Make sure FileSaver.js is loaded if you use saveAs() directly.
        // For this example, I'll add a basic saveAs polyfill if not present for the ZIP download.
        if (typeof saveAs === 'undefined' && downloadZipLink) {
            window.saveAs = window.saveAs || ((blob, fileName) => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = fileName;
                document.body.appendChild(link); link.click(); document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            });
        }


        if(toggleAiToolsPanelButton) toggleAiToolsPanelButton.addEventListener('click', () => togglePanelMinimize('aiTools'));
        if(toggleCodeEditorPanelButton) toggleCodeEditorPanelButton.addEventListener('click', () => togglePanelMinimize('codeEditor'));
        if(togglePreviewPanelButton) togglePreviewPanelButton.addEventListener('click', () => togglePanelMinimize('preview'));
        if (resizerAiEditor) makeResizable(aiToolsPanel, resizerAiEditor, codeEditorPanel);
        if (resizerEditorPreview) makeResizable(codeEditorPanel, resizerEditorPreview, previewPanel);

        if(newProjectButton) newProjectButton.addEventListener('click', () => { if(confirmNewProjectModal) confirmNewProjectModal.classList.remove('hidden'); });
        if(closeConfirmNewProjectModal) closeConfirmNewProjectModal.addEventListener('click', () => { if(confirmNewProjectModal) confirmNewProjectModal.classList.add('hidden'); });
        if(confirmNewProjectCancelButton) confirmNewProjectCancelButton.addEventListener('click', () => { if(confirmNewProjectModal) confirmNewProjectModal.classList.add('hidden'); });
        if(confirmNewProjectConfirmButton) confirmNewProjectConfirmButton.addEventListener('click', () => {
            loadTemplate('blank'); // Or a truly blank state
            if(confirmNewProjectModal) confirmNewProjectModal.classList.add('hidden');
        });
        
        if(welcomeLoginButton) welcomeLoginButton.addEventListener('click', () => {
            puter.auth.signIn().then(() => checkAuthStatus());
        });
        if(templateSelectionContainer) templateSelectionContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.template-grid-button');
            if (button && button.dataset.template) {
                const templateName = button.dataset.template;
                if (templateName === 'community') { alert("Community Templates coming soon!"); return; }
                loadTemplate(templateName);
                if(welcomeModal) welcomeModal.classList.add('hidden');
                if(hideWelcomeModalToggle && hideWelcomeModalToggle.checked) {
                    try {localStorage.setItem('hideWelcomeModal', 'true');} catch(e){}
                }
            }
        });
        if(hideWelcomeModalToggle) hideWelcomeModalToggle.addEventListener('change', (e) => {
            if (showWelcomeModalToggle) showWelcomeModalToggle.checked = !e.target.checked;
            try { localStorage.setItem('hideWelcomeModal', e.target.checked ? 'true' : 'false'); } catch(e){}
        });
        if(showWelcomeModalToggle) showWelcomeModalToggle.addEventListener('change', (e) => {
             if (hideWelcomeModalToggle) hideWelcomeModalToggle.checked = !e.target.checked;
             try { localStorage.setItem('hideWelcomeModal', !e.target.checked ? 'true' : 'false'); } catch(e){}
        });

        if(filesButton) filesButton.addEventListener('click', () => {
            if (fileExplorer) fileExplorer.classList.toggle('hidden');
            if (codeEditorPanel) codeEditorPanel.classList.toggle('explorer-visible', !fileExplorer.classList.contains('hidden'));
            if (codeEditorPanel) codeEditorPanel.classList.toggle('explorer-hidden', fileExplorer.classList.contains('hidden'));
        });
        if(createNewFileButton) createNewFileButton.addEventListener('click', () => handleNewFileOrFolder('file'));
        if(createNewFolderButton) createNewFolderButton.addEventListener('click', () => handleNewFileOrFolder('folder'));
        if(saveNewFileFolderButton) saveNewFileFolderButton.addEventListener('click', saveNewFileOrFolder);
        if(cancelNewFileFolderButton) cancelNewFileFolderButton.addEventListener('click', cancelNewFileOrFolder);
        if(newFileFolderNameInput) newFileFolderNameInput.addEventListener('keydown', (e) => { if(e.key === 'Enter') saveNewFileOrFolder(); else if (e.key === 'Escape') cancelNewFileOrFolder(); });
        if(uploadFileTriggerButton) uploadFileTriggerButton.addEventListener('click', () => { if(uploadFileInput) uploadFileInput.click(); });
        if(uploadFileInput) uploadFileInput.addEventListener('change', handleFileUpload);
        if(deleteAllFilesButton) deleteAllFilesButton.addEventListener('click', handleDeleteAllFiles);

        if(aiHistoryButton) aiHistoryButton.addEventListener('click', showAiHistoryModal);
        if(closeAiHistoryModal) closeAiHistoryModal.addEventListener('click', () => { if(aiHistoryModal) aiHistoryModal.classList.add('hidden'); });

        // AI Context Docs Event Listeners
        if(uploadAiDocButton) uploadAiDocButton.addEventListener('click', () => aiDocFileInput.click());
        if(aiDocFileInput) aiDocFileInput.addEventListener('change', handleAiDocUpload);
        if(typeOrEditAiDocButton) typeOrEditAiDocButton.addEventListener('click', () => {
            editingAiDocId = null; // Reset for new doc
            if(typeAiDocFormTitle) typeAiDocFormTitle.textContent = 'Type New Document';
            if(aiDocTitleInput) aiDocTitleInput.value = '';
            if(aiDocContentInput) aiDocContentInput.value = '';
            if(typeAiDocFormContainer) typeAiDocFormContainer.classList.remove('hidden');
            if(aiDocTitleInput) aiDocTitleInput.focus();
        });
        if(cancelTypedAiDocButton) cancelTypedAiDocButton.addEventListener('click', () => {
            if(typeAiDocFormContainer) typeAiDocFormContainer.classList.add('hidden');
            editingAiDocId = null;
        });
        if(saveTypedAiDocButton) saveTypedAiDocButton.addEventListener('click', saveTypedAiDoc);
        if(pasteAiDocContentButton) pasteAiDocContentButton.addEventListener('click', async () => {
            try {
                const text = await navigator.clipboard.readText();
                if (aiDocContentInput) aiDocContentInput.value += text;
            } catch (err) {
                console.error('Failed to read clipboard contents: ', err);
                alert('Failed to paste from clipboard. Browser might not have permission or focus.');
            }
        });

    }

    // --- AI Context Docs ---
    function displayAiDocsStorageAlert(message, isError = true) {
        if (!aiDocsStorageAlert) return;
        aiDocsStorageAlert.textContent = message;
        aiDocsStorageAlert.classList.toggle('error-text', isError);
        aiDocsStorageAlert.classList.toggle('success-text', !isError); // Assuming you have a .success-text style
        aiDocsStorageAlert.classList.remove('hidden');
    }

    async function loadAiContextDocuments() {
        if(aiDocsStorageAlert) aiDocsStorageAlert.classList.add('hidden'); 
        try {
            await puter.fs.mkdir(PUTER_AI_DOCS_BASE_PATH, { createMissingParents: true });
            const items = await puter.fs.readdir(PUTER_AI_DOCS_BASE_PATH);
            aiContextDocuments = [];
            for (const item of items) {
                if (!item.is_dir && (item.name.endsWith('.txt') || item.name.endsWith('.md'))) {
                    try {
                        const blob = await puter.fs.read(item.path);
                        const content = await blob.text();
                        aiContextDocuments.push({ 
                            id: item.uid || item.path, 
                            title: item.name, 
                            content: content, 
                            active: false, 
                            path: item.path 
                        });
                    } catch (readErr) {
                        console.error(`Error reading AI Doc ${item.name}:`, readErr);
                        displayAiDocsStorageAlert(`Error loading content for ${item.name}. It might be corrupted.`, true);
                    }
                }
            }
        } catch (error) {
            console.error("Error loading AI docs from Puter FS:", error);
            let userMessage = `Could not load AI Docs from cloud: ${error.message || 'Unknown error'}. Using local fallback. Any new/edited docs here won't sync until cloud is back.`;
            if (error && error.message && error.message.toLowerCase().includes('authentication failed')) {
                userMessage = "Authentication failed. Please log in to Puter to access cloud AI documents. Using local fallback for now.";
            }
            displayAiDocsStorageAlert(userMessage, true);
            
            const localDocs = localStorage.getItem('aiContextDocuments_local');
            if (localDocs) {
                aiContextDocuments = JSON.parse(localDocs);
            } else {
                aiContextDocuments = [];
            }
        }
        
        const localActiveStates = localStorage.getItem('aiContextDocuments_activeStates');
        if (localActiveStates) {
            const activeIds = JSON.parse(localActiveStates);
            aiContextDocuments.forEach(doc => {
                if (activeIds.includes(doc.id)) doc.active = true;
            });
        }
        renderAiDocsList();
    }
    
    function renderAiDocItem(doc) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('ai-doc-list-item');
        itemDiv.dataset.docId = doc.id;

        const nameSpan = document.createElement('span');
        nameSpan.classList.add('doc-name');
        nameSpan.textContent = doc.title;
        nameSpan.title = doc.title + (doc.path ? ` (Cloud: ${doc.path})` : ' (Local only)');

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('doc-actions');

        const activeLabel = document.createElement('label');
        activeLabel.classList.add('switch');
        const activeCheckbox = document.createElement('input');
        activeCheckbox.type = 'checkbox';
        activeCheckbox.checked = doc.active;
        activeCheckbox.title = doc.active ? "Deactivate this document" : "Activate this document";
        activeCheckbox.addEventListener('change', () => toggleAiDocActive(doc.id, activeCheckbox.checked));
        activeLabel.appendChild(activeCheckbox);
        activeLabel.appendChild(document.createElement('span')).classList.add('slider', 'round');
        
        const editButton = document.createElement('button');
        editButton.title = "Edit Document";
        editButton.appendChild(createIconSVG(ICONS.edit));
        editButton.addEventListener('click', () => editAiDoc(doc.id));

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-ai-doc-btn');
        deleteButton.title = "Delete Document";
        deleteButton.appendChild(createIconSVG(ICONS.delete));
        deleteButton.addEventListener('click', () => handleDeleteAiDoc(doc.id));

        actionsDiv.appendChild(activeLabel);
        actionsDiv.appendChild(editButton);
        actionsDiv.appendChild(deleteButton);
        itemDiv.appendChild(nameSpan);
        itemDiv.appendChild(actionsDiv);
        return itemDiv;
    }
    
    function renderAiDocsList() {
        if (!aiDocsListContainer || !noAiDocsMessage) return;
        aiDocsListContainer.innerHTML = '';
        if (aiContextDocuments.length === 0) {
            noAiDocsMessage.classList.remove('hidden');
        } else {
            noAiDocsMessage.classList.add('hidden');
            aiContextDocuments.sort((a,b) => a.title.localeCompare(b.title)).forEach(doc => {
                aiDocsListContainer.appendChild(renderAiDocItem(doc));
            });
        }
    }
    async function handleAiDocUpload(event) {
        if(aiDocsStorageAlert) aiDocsStorageAlert.classList.add('hidden');
        const files = event.target.files;
        if (!files) return;
        let cloudSaveFailed = false;

        for (const file of files) {
            if (file.name.endsWith('.txt') || file.name.endsWith('.md')) {
                const content = await file.text();
                const newDoc = {
                    id: Date.now().toString() + Math.random().toString(16).slice(2), // More unique local ID
                    title: file.name,
                    content: content,
                    active: false,
                    path: null // Will be set if cloud save succeeds
                };

                try {
                    const puterFilePath = PUTER_AI_DOCS_BASE_PATH + file.name;
                    await puter.fs.write(puterFilePath, content, { overwrite: true, createMissingParents: true });
                    newDoc.path = puterFilePath; 
                    const stat = await puter.fs.stat(puterFilePath); // Get UID after write
                    newDoc.id = stat.uid || newDoc.id; // Prefer Puter UID if available
                    console.log(`AI Doc "${file.name}" saved to Puter cloud.`);
                } catch (error) {
                    console.error(`Failed to save AI Doc "${file.name}" to Puter cloud:`, error);
                    cloudSaveFailed = true;
                }
                // Always add to local list, path indicates sync status
                const existingDocIndex = aiContextDocuments.findIndex(d => d.title === newDoc.title);
                if (existingDocIndex > -1) aiContextDocuments.splice(existingDocIndex, 1, newDoc);
                else aiContextDocuments.push(newDoc);
            }
        }
        saveAiContextDocuments(); // Saves local list (with paths) and active states
        renderAiDocsList();
        if (cloudSaveFailed) {
            displayAiDocsStorageAlert('Some documents were saved locally as cloud was unavailable. They will not sync automatically.', true);
        } else if (files.length > 0) {
            displayAiDocsStorageAlert('Document(s) uploaded and saved successfully.', false);
        }
        if(aiDocFileInput) aiDocFileInput.value = ''; // Reset input
    }

    async function saveTypedAiDoc() {
        if(aiDocsStorageAlert) aiDocsStorageAlert.classList.add('hidden');
        if (!aiDocTitleInput || !aiDocContentInput) return;
        const title = aiDocTitleInput.value.trim();
        const content = aiDocContentInput.value;
        if (!title) { alert("Document title cannot be empty."); return; }

        let docToSave;
        let existingDoc = editingAiDocId ? aiContextDocuments.find(d => d.id === editingAiDocId) : aiContextDocuments.find(d => d.title === title);
        
        if (existingDoc) { // Editing existing
            docToSave = existingDoc;
            docToSave.title = title; // Allow title change
            docToSave.content = content;
        } else { // New document
            docToSave = {
                id: Date.now().toString() + Math.random().toString(16).slice(2),
                title: title,
                content: content,
                active: false,
                path: null 
            };
        }

        let cloudOpFailed = false;
        const targetPuterPath = PUTER_AI_DOCS_BASE_PATH + title;

        try {
            await puter.fs.write(targetPuterPath, content, { overwrite: true, createMissingParents: true });
            docToSave.path = targetPuterPath;
            const stat = await puter.fs.stat(targetPuterPath);
            docToSave.id = stat.uid || docToSave.id; // Update ID with Puter UID
             console.log(`AI Doc "${title}" ${existingDoc ? 'updated in' : 'saved to'} Puter cloud.`);
        } catch (error) {
            console.error(`Failed to save AI Doc "${title}" to Puter cloud:`, error);
            cloudOpFailed = true;
            if (existingDoc && existingDoc.path) { // Was previously synced, now failed
                // Keep existingDoc.path, but indicate failure. Content is updated locally.
            } else { // New doc or never synced doc, cloud save failed
                docToSave.path = null; 
            }
        }

        if (!existingDoc) {
            aiContextDocuments.push(docToSave);
        } // If existingDoc, it's already in the array and modified in place

        saveAiContextDocuments();
        renderAiDocsList();
        if(typeAiDocFormContainer) typeAiDocFormContainer.classList.add('hidden');
        aiDocTitleInput.value = ''; aiDocContentInput.value = ''; editingAiDocId = null;

        if (cloudOpFailed) {
            displayAiDocsStorageAlert(`Document "${title}" saved locally. Cloud sync failed.`, true);
        } else {
            displayAiDocsStorageAlert(`Document "${title}" saved successfully.`, false);
        }
    }

    function editAiDoc(docId) {
        const doc = aiContextDocuments.find(d => d.id === docId);
        if (doc) {
            editingAiDocId = doc.id;
            if(typeAiDocFormTitle) typeAiDocFormTitle.textContent = 'Edit Document';
            if(aiDocTitleInput) aiDocTitleInput.value = doc.title;
            if(aiDocContentInput) aiDocContentInput.value = doc.content;
            if(typeAiDocFormContainer) typeAiDocFormContainer.classList.remove('hidden');
            if(aiDocTitleInput) aiDocTitleInput.focus();
        }
    }
    async function handleDeleteAiDoc(docId) {
        if(aiDocsStorageAlert) aiDocsStorageAlert.classList.add('hidden');
        const docIndex = aiContextDocuments.findIndex(d => d.id === docId);
        if (docIndex > -1) {
            const docToDelete = aiContextDocuments[docIndex];
            if (!confirm(`Are you sure you want to delete document "${docToDelete.title}"?`)) return;

            let cloudDeleteFailed = false;
            if (docToDelete.path) { // If it has a cloud path, attempt to delete from Puter
                try {
                    await puter.fs.delete(docToDelete.path);
                    console.log(`AI Doc "${docToDelete.title}" deleted from Puter cloud.`);
                } catch (error) {
                    console.error(`Failed to delete AI Doc "${docToDelete.title}" from Puter cloud:`, error);
                    cloudDeleteFailed = true;
                }
            }

            if (!cloudDeleteFailed) { // If cloud delete succeeded OR it was a local-only doc
                aiContextDocuments.splice(docIndex, 1);
                saveAiContextDocuments();
                renderAiDocsList();
                displayAiDocsStorageAlert(`Document "${docToDelete.title}" deleted.`, false);
            } else {
                 // If cloud delete failed, DO NOT remove from local list. Alert user.
                displayAiDocsStorageAlert(`Failed to delete "${docToDelete.title}" from cloud. It remains locally. Try again later.`, true);
            }
        }
    }
    function toggleAiDocActive(docId, isActive) {
        const doc = aiContextDocuments.find(d => d.id === docId);
        if (doc) {
            doc.active = isActive;
            saveAiContextDocuments(); // Save all docs (local list includes active states for persistence)
            // No need to re-render, checkbox handles visual state.
            const itemInList = aiDocsListContainer.querySelector(`.ai-doc-list-item[data-doc-id="${docId}"] input[type="checkbox"]`);
            if(itemInList) itemInList.title = isActive ? "Deactivate this document" : "Activate this document";
        }
    }
    function saveAiContextDocuments() { // Saves the entire list (including content and active states)
        try {
            localStorage.setItem('aiContextDocuments_local', JSON.stringify(aiContextDocuments));
            // Separate save for active states for quicker loading of just that preference
            const activeDocIds = aiContextDocuments.filter(d => d.active).map(d => d.id);
            localStorage.setItem('aiContextDocuments_activeStates', JSON.stringify(activeDocIds));
        } catch (e) {
            console.warn("Failed to save AI context documents to local storage", e);
        }
    }
    function getActiveAiContext() {
        return aiContextDocuments.filter(doc => doc.active).map(doc => ({ title: doc.title, content: doc.content }));
    }
    
    // --- AI Prompt History ---
    function addAiPromptToHistory(entry) {
        aiPromptHistory.unshift(entry);
        if (aiPromptHistory.length > 50) aiPromptHistory.pop();
        try { localStorage.setItem('aiPromptHistory', JSON.stringify(aiPromptHistory)); } catch(e) {}
    }
    function loadAiPromptHistory() {
        try {
            const storedHistory = localStorage.getItem('aiPromptHistory');
            if (storedHistory) aiPromptHistory = JSON.parse(storedHistory);
        } catch(e) { aiPromptHistory = []; }
    }
    function showAiHistoryModal() {
        if (!aiHistoryList || !noAiHistoryMessage || !aiHistoryModal) return;
        aiHistoryList.innerHTML = '';
        if (aiPromptHistory.length === 0) {
            noAiHistoryMessage.classList.remove('hidden');
        } else {
            noAiHistoryMessage.classList.add('hidden');
            aiPromptHistory.forEach(entry => {
                const item = document.createElement('li');
                item.classList.add('ai-history-item');
                item.innerHTML = `
                    <p><strong>Type:</strong> ${escapeHTML(entry.type)} | <strong>File:</strong> ${escapeHTML(entry.file)}</p>
                    <p><strong>API:</strong> ${escapeHTML(entry.api)} | <strong>Model:</strong> ${escapeHTML(entry.model)}</p>
                    <p><strong>Prompt:</strong></p>
                    <pre class="history-prompt-text">${escapeHTML(entry.prompt)}</pre>
                    <p class="history-meta">Date: ${new Date(entry.timestamp).toLocaleString()}</p>
                    <div class="history-actions">
                        <button class="modal-action-button reuse-prompt-button">Reuse Prompt</button>
                    </div>`;
                item.querySelector('.reuse-prompt-button').addEventListener('click', () => {
                    if (entry.type === 'Modify Code' && modifyPromptInput) {
                        modifyPromptInput.value = entry.prompt;
                        modifyPromptInput.focus();
                    } else if (entry.type === 'Generate Code' && generatePromptInput) {
                        generatePromptInput.value = entry.prompt;
                        generatePromptInput.focus();
                    }
                    if (aiHistoryModal) aiHistoryModal.classList.add('hidden');
                });
                aiHistoryList.appendChild(item);
            });
        }
        if (aiHistoryModal) aiHistoryModal.classList.remove('hidden');
    }

    // --- Project Templates ---
    async function loadTemplate(templateName) {
        projectFiles = []; activeFileName = null; 
        currentProjectTemplate = templateName;
        try { localStorage.setItem('currentProjectTemplate', templateName); } catch(e){}

        if (templateName === 'blank') {
            addFileToProject('index.html', DEFAULT_BLANK_PROJECT_HTML, 'html');
        } else if (templateName === 'html_css_js') {
            addFileToProject('index.html', `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic Web Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a basic HTML, CSS, and JavaScript project.</p>
    <script src="script.js"></script>
</body>
</html>`, 'html');
            addFileToProject('style.css', `body { font-family: sans-serif; margin: 20px; background-color: #f0f0f0; } h1 { color: navy; }`, 'css', false);
            addFileToProject('script.js', `console.log("JavaScript is connected!"); \n// Add your interactivity here.`, 'javascript', false);
        } else if (templateName === 'puter_app') {
             addFileToProject('index.html', `<!DOCTYPE html>
<html>
<head>
    <title>My Puter App</title>
    <script src="https://js.puter.com/v2/"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>My Puter App</h1>
    <p id="userInfoP">User: Not signed in</p>
    <button id="createFileBtn">Create Test File in AppData</button>
    <p id="fileStatusP"></p>
    <script src="app.js"></script>
</body>
</html>`, 'html');
            addFileToProject('style.css', `body { font-family: Arial, sans-serif; padding: 20px; } button { margin-top: 10px; padding: 8px 12px; cursor: pointer; }`, 'css', false);
            addFileToProject('app.js', `
// Example Puter.js app script
console.log('Puter App script loaded. App ID:', puter.appID);

const userInfoP = document.getElementById('userInfoP');
const createFileBtn = document.getElementById('createFileBtn');
const fileStatusP = document.getElementById('fileStatusP');

async function checkUser() {
    if (await puter.auth.isSignedIn()) {
        const user = await puter.auth.getUser();
        userInfoP.textContent = 'User: ' + user.username;
    } else {
        userInfoP.textContent = 'User: Not signed in. Please sign in via Puter Desktop.';
        // You might want to prompt for sign-in if essential for your app:
        // await puter.auth.signIn(); // This would open a popup
        // await checkUser(); // Re-check after sign-in attempt
    }
}

createFileBtn.addEventListener('click', async () => {
    try {
        const fileName = '~/AppData/' + puter.appID + '/testFile.txt';
        await puter.fs.write(fileName, 'Hello from my Puter app at ' + new Date().toLocaleTimeString());
        fileStatusP.textContent = 'Successfully wrote to ' + fileName;
        console.log('File written:', fileName);

        // Example: Read it back
        const content = await (await puter.fs.read(fileName)).text();
        console.log('File content:', content);

    } catch (error) {
        fileStatusP.textContent = 'Error creating file: ' + error.message;
        console.error('Error creating file:', error);
        // If it's an auth error, Puter.js usually handles the prompt.
        // If not, you might need to guide the user or call puter.auth.signIn().
        if (error.message.toLowerCase().includes('auth')) {
             // await puter.auth.signIn(); // Example: prompt for sign in
        }
    }
});
checkUser();
`, 'javascript', false);
        }
        
        // Default UI state for new projects
        if(generatePromptInput) generatePromptInput.value = '';
        if(displayedGeneratePrompt) displayedGeneratePrompt.textContent = '';
        if(aiToolsSection1Content) aiToolsSection1Content.classList.remove('hidden');
        if(generatedPromptDisplay) generatedPromptDisplay.classList.add('hidden');
        if(aiToolsSection2) aiToolsSection2.classList.add('hidden');
        if(aiToolsSection3) aiToolsSection3.classList.add('hidden');
        if(elementEditorControls) elementEditorControls.classList.add('hidden');
        if(currentSelectedElementSelector) currentSelectedElementSelector = null;

        renderFileTree();
        updatePreview(); 
        saveProjectFilesToLocalStorage(); 
        try { localStorage.setItem('activeFileName', activeFileName); } catch(e){}
        try { localStorage.setItem('initialGenerationDone', 'false'); } catch(e){}
    }

    // --- Initialization ---
    async function init() {
        // Load settings first
        let theme; try { theme = localStorage.getItem('theme') || 'dark'; } catch(e) { theme = 'dark'; }
        applyTheme(theme);
        let tooltipsEnabled; try { tooltipsEnabled = JSON.parse(localStorage.getItem('tooltipsEnabled')); } catch(e) { tooltipsEnabled = true; }
        if (tooltipsToggle) tooltipsToggle.checked = tooltipsEnabled; applyTooltipsSetting(tooltipsEnabled);
        let useGeminiPref; try { useGeminiPref = JSON.parse(localStorage.getItem('useGeminiAPI')); } catch(e) { useGeminiPref = false; }
        if (geminiApiToggle) geminiApiToggle.checked = useGeminiPref; 
        useGeminiAPI = useGeminiPref; 
        if (useGeminiAPI) initializeGeminiClient();
        updateApiUsageUI();
        
        let autoCheckpoint; try { autoCheckpoint = JSON.parse(localStorage.getItem('autoCreateCheckpoints')); } catch(e) { autoCheckpoint = true; }
        if(autoCreateCheckpointToggle) autoCreateCheckpointToggle.checked = autoCheckpoint;
        
        let projectName; try {projectName = localStorage.getItem('appProjectName') || 'Vibe Code Project'; } catch(e){projectName = 'Vibe Code Project';}
        if(appProjectNameInput) appProjectNameInput.value = projectName;
        if(welcomeProjectNameInput) welcomeProjectNameInput.value = projectName;

        let hideWelcome; try { hideWelcome = localStorage.getItem('hideWelcomeModal') === 'true'; } catch(e){ hideWelcome = false; }
        if (hideWelcomeModalToggle) hideWelcomeModalToggle.checked = hideWelcome;
        if (showWelcomeModalToggle) showWelcomeModalToggle.checked = !hideWelcome;

        populateModelList(); populateModelDropdown();
        setupSpeechRecognition();
        
        loadProjectFilesFromLocalStorage();
        if (projectFiles.length === 0) {
            if (!hideWelcome && welcomeModal) {
                welcomeModal.classList.remove('hidden');
            } else {
                loadTemplate('blank');
            }
        } else {
            setActiveFile(activeFileName); 
        }
        
        loadCheckpoints();
        loadAiPromptHistory();
        await loadAiContextDocuments(); 
        
        // Puter System Prompt (Load once)
        try {
            // const response = await fetch('./puter/puterPrompt.md'); // Assuming it's in a folder
            // if (response.ok) puterSystemPromptContent = await response.text();
            // else console.warn("Failed to load Puter system prompt file.");
            puterSystemPromptContent = PUTER_SYSTEM_PROMPT_RAW; // Use embedded for now
        } catch (e) { console.error("Error fetching Puter system prompt:", e); }

        setupEventListeners();
        loadPanelSizes();
        loadPanelStates();
        await checkAuthStatus(); // Check Puter auth status
        
        const initialGenDone = localStorage.getItem('initialGenerationDone') === 'true';
        const lastPrompt = localStorage.getItem('lastSuccessfulInitialPrompt');
        if (initialGenDone && lastPrompt && aiToolsSection1Content && generatedPromptDisplay && aiToolsSection2 && aiToolsSection3) {
            aiToolsSection1Content.classList.add('hidden');
            if (displayedGeneratePrompt) displayedGeneratePrompt.textContent = lastPrompt;
            generatedPromptDisplay.classList.remove('hidden');
            aiToolsSection2.classList.remove('hidden');
            aiToolsSection3.classList.remove('hidden');
        }
         try { currentProjectTemplate = localStorage.getItem('currentProjectTemplate') || 'blank'; } catch(e){}

        // Handle potential direct load of selected element from previous session
        try {
            const savedSelector = localStorage.getItem('currentSelectedElementSelector');
            if (savedSelector) {
                 currentSelectedElementSelector = savedSelector;
                 // Update UI after preview is loaded. updatePreview will handle this via its onload.
                 const indexHtmlFileOnLoad = projectFiles.find(f=>f.name==='index.html');
                 updatePreviewFrameAndPopout(indexHtmlFileOnLoad ? indexHtmlFileOnLoad.content : DEFAULT_BLANK_PROJECT_HTML, false, true);
            }
        } catch(e) { console.warn("Error loading saved element selector", e); }

        console.log("JR Vibe Code Initialized. Version:", APP_VERSION);
    }

    init();
});

// Helper to get an element from a document (main or iframe/popout)
function getElementFromDoc(doc, selector) {
    if (!doc || !selector) return null;
    try {
        return doc.querySelector(selector);
    } catch (e) {
        console.warn("Failed to get element by selector in specific doc:", selector, e);
        return null;
    }
}
