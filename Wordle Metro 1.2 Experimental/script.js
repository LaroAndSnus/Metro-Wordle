// --- ПЕРЕМЕННЫЕ ---
let targetWord = "";
let currentAttempt = 0;
let currentTile = 0;
let gameOver = false;
const maxAttempts = 6;
let currentGameType = "METRO WORDLE"; 
let isEditMode = false;
let draggedItem = null;

// --- БАЗА СЛОВ ---
// Вставь сюда свой большой список слов
const wordsDB = [
  "МЕТРО", "ПОЕЗД", "БИЛЕТ", "ВАГОН", "ГОРОД", "СЛОВО", "ЭКРАН", "ВЕТЕР", "КНИГА", "ПЛИТА",
  "ДОМ", "УЛИЦА", "СТРАНА", "МИР", "ЧЕЛОВЕК", "ЛЮДИ", "РЕБЁНОК", "ДРУГ", "СЕМЬЯ", "РАБОТА"
];

let defaultModeSelectionHTML = "";

// --- ЗАГРУЗКА ---
window.addEventListener('DOMContentLoaded', () => {
    const modeSel = document.getElementById('mode-selection');
    if (modeSel) defaultModeSelectionHTML = modeSel.innerHTML;

    updateClock();
    initDragAndDrop();
    
    // Проверка ссылки
    const hash = window.location.hash.substring(1);
    if (hash) {
        try {
            const decoded = decodeURIComponent(escape(atob(hash))).toUpperCase().replace(/\s/g, '');
            if (decoded && decoded.length >= 3) {
                targetWord = decoded;
                currentGameType = "Metro Wordle от друга"; 
                openApp('view-game', currentGameType);
                startGameUI();
            }
        } catch (e) { console.error(e); }
    }
});

// --- ЧАСЫ ---
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    const clockEl = document.getElementById('live-clock');
    if(clockEl) {
        clockEl.querySelector('.time-text').innerText = timeStr;
        clockEl.querySelector('.date-text').innerText = dateStr;
    }
}
setInterval(updateClock, 1000);

// --- РЕЖИМ РЕДАКТИРОВАНИЯ ---
function toggleEditMode() {
    isEditMode = !isEditMode;
    const btn = document.getElementById('edit-btn');
    const grid = document.getElementById('tile-grid');
    const tiles = document.querySelectorAll('.tile');

    if (isEditMode) {
        btn.classList.add('active');
        grid.classList.add('editing-active');
        tiles.forEach(tile => tile.setAttribute('draggable', 'true'));
    } else {
        btn.classList.remove('active');
        grid.classList.remove('editing-active');
        tiles.forEach(tile => tile.setAttribute('draggable', 'false'));
    }
}

// ГЛАВНАЯ ФУНКЦИЯ КЛИКА
function handleTileClick(tileElement, actionFunction) {
    if (isEditMode) {
        cycleTileSize(tileElement);
    } else {
        // Если передана функция (например, открыть игру), выполняем её.
        // Если нет (для декоративных плиток), ничего не делаем.
        if (typeof actionFunction === 'function') {
            actionFunction();
        }
    }
}

function cycleTileSize(tile) {
    if (tile.classList.contains('size-small')) {
        tile.classList.remove('size-small'); tile.classList.add('size-wide');
    } else if (tile.classList.contains('size-wide')) {
        tile.classList.remove('size-wide'); tile.classList.add('size-large');
    } else if (tile.classList.contains('size-large')) {
        tile.classList.remove('size-large'); tile.classList.add('size-small');
    } else {
        tile.classList.add('size-small');
    }
}

// --- СИСТЕМА ПРИЛОЖЕНИЙ ---

function hideAllViews() {
    document.querySelectorAll('.app-view').forEach(view => view.style.display = 'none');
}

function openApp(viewId, title) {
    document.getElementById('game-app').style.display = 'flex';
    hideAllViews();
    
    const view = document.getElementById(viewId);
    if (view) {
        view.style.display = 'flex';
        document.getElementById('app-title-text').innerText = title;
    }
    
    if (viewId === 'view-game') {
        if (targetWord && !gameOver) {
            document.getElementById('mode-selection').style.display = 'none';
            document.getElementById('game-interface').style.display = 'flex';
            document.getElementById('app-title-text').innerText = currentGameType;
        } else {
            document.getElementById('mode-selection').style.display = 'flex';
            document.getElementById('game-interface').style.display = 'none';
        }
    }
}

function resumeGame() {
    if (targetWord && !gameOver) {
        openApp('view-game', currentGameType);
    } else {
        alert("Нет активной игры. Начните новую!");
    }
}

function handleBackButton() {
    const isCreateMode = document.getElementById('custom-word-input') !== null;
    if (isCreateMode) { restoreMenu(); return; }

    const gameInterface = document.getElementById('game-interface');
    const viewGame = document.getElementById('view-game');
    
    if (viewGame.style.display === 'flex' && gameInterface.style.display === 'flex') {
        gameInterface.style.display = 'none';
        document.getElementById('mode-selection').style.display = 'flex';
        document.getElementById('app-title-text').innerText = "METRO WORDLE";
        return;
    }
    closeApp();
}

function closeApp() {
    document.getElementById('game-app').style.display = 'none';
    hideAllViews();
    if (window.location.hash) {
        history.pushState("", document.title, window.location.pathname + window.location.search);
    }
}

// --- DRAG & DROP ---
function initDragAndDrop() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => addDragEvents(tile));
}

function addDragEvents(tile) {
    tile.addEventListener('dragstart', function(e) {
        if (!isEditMode) { e.preventDefault(); return; }
        draggedItem = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    });
    tile.addEventListener('dragend', function() {
        this.classList.remove('dragging');
        document.querySelectorAll('.tile').forEach(t => t.classList.remove('drag-over'));
        draggedItem = null;
    });
    tile.addEventListener('dragover', function(e) {
        if (!isEditMode) return;
        e.preventDefault();
        if (this === draggedItem) return;
        this.classList.add('drag-over');
    });
    tile.addEventListener('dragleave', function() { this.classList.remove('drag-over'); });
    tile.addEventListener('drop', function(e) {
        if (!isEditMode) return;
        e.preventDefault();
        this.classList.remove('drag-over');
        if (this === draggedItem) return;
        const parent = this.parentNode;
        const draggedIndex = Array.from(parent.children).indexOf(draggedItem);
        const droppedIndex = Array.from(parent.children).indexOf(this);
        if (draggedIndex < droppedIndex) parent.insertBefore(draggedItem, this.nextSibling);
        else parent.insertBefore(draggedItem, this);
    });
}

// --- ЛОГИКА ИГРЫ (WORDLE) ---
function resetGame() {
    currentAttempt = 0; currentTile = 0; gameOver = false;
    document.getElementById('game-container').innerHTML = '';
    document.getElementById('message-area').innerText = '';
    document.querySelectorAll('.key').forEach(key => {
        key.className = key.className.replace(' correct', '').replace(' present', '').replace(' absent', '');
        key.style.background = ""; key.style.opacity = "";
    });
}

function startRandomMode() {
    resetGame();
    targetWord = wordsDB[Math.floor(Math.random() * wordsDB.length)];
    currentGameType = "Случайное Metro Wordle"; 
    startGameUI();
}

function startCreateMode() {
    const container = document.getElementById('mode-selection');
    container.innerHTML = `
        <div class="create-interface">
            <h2 style="margin-bottom: 40px; font-weight: 300; font-size: 2rem;">Введите слово для друга</h2>
            <input type="text" id="custom-word-input" class="metro-input" placeholder="СЛОВО" maxlength="12">
            <div id="create-actions"><button class="metro-btn-action" onclick="generateLink()">СОЗДАТЬ ССЫЛКУ</button></div>
            <div id="link-result-area" style="display: none; width: 100%; display: flex; flex-direction: column; align-items: center;">
                <input type="text" id="share-link" class="link-box" readonly>
                <button class="metro-btn-action" onclick="copyLink()" style="margin-top: 20px; background: var(--metro-green);">СКОПИРОВАТЬ</button>
            </div>
        </div>
    `;
}

function restoreMenu() {
    if(defaultModeSelectionHTML) document.getElementById('mode-selection').innerHTML = defaultModeSelectionHTML;
}

function generateLink() {
    const input = document.getElementById('custom-word-input');
    const word = input.value.trim().toUpperCase().replace(/[^А-ЯЁ]/g, '');
    if (word.length < 3) { alert("Минимум 3 буквы!"); return; }
    const encoded = btoa(unescape(encodeURIComponent(word)));
    const url = window.location.origin + window.location.pathname + "#" + encoded;
    document.getElementById('create-actions').style.display = 'none';
    document.getElementById('custom-word-input').style.display = 'none';
    const resultArea = document.getElementById('link-result-area');
    resultArea.style.display = 'flex';
    document.getElementById('share-link').value = url;
}

function copyLink() {
    const linkInput = document.getElementById('share-link');
    linkInput.select();
    navigator.clipboard.writeText(linkInput.value).then(() => { alert("Ссылка скопирована!"); });
}

function startGameUI() {
    document.getElementById('app-title-text').innerText = currentGameType;
    document.getElementById('mode-selection').style.display = 'none';
    document.getElementById('game-interface').style.display = 'flex';
    initBoard();
    initKeyboard();
}

function initBoard() {
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    const wordLength = targetWord.length;
    let tileSize = 55;
    if (wordLength > 6) tileSize = 45; if (wordLength > 9) tileSize = 35; if (wordLength > 12) tileSize = 28;
    for (let i = 0; i < maxAttempts; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < wordLength; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile-game-cell';
            tile.id = `tile-${i}-${j}`;
            tile.style.width = tileSize + 'px'; tile.style.height = tileSize + 'px'; tile.style.fontSize = (tileSize * 0.6) + 'px';
            row.appendChild(tile);
        }
        container.appendChild(row);
    }
}

function initKeyboard() {
    const kb = document.getElementById('mini-keyboard');
    kb.innerHTML = '';
    const rows = ["ЙЦУКЕНГШЩЗХЪ", "ФЫВАПРОЛДЖЭ", "ЯЧСМИТЬБЮ"];
    rows.forEach((rowStr, index) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'kb-row';
        if (index === 2) rowDiv.appendChild(createKey("ENTER", "key-wide key-enter", submitGuess));
        rowStr.split("").forEach(char => {
            const el = createKey(char, "", () => addLetter(char));
            el.id = `key-${char}`;
            rowDiv.appendChild(el);
        });
        if (index === 2) rowDiv.appendChild(createKey("⌫", "key-wide key-back", deleteLetter));
        kb.appendChild(rowDiv);
    });
}

function createKey(text, extraClass, action) {
    const el = document.createElement('div');
    el.className = `key ${extraClass}`;
    el.innerText = text;
    el.onclick = (e) => { e.stopPropagation(); if (!gameOver) action(); };
    return el;
}

document.addEventListener('keydown', (e) => {
    if (document.getElementById('game-interface').style.display === 'none') return;
    if (gameOver) return;
    if (e.key === 'Enter') submitGuess();
    else if (e.key === 'Backspace') deleteLetter();
    else if (/^[а-яА-ЯёЁ]$/.test(e.key)) addLetter(e.key.toUpperCase());
});

function addLetter(l) {
    if (currentTile < targetWord.length) {
        const tile = document.getElementById(`tile-${currentAttempt}-${currentTile}`);
        tile.innerText = l;
        tile.style.borderColor = "#888";
        tile.style.transform = "scale(1.05)";
        setTimeout(() => tile.style.transform = "scale(1)", 100);
        currentTile++;
    }
}

function deleteLetter() {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById(`tile-${currentAttempt}-${currentTile}`);
        tile.innerText = '';
        tile.style.borderColor = "#444";
    }
}

function submitGuess() {
    if (currentTile < targetWord.length) { showMessage("Мало букв!"); return; }
    let guess = "";
    for (let i = 0; i < targetWord.length; i++) guess += document.getElementById(`tile-${currentAttempt}-${i}`).innerText;
    revealColors(guess);
    if (guess === targetWord) { showMessage("ПОБЕДА! 🎉"); gameOver = true; }
    else if (currentAttempt === maxAttempts - 1) { showMessage("Слово было: " + targetWord); gameOver = true; }
    else { currentAttempt++; currentTile = 0; }
}

function revealColors(guess) {
    let targetLetters = targetWord.split('');
    const rowTiles = [];
    const results = new Array(targetWord.length).fill('absent');
    for (let i = 0; i < targetWord.length; i++) {
        rowTiles.push(document.getElementById(`tile-${currentAttempt}-${i}`));
        if (guess[i] === targetWord[i]) { results[i] = 'correct'; targetLetters[i] = null; }
    }
    for (let i = 0; i < targetWord.length; i++) {
        if (results[i] === 'absent' && targetLetters.includes(guess[i])) {
            results[i] = 'present'; targetLetters[targetLetters.indexOf(guess[i])] = null;
        }
    }
    for (let i = 0; i < targetWord.length; i++) {
        const tile = rowTiles[i];
        const result = results[i];
        tile.classList.add(result);
        if (guess[i]) {
            const keyEl = document.getElementById(`key-${guess[i]}`);
            if (keyEl) {
                if (result === 'correct') { keyEl.classList.remove('present', 'absent'); keyEl.classList.add('correct'); }
                else if (result === 'present' && !keyEl.classList.contains('correct')) { keyEl.classList.remove('absent'); keyEl.classList.add('present'); }
                else if (result === 'absent' && !keyEl.classList.contains('correct') && !keyEl.classList.contains('present')) { keyEl.classList.add('absent'); }
            }
        }
    }
}

function showMessage(msg) { document.getElementById('message-area').innerText = msg; }