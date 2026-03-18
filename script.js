// --- ПЕРЕМЕННЫЕ ---
let targetWord = "";
let currentAttempt = 0;
let currentTile = 0;
let gameOver = false;
const maxAttempts = 6;
let currentGameType = "METRO WORDLE"; 
let isEditMode = false;
let draggedItem = null;

// Настройки (по умолчанию меню браузера включено)
let settings = {
    bg: null,
    allowBrowserContextMenu: true 
};

// --- ДАННЫЕ ДЛЯ ПЕРСОНАЛИЗАЦИИ ---
const backgroundsData = {
    1: ["Blue", "Green", "Orange", "Pink", "Red"],
    2: ["Black", "Blue", "Green", "LightBlue", "Orange", "Pink", "Red", "Yelow"],
    3: ["Black", "Blue", "Gray", "Green", "LightBlue", "LightRed", "Orange", "Pink", "Red"],
    4: ["Black", "Blue", "Green", "LightBlue", "Red"],
    5: ["Blue", "Green", "LightBlue", "Orange", "Red"],
    6: ["Black", "Blue", "Green", "Orange", "Red"],
    7: ["Black", "Blue", "Green", "LightBlue", "Pink", "Red", "Yellow", "Orange"],
    8: ["Black", "Blue", "Green", "LightBlue", "Red", "Yellow"],
    9: ["Black", "Blue", "Green", "LightBlue", "LightGreen", "Pink", "Red", "Yellow"],
    10: ["LightBlue", "Yellow", "Black", "Orange", "Blue", "Pink", "Green", "Red"],
    11: ["Orange", "Black", "Red", "Blue", "Green"],
    12: ["Green", "Red", "LightBlue", "Yellow", "Black", "Orange", "Blue", "Pink"],
    13: ["Blue", "Gray", "Green", "LightBlue", "Orange", "Pink", "Red", "Yellow"]
};

// --- БАЗА СЛОВ ---
const wordsDB = [
  "ДОМ", "УЛИЦА", "ГОРОД", "СТРАНА", "МИР", "ЧЕЛОВЕК", "ЛЮДИ", "РЕБЁНОК", "ДРУГ", "СЕМЬЯ", 
  "МАМА", "ПАПА", "БРАТ", "СЕСТРА", "РАБОТА", "ДЕНЬ", "НОЧЬ", "УТРО", "ВЕЧЕР", "ВРЕМЯ", "ГОД", "ЖИЗНЬ"
];

let defaultModeSelectionHTML = "";

// --- ЗАГРУЗКА ---
window.addEventListener('DOMContentLoaded', () => {
    const modeSel = document.getElementById('mode-selection');
    if (modeSel) defaultModeSelectionHTML = modeSel.innerHTML;

    loadLayout(); 
    loadSettings(); 
    updateClock();
    initDragAndDrop();
    initPersonalizationUI();
    
    // ВАЖНО: Обработка ПКМ
    window.addEventListener('contextmenu', function(e) {
        // Если мы в приложении - ничего не делаем (стандартное поведение браузера)
        if (document.getElementById('game-app').style.display === 'flex') return;

        // Если мы на главном экране:
        // 1. Всегда открываем/закрываем нижнюю панель
        const bar = document.getElementById('bottom-bar');
        if (bar.classList.contains('visible')) {
            bar.classList.remove('visible');
        } else {
            bar.classList.add('visible');
        }

        // 2. Проверяем настройку "Меню браузера"
        if (!settings.allowBrowserContextMenu) {
            e.preventDefault(); // Блокируем меню браузера, если настройка выключена
        }
        // Если включена - ничего не делаем, меню браузера откроется само поверх панели
    });

    // Скрытие панели при клике ЛЕВОЙ кнопкой
    window.addEventListener('click', function(e) {
        const bar = document.getElementById('bottom-bar');
        const sidebar = document.getElementById('personalization-sidebar');
        
        if (!bar.contains(e.target) && !sidebar.contains(e.target)) {
            bar.classList.remove('visible');
        }
    });
    
    checkUrlHash();
});

function checkUrlHash() {
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
}

// --- ЧАСЫ ---
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    const clockEl = document.getElementById('live-clock-data');
    if(clockEl) {
        clockEl.querySelector('.time-text').innerText = timeStr;
        clockEl.querySelector('.date-text').innerText = dateStr;
    }
}
setInterval(updateClock, 1000);

// --- СОХРАНЕНИЕ ---
const STORAGE_KEY = 'metroLayout_v1.3400';
const SETTINGS_KEY = 'metroSettings_v1.3400';

function saveLayout() {
    const grid = document.getElementById('tile-grid');
    const tiles = Array.from(grid.children);
    const layout = tiles.map(tile => {
        return { id: tile.id, className: tile.className };
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
}

function loadLayout() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
        const layout = JSON.parse(saved);
        const grid = document.getElementById('tile-grid');
        const currentTiles = {};
        Array.from(grid.children).forEach(tile => { if(tile.id) currentTiles[tile.id] = tile; });
        
        layout.forEach(item => {
            const tile = currentTiles[item.id];
            if (tile) {
                tile.className = item.className;
                grid.appendChild(tile);
            }
        });
    } catch (e) { console.error("Ошибка загрузки", e); }
}

function resetStartMenu() {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
}

// --- НАСТРОЙКИ ---
function loadSettings() {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    if (saved) {
        settings = { ...settings, ...saved };
    }
    
    // Применяем фон
    if (settings.bg) document.body.style.backgroundImage = `url('${settings.bg}')`;
    
    // Применяем состояние чекбокса
    const toggle = document.getElementById('toggle-browser-menu');
    if (toggle) toggle.checked = settings.allowBrowserContextMenu;
}

function saveSettingsToStorage() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function toggleBrowserMenuSetting() {
    const toggle = document.getElementById('toggle-browser-menu');
    settings.allowBrowserContextMenu = toggle.checked;
    saveSettingsToStorage();
}

// --- ПЕРСОНАЛИЗАЦИЯ ---
function initPersonalizationUI() {
    const iconContainer = document.getElementById('bg-icons-container');

    for (let i = 1; i <= 13; i++) {
        const img = document.createElement('img');
        img.src = `BackGround/IconsForBackGround/${i}_Icon.png`;
        img.className = 'bg-icon-option';
        img.onclick = () => showWallpapersForId(i);
        iconContainer.appendChild(img);
    }
}

function showWallpapersForId(id) {
    const container = document.getElementById('bg-wallpapers-container');
    container.innerHTML = '';
    
    const variants = backgroundsData[id];
    if (variants) {
        variants.forEach(variant => {
            const fileName = `${id}_${variant}.png`;
            const fullPath = `BackGround/${fileName}`;
            
            const div = document.createElement('div');
            div.className = 'wallpaper-option';
            div.style.backgroundImage = `url('${fullPath}')`;
            div.onclick = () => setBackground(fullPath);
            container.appendChild(div);
        });
    }
}

function setBackground(path) {
    document.body.style.backgroundImage = `url('${path}')`;
    settings.bg = path;
    saveSettingsToStorage();
}

function togglePersonalization() {
    document.getElementById('personalization-sidebar').classList.toggle('open');
    document.getElementById('bottom-bar').classList.remove('visible');
}

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
    document.getElementById('bottom-bar').classList.remove('visible');
}

function handleTileClick(tileElement, actionFunction) {
    if (isEditMode) {
        cycleTileSize(tileElement);
    } else {
        if (typeof actionFunction === 'function') actionFunction();
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
    saveLayout();
}

// --- СИСТЕМА ПРИЛОЖЕНИЙ ---
function hideAllViews() { document.querySelectorAll('.app-view').forEach(view => view.style.display = 'none'); }

function openApp(viewId, title) {
    document.getElementById('game-app').style.display = 'flex';
    hideAllViews();
    const view = document.getElementById(viewId);
    if (view) {
        view.style.display = 'flex';
        document.getElementById('app-title-text').innerText = title;
    }
    if (viewId === 'view-game') {
        document.getElementById('mode-selection').style.display = 'flex';
        document.getElementById('game-interface').style.display = 'none';
        document.getElementById('create-interface').style.display = 'none';
        document.getElementById('friend-interface').style.display = 'none';

        if (targetWord && !gameOver) {
            document.getElementById('mode-selection').style.display = 'none';
            document.getElementById('game-interface').style.display = 'flex';
            document.getElementById('app-title-text').innerText = currentGameType;
        }
    }
}

function resumeGame() {
    if (targetWord && !gameOver) openApp('view-game', currentGameType);
    else alert("Нет активной игры. Начните новую!");
}

function handleBackButton() {
    if (document.getElementById('create-interface').style.display === 'flex' || 
        document.getElementById('friend-interface').style.display === 'flex') {
        document.getElementById('create-interface').style.display = 'none';
        document.getElementById('friend-interface').style.display = 'none';
        document.getElementById('mode-selection').style.display = 'flex';
        return;
    }

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
    if (window.location.hash) history.pushState("", document.title, window.location.pathname + window.location.search);
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
        saveLayout();
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
        saveLayout();
    });
}

// --- ИГРА ---
function startRandomMode() {
    resetGame();
    targetWord = wordsDB[Math.floor(Math.random() * wordsDB.length)];
    currentGameType = "Случайное Metro Wordle"; 
    startGameUI();
}

function startCreateMode() {
    document.getElementById('mode-selection').style.display = 'none';
    document.getElementById('create-interface').style.display = 'flex';
    document.getElementById('create-buttons').style.display = 'block';
    document.getElementById('code-result').style.display = 'none';
    document.getElementById('custom-word-input').value = '';
}

function startFriendMode() {
    document.getElementById('mode-selection').style.display = 'none';
    document.getElementById('friend-interface').style.display = 'flex';
}

function generateCode() {
    const input = document.getElementById('custom-word-input');
    const word = input.value.trim().toUpperCase().replace(/[^А-ЯЁ]/g, '');
    if (word.length < 3) { alert("Минимум 3 буквы!"); return; }
    const encoded = btoa(unescape(encodeURIComponent(word)));
    const url = window.location.origin + window.location.pathname + "#" + encoded;
    document.getElementById('create-buttons').style.display = 'none';
    document.getElementById('code-result').style.display = 'flex';
    document.getElementById('generated-code').innerText = encoded;
    document.getElementById('share-link').value = url;
}

function copyCode() {
    const code = document.getElementById('generated-code').innerText;
    navigator.clipboard.writeText(code).then(() => alert("Код скопирован!"));
}

function shareGame() {
    const code = document.getElementById('generated-code').innerText;
    const url = document.getElementById('share-link').value;
    if (navigator.share) {
        navigator.share({ title: 'Metro Wordle', text: `Угадай слово! Код: ${code}`, url: url }).catch(console.error);
    } else {
        navigator.clipboard.writeText(url).then(() => alert("Ссылка скопирована"));
    }
}

function joinGame() {
    const input = document.getElementById('friend-code-input').value.trim();
    if (!input) return;
    if (input.includes('#')) { window.location.href = input; location.reload(); return; }
    try {
        const decoded = decodeURIComponent(escape(atob(input))).toUpperCase().replace(/\s/g, '');
        if (decoded && decoded.length >= 3) {
            targetWord = decoded; currentGameType = "Metro Wordle от друга";
            resetGame(); startGameUI();
        } else { alert("Неверный код"); }
    } catch (e) { alert("Ошибка кода"); }
}

function startGameUI() {
    document.getElementById('mode-selection').style.display = 'none';
    document.getElementById('create-interface').style.display = 'none';
    document.getElementById('friend-interface').style.display = 'none';
    document.getElementById('game-interface').style.display = 'flex';
    document.getElementById('app-title-text').innerText = currentGameType;
    initBoard(); initKeyboard();
}

function resetGame() {
    currentAttempt = 0; currentTile = 0; gameOver = false;
    document.getElementById('game-container').innerHTML = '';
    document.getElementById('message-area').innerText = '';
    document.querySelectorAll('.key').forEach(key => {
        key.className = key.className.replace(' correct', '').replace(' present', '').replace(' absent', '');
        key.style.background = ""; key.style.opacity = "";
    });
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