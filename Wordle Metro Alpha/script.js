const alphabet = "ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ".split("");
let targetWord = "";
let currentAttempt = 0;
let currentTile = 0;
let gameOver = false;
const maxAttempts = 6;

// --- Управление интерфейсом ---

// Убираем пробелы и делаем капсом при вводе
['word-input', 'code-input'].forEach(id => {
    document.getElementById(id).addEventListener('input', function() {
        this.value = this.value.replace(/\s/g, '').toUpperCase();
    });
});

// Открыть вкладку
function openPanel(id) {
    document.getElementById(id).style.display = 'flex';
}

// Закрыть вкладки (назад в меню)
function closePanel() {
    document.querySelectorAll('.panel-container').forEach(el => el.style.display = 'none');
    document.getElementById('link-result').style.display = 'none';
    document.getElementById('word-input').value = '';
}

// --- Логика Игры ---

window.onload = () => {
    // Проверяем, есть ли слово в ссылке (после #)
    const hash = window.location.hash.substring(1);
    if (hash) {
        try {
            // Пытаемся раскодировать
            targetWord = decodeURIComponent(escape(atob(hash))).toUpperCase().replace(/\s/g, '');
            if (targetWord && targetWord.length >= 3) {
                startGameUI();
            }
        } catch(e) {
            alert("Ссылка повреждена!");
        }
    }
    initKeyboard();
};

function generateLink() {
    const word = document.getElementById('word-input').value.trim();
    if (word.length < 3) return alert("Минимум 3 буквы!");

    // Кодируем слово
    const encoded = btoa(unescape(encodeURIComponent(word)));
    const url = window.location.origin + window.location.pathname + "#" + encoded;

    document.getElementById('final-link').value = url;
    document.getElementById('link-result').style.display = 'block';
}

function copyLink() {
    const el = document.getElementById('final-link');
    el.select();
    navigator.clipboard.writeText(el.value);
    alert("Ссылка скопирована!");
}

function startFromCode() {
    const code = document.getElementById('code-input').value.trim();
    if (!code) return;
    // Если вставили полную ссылку
    if (code.includes('#')) {
        window.location.href = code;
        window.location.reload();
        return;
    }
    // Если вставили только хеш
    window.location.hash = code;
    window.location.reload();
}

function startGameUI() {
    // Скрываем меню, показываем игру
    document.getElementById('main-menu').style.display = 'none';
    document.querySelectorAll('.panel-container').forEach(el => el.style.display = 'none');
    document.getElementById('game-wrapper').style.display = 'flex';
    
    initBoard();
}

function initBoard() {
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    
    for (let i = 0; i < maxAttempts; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < targetWord.length; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.id = `tile-${i}-${j}`;
            row.appendChild(tile);
        }
        container.appendChild(row);
    }
    document.getElementById('message').innerText = `Слово из ${targetWord.length} букв`;
}

function initKeyboard() {
    const kb = document.getElementById('mini-keyboard');
    kb.innerHTML = '';
    alphabet.forEach(char => {
        const el = document.createElement('div');
        el.className = 'key';
        el.id = `key-${char}`;
        el.innerText = char;
        el.onclick = () => { if (!gameOver) addLetter(char); };
        kb.appendChild(el);
    });
    
    // Добавляем Backspace и Enter в экранную клавиатуру для удобства
    const enterKey = document.createElement('div');
    enterKey.className = 'key';
    enterKey.innerText = 'ENTER';
    enterKey.style.gridColumn = "span 2";
    enterKey.style.background = "#00a300"; // Green
    enterKey.onclick = submitGuess;
    kb.appendChild(enterKey);

    const backKey = document.createElement('div');
    backKey.className = 'key';
    backKey.innerText = '⌫';
    backKey.style.gridColumn = "span 2";
    backKey.style.background = "#ee1111"; // Red
    backKey.onclick = deleteLetter;
    kb.appendChild(backKey);
}

// Обработка клавиш физической клавиатуры
document.addEventListener('keydown', (e) => {
    if (gameOver || !targetWord || document.getElementById('game-wrapper').style.display === 'none') return;
    
    if (e.key === 'Enter') submitGuess();
    else if (e.key === 'Backspace') deleteLetter();
    else if (/^[а-яА-ЯёЁ]$/.test(e.key)) addLetter(e.key.toUpperCase());
});

function addLetter(l) {
    if (currentTile < targetWord.length) {
        const tile = document.getElementById(`tile-${currentAttempt}-${currentTile}`);
        tile.innerText = l;
        // Анимация ввода
        tile.style.borderColor = "#999";
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
        tile.style.borderColor = "#3a3a3c";
    }
}

function submitGuess() {
    if (currentTile < targetWord.length) {
        showMessage("Мало букв!");
        return;
    }
    
    let guess = "";
    for (let i = 0; i < targetWord.length; i++) {
        guess += document.getElementById(`tile-${currentAttempt}-${i}`).innerText;
    }
    
    revealColors(guess);

    if (guess === targetWord) {
        showMessage("ПОБЕДА! 🎉");
        gameOver = true;
    } else if (currentAttempt === maxAttempts - 1) {
        showMessage("Слово: " + targetWord);
        gameOver = true;
    } else {
        currentAttempt++;
        currentTile = 0;
    }
}

function revealColors(guess) {
    let targetLetters = targetWord.split('');
    const rowTiles = [];
    const results = new Array(targetWord.length).fill('absent');

    for (let i = 0; i < targetWord.length; i++) {
        rowTiles.push(document.getElementById(`tile-${currentAttempt}-${i}`));
    }

    // 1. Зеленые
    guess.split('').forEach((l, i) => {
        if (l === targetWord[i]) {
            results[i] = 'correct';
            rowTiles[i].classList.add('correct');
            targetLetters[i] = null;
        }
    });

    // 2. Желтые
    guess.split('').forEach((l, i) => {
        if (results[i] !== 'correct') {
            const idx = targetLetters.indexOf(l);
            if (idx !== -1) {
                results[i] = 'present';
                rowTiles[i].classList.add('present');
                targetLetters[idx] = null;
            } else {
                rowTiles[i].classList.add('absent');
            }
        }
    });

    // 3. Клавиатура
    guess.split('').forEach((l, i) => {
        const key = document.getElementById(`key-${l}`);
        if (!key) return;
        
        // Приоритет цветов: Зеленый > Желтый > Серый
        if (results[i] === 'correct') {
            key.className = 'key correct';
        } else if (results[i] === 'present' && !key.classList.contains('correct')) {
            key.className = 'key present';
        } else if (!key.classList.contains('correct') && !key.classList.contains('present')) {
            key.className = 'key absent';
        }
    });
}

function showMessage(text) {
    const msg = document.getElementById('message');
    msg.innerText = text;
    setTimeout(() => { if(!gameOver) msg.innerText = ""; }, 2000);
}