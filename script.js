// --- ПЕРЕМЕННЫЕ ---
let targetWord = "";
let currentAttempt = 0;
let currentTile = 0;
let gameOver = false;
const maxAttempts = 6;
let currentGameType = "METRO WORDLE"; 
let isEditMode = false;
let draggedItem = null;
let messageTimeoutId = null;

// --- БАЗА СЛОВ ---
const wordsDB = [
  "ДОМ", "УЛИЦА", "ГОРОД", "СТРАНА", "МИР", "ЧЕЛОВЕК", "ЛЮДИ", "РЕБЁНОК", "ДРУГ", "СЕМЬЯ", 
  "МАМА", "ПАПА", "БРАТ", "СЕСТРА", "РАБОТА", "ДЕНЬ", "НОЧЬ", "УТРО", "ВЕЧЕР", "ВРЕМЯ", 
  "ГОД", "ЖИЗНЬ", "РУКА", "НОГА", "ГОЛОВА", "ГЛАЗ", "СЛОВО", "ДЕЛО", "ВЕЩЬ", "МЕСТО", 
  "ВОПРОС", "ОТВЕТ", "МЫСЛЬ", "ИДЕЯ", "ПРОБЛЕМА", "РЕШЕНИЕ", "ДЕНЬГИ", "ЦЕНА", "МАГАЗИН", 
  "ШКОЛА", "КНИГА", "ТЕЛЕФОН", "КОМПЬЮТЕР", "ИНТЕРНЕТ", "ИГРА", "МУЗЫКА", "ФИЛЬМ", "ВИДЕО", 
  "ЗВУК", "СВЕТ", "ОКНО", "ДВЕРЬ", "СТОЛ", "СТУЛ", "КРОВАТЬ", "ЕДА", "ВОДА", "ЧАЙ", 
  "КОФЕ", "ХЛЕБ", "СУП", "МЯСО", "ОВОЩИ", "ФРУКТЫ", "ДОРОГА", "МАШИНА", "АВТОБУС", "ПОЕЗД", 
  "ВОКЗАЛ", "ДОМОЙ", "ПЛОЩАДЬ", "ПАРК", "ЛЕС", "РЕКА", "МОРЕ", "НЕБО", "СОЛНЦЕ", "ЛУНА", 
  "ЗВЕЗДА", "ПОГОДА", "ДОЖДЬ", "СНЕГ", "ВЕТЕР", "ТЕПЛО", "ХОЛОД", "ОГОНЬ", "ВОЗДУХ", "ЗЕМЛЯ", 
  "КАМЕНЬ", "МЕТАЛЛ", "ДЕРЕВО", "БУМАГА", "ЦВЕТ", "ФОРМА", "РАЗМЕР", "СКОРОСТЬ", "СИЛА", 
  "СТРАХ", "РАДОСТЬ", "ГРУСТЬ", "ЗЛОСТЬ", "СМЕХ", "СЛЁЗЫ", "УЛЫБКА", "НАДЕЖДА", "МЕЧТА", 
  "ЦЕЛЬ", "ПЛАН", "ОШИБКА", "УСПЕХ", "ПОБЕДА", "ПОРАЖЕНИЕ", "НАЧАЛО", "КОНЕЦ", "ПУТЬ", 
  "ШАГ", "ВЫБОР", "ШАНС", "ОПЫТ", "ПАМЯТЬ", "ВНИМАНИЕ", "ИНТЕРЕС", "ЖЕЛАНИЕ", "ВСТРЕЧА", 
  "РАЗГОВОР", "СООБЩЕНИЕ", "НОВОСТЬ", "ИСТОРИЯ", "ПРИМЕР", "СЛУЧАЙ", "МОМЕНТ", "СИТУАЦИЯ", 
  "УСЛОВИЕ", "ПРАВИЛО", "ЗАКОН", "ВЛАСТЬ", "ОБЩЕСТВО", "ГРУППА", "КОМАНДА", "ЛИДЕР", "УЧАСТНИК", 
  "НАЧАЛЬНИК", "РАБОТНИК", "ПРОФЕССИЯ", "ЗАНЯТИЕ", "ЗАДАЧА", "ПРОЕКТ", "РЕЗУЛЬТАТ", "ПРОЦЕСС", 
  "СИСТЕМА", "СТРУКТУРА", "УРОВЕНЬ", "КАЧЕСТВО", "КОЛИЧЕСТВО", "ЗНАЧЕНИЕ", "СМЫСЛ", "ФАКТ", 
  "ПРАВДА", "ЛОЖЬ", "МНЕНИЕ", "ТОЧКА", "ЗРЕНИЕ", "ПОЗИЦИЯ", "ВЫВОД", "АРГУМЕНТ", "ДОКАЗАТЕЛЬСТВО", 
  "ПРИЧИНА", "СЛЕДСТВИЕ", "ВАРИАНТ", "ВЫХОД", "ВХОД", "НАЧАЛЬСТВО", "ПОДДЕРЖКА", "ПОМОЩЬ", 
  "СОВЕТ", "ОТВЕТСТВЕННОСТЬ", "ОБЯЗАННОСТЬ", "ПРАВО", "СВОБОДА", "ОГРАНИЧЕНИЕ", "КОНТРОЛЬ", 
  "ПОРЯДОК", "ХАОС", "БЕЗОПАСНОСТЬ", "РИСК", "УГРОЗА", "ЗАЩИТА", "АТАКА", "ПРОИГРЫШ", "НЕУДАЧА", 
  "ПРОГРЕСС", "РАЗВИТИЕ", "РОСТ", "УПАДОК", "ИЗМЕНЕНИЕ", "СТАБИЛЬНОСТЬ", "БАЛАНС", "КРИЗИС", 
  "РЕСУРС", "ЭНЕРГИЯ", "СЛАБОСТЬ", "ВОЗМОЖНОСТЬ", "ПОТЕНЦИАЛ", "НАВЫК", "ЗНАНИЕ", "УМЕНИЕ", 
  "ОБУЧЕНИЕ", "ПРАКТИКА", "ТРЕНИРОВКА", "ИСПРАВЛЕНИЕ", "ПОВТОР", "ПРИВЫЧКА", "ХАРАКТЕР", 
  "ЛИЧНОСТЬ", "ПОВЕДЕНИЕ", "РЕАКЦИЯ", "ЭМОЦИЯ", "ЧУВСТВО", "НАСТРОЕНИЕ", "УВЕРЕННОСТЬ", 
  "СОМНЕНИЕ", "ОЖИДАНИЕ", "ТЕРПЕНИЕ", "СПОКОЙСТВИЕ", "СТРЕСС", "НАПРЯЖЕНИЕ", "УСТАЛОСТЬ", 
  "ОТДЫХ", "СОН", "ЗДОРОВЬЕ", "БОЛЕЗНЬ", "ЛЕЧЕНИЕ", "ВРАЧ", "ЛЕКАРСТВО", "БОЛЬ", "СИМПТОМ", 
  "МАССА", "ОБЪЁМ", "ПЛОТНОСТЬ", "ДВИЖЕНИЕ", "НАПРАВЛЕНИЕ", "ПРОСТРАНСТВО", "РАССТОЯНИЕ", 
  "ЛИНИЯ", "УГОЛ", "ГРАНИЦА", "ЦЕНТР", "КРАЙ", "ПОВЕРХНОСТЬ", "ГЛУБИНА", "ВЫСОТА", "ШИРИНА", 
  "ДЛИНА", "ВЕС", "ДАВЛЕНИЕ", "ТЕМПЕРАТУРА", "СОСТОЯНИЕ", "ЭТАП", "ФУНКЦИЯ", "РОЛЬ", "ЭФФЕКТ", 
  "ВЛИЯНИЕ", "СВЯЗЬ", "ЗАВИСИМОСТЬ", "ОТНОШЕНИЕ", "КОНТАКТ", "ДЕЙСТВИЕ", "ПОСТУПОК", "ПОПЫТКА", 
  "СТРАТЕГИЯ", "ТАКТИКА", "МЕТОД", "СПОСОБ", "ПРИЁМ", "ИНСТРУМЕНТ", "СРЕДСТВО", "МАТЕРИАЛ", 
  "ОБЪЕКТ", "ПРЕДМЕТ", "ЭЛЕМЕНТ", "ЧАСТЬ", "ЦЕЛОЕ", "МОДЕЛЬ", "ШАБЛОН", "ОБРАЗЕЦ", "ТИП", 
  "ВИД", "КАТЕГОРИЯ", "КЛАСС", "ПАРАМЕТР", "НАСТРОЙКА", "РЕЖИМ", "СИГНАЛ", "ДАННЫЕ", "ИНФОРМАЦИЯ", 
  "ФАЙЛ", "ПАПКА", "ДОКУМЕНТ", "ТЕКСТ", "БУКВА", "РЕЧЬ", "ЯЗЫК", "ПЕРЕВОД", "КОНТЕКСТ", 
  "СБОЙ", "ОБНОВЛЕНИЕ", "ВЕРСИЯ", "ПЛАТФОРМА", "УСТРОЙСТВО", "ЭКРАН", "КНОПКА", "МЕНЮ", 
  "НАСТРОЙКИ", "ПРОГРАММА", "ПРИЛОЖЕНИЕ", "СЕРВИС", "САЙТ", "СТРАНИЦА", "ССЫЛКА", "АДРЕС", 
  "ПРОФИЛЬ", "АККАУНТ", "ДОСТУП", "ПАРОЛЬ", "СЕТЬ", "ПОДКЛЮЧЕНИЕ", "ЗАДЕРЖКА", "КАНАЛ", 
  "ПОТОК", "СЕРВЕР", "КЛИЕНТ", "ЗАПРОС", "ЛОГ", "ОТЧЁТ", "СТАТУС", "РЫНОК", "ПОКУПКА", 
  "ПРОДАЖА", "ТОВАР", "УСЛУГА", "ЗАКАЗ", "ДОСТАВКА", "ОПЛАТА", "СЧЁТ", "ЧЕК", "СКИДКА", 
  "СТОИМОСТЬ", "БЮДЖЕТ", "РАСХОД", "ДОХОД", "ПРИБЫЛЬ", "УБЫТОК", "ДОЛГ", "КРЕДИТ", "БАНК", 
  "КАРТА", "НАЛИЧНЫЕ", "КОШЕЛЁК", "ФИНАНСЫ", "ЭКОНОМИКА", "БИЗНЕС", "КОМПАНИЯ", "ФИРМА", 
  "БРЕНД", "ПАРТНЁР", "КОНТРАКТ", "ДОГОВОР", "СДЕЛКА", "ПЕРЕГОВОРЫ", "СРОК", "ГАРАНТИЯ", 
  "ПРОВЕРКА", "ОЦЕНКА", "РЕЙТИНГ", "ОТЗЫВ", "РЕПУТАЦИЯ", "РЕКЛАМА", "ПРОДВИЖЕНИЕ", "МАРКЕТИНГ", 
  "СПРОС", "ПРЕДЛОЖЕНИЕ", "КОНКУРЕНЦИЯ", "НИША", "СТАТИСТИКА", "АНАЛИЗ", "ПОКАЗАТЕЛЬ", 
  "МЕТРИКА", "СПАД", "ТРЕНД", "ПРОГНОЗ", "ПЕРСПЕКТИВА", "БУДУЩЕЕ", "ВЫЗОВ", "АДАПТАЦИЯ", 
  "ИННОВАЦИЯ", "СТАРТАП", "ПРОДУКТ", "ЭКОСИСТЕМА", "ЛИДЕРСТВО", "УПРАВЛЕНИЕ", "МЕНЕДЖМЕНТ", 
  "ОРГАНИЗАЦИЯ", "РЕГЛАМЕНТ", "СТАНДАРТ", "ПОЛИТИКА", "КУЛЬТУРА", "ЦЕННОСТЬ", "МИССИЯ", 
  "ВИДЕНИЕ", "КУРС", "ПРИОРИТЕТ", "ФОКУС", "НАГРУЗКА", "ДЕДЛАЙН", "СРОЧНОСТЬ", "ВАЖНОСТЬ",
  "ВАЙБ", "КРИНЖ", "РОФЛ", "ЧИЛЛ", "ХАЙП", "КРАШ", "ПРУФ", "СКИЛЛ", "БАГ", "ФИЧА",
  "ЛАГ", "СТРИМ", "ДОНАТ", "БЛОГЕР", "ТИКТОК", "ЮТУБ", "ЛАЙК", "РЕПОСТ", "ЧАТ", "БОТ",
  "НЕЙРОСЕТЬ", "АЙФОН", "АНДРОИД", "ГАДЖЕТ", "ПЛАНШЕТ", "НОУТБУК", "ВАЙФАЙ", "БЛЮТУЗ", "ЗАРЯДКА", "АККУМУЛЯТОР",
  "КРИПТА", "БИТКОИН", "МАЙНИНГ", "ТОКЕН", "БЛОКЧЕЙН", "СТАРТАП", "ЮНИКОРН", "ИНВЕСТОР", "ТРЕЙДИНГ", "БИРЖА",
  "АВАТАР", "НИКНЕЙМ", "ЛОГИН", "СКРИНШОТ", "СМАЙЛ", "СТИКЕР", "МЕМ", "ГИФКА", "ВИРУС", "АНТИВИРУС",
  "ПИКСЕЛЬ", "ГРАФИКА", "ДИЗАЙН", "ШРИФТ", "КОД", "СКРИПТ", "ЯЗЫК", "ПИТОН", "ДЖАВА", "РАЗРАБОТЧИК",
  "СЕРВЕР", "ОБЛАКО", "ДАТА", "БАЗА", "ХАКЕР", "КИБЕР", "СПОРТ", "ФИТНЕС", "ЙОГА", "ТРЕНИРОВКА",
  "КРОССОВКИ", "ХУДИ", "СВИТШОТ", "ДЖИНСЫ", "БРЕНД", "МОДА", "СТИЛЬ", "ЛУК", "АУТФИТ", "ТРЕНД",
  "ПИЦЦА", "СУШИ", "БУРГЕР", "СМУЗИ", "ЛАТТЕ", "ВЕГАН", "ЗОЖ", "ДИЕТА", "КАЛОРИЯ", "БЕЛОК",
  "КОСМОС", "РАКЕТА", "МАРС", "ЛУНА", "ОРБИТА", "СПУТНИК", "ТЕЛЕСКОП", "ГАЛАКТИКА", "ВСЕЛЕННАЯ", "ЧЕРНАЯДЫРА",
  "РОБОТ", "ДРОН", "ЛАЗЕР", "КИБОРГ", "МАТРИЦА", "ВИРТУАЛЬНОСТЬ", "РЕАЛЬНОСТЬ", "СИМУЛЯЦИЯ", "ГОЛОГРАММА", "ПОРТАЛ",
  "ЗОМБИ", "ВАМПИР", "ПРИЗРАК", "МОНСТР", "ДРАКОН", "МАГИЯ", "ЗАКЛИНАНИЕ", "ЗЕЛЬЕ", "МЕЧ", "ЩИТ",
  "УРОВЕНЬ", "БОСС", "КВЕСТ", "ЛУТ", "СКИН", "РАНГ", "НУБ", "ПРО", "ТИММЕЙТ", "СОЛО",
  "РЕЙВ", "ТУСОВКА", "ВЕЧЕРИНКА", "КЛУБ", "ДИДЖЕЙ", "БИТ", "БАС", "РЭП", "РОК", "ПОПСА",
  "ГРАФФИТИ", "ТАТУ", "ПИРСИНГ", "ДРЕДЫ", "СКЕЙТ", "САМОКАТ", "ВЕЛОСИПЕД", "МЕТРО", "ТАКСИ", "КАРШЕРИНГ",
  "ДОСТАВКА", "КУРЬЕР", "ПУНКТ", "ВЫДАЧА", "МАРКЕТПЛЕЙС", "КОРЗИНА", "ОТЗЫВ", "РЕЙТИНГ", "ЗВЕЗДА", "КОММЕНТАРИЙ",
  "ПСИХОЛОГ", "ТЕРАПИЯ", "ТРАВМА", "ТРИГГЕР", "АБЬЮЗ", "ТОКСИК", "ГАЗЛАЙТИНГ", "РЕСУРС", "ПОТОК", "ОСОЗНАННОСТЬ",
  "ЭКОЛОГИЯ", "КЛИМАТ", "ПЛАСТИК", "МУСОР", "ПЕРЕРАБОТКА", "ПРИРОДА", "ПЛАНЕТА", "ОКЕАН", "ДЖУНГЛИ", "ПУСТЫНЯ"
];

let defaultModeSelectionHTML = "";

// --- ЗАГРУЗКА ---
window.addEventListener('DOMContentLoaded', () => {
    const modeSel = document.getElementById('mode-selection');
    if (modeSel) defaultModeSelectionHTML = modeSel.innerHTML;

    loadLayout(); // ЗАГРУЗКА СОХРАНЕНИЯ
    updateClock();
    initDragAndDrop();
    
    // Обработка ПКМ для нижней панели
    document.body.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        const bar = document.getElementById('bottom-bar');
        bar.classList.add('visible');
    });

    // Скрытие панели при клике в любом месте
    document.body.addEventListener('click', function(e) {
        const bar = document.getElementById('bottom-bar');
        // Если клик не по самой панели, скрываем
        if (!bar.contains(e.target)) {
            bar.classList.remove('visible');
        }
    });
    
    const hash = window.location.hash.substring(1);
    if (hash) {
        try {
            const decoded = decodeURIComponent(escape(atob(hash)));
            const preparedWord = sanitizeWord(decoded);
            if (preparedWord && preparedWord.length >= 3) {
                targetWord = preparedWord;
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
    const clockEl = document.getElementById('live-clock-data');
    if(clockEl) {
        clockEl.querySelector('.time-text').innerText = timeStr;
        clockEl.querySelector('.date-text').innerText = dateStr;
    }
}
setInterval(updateClock, 1000);

// --- СОХРАНЕНИЕ ---
// ВАЖНО: Ключ 1.2, чтобы сбросить старый порядок
const STORAGE_KEY = 'metroLayout_v1.2';

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
        initDragAndDrop();
    } catch (e) { console.error("Ошибка загрузки", e); }
}

function resetStartMenu() {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
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
}

function handleTileClick(tileElement, actionFunction) {
    if (isEditMode) {
        cycleTileSize(tileElement);
    } else {
        if (typeof actionFunction === 'function') actionFunction();
    }
}

// ЦИКЛ РАЗМЕРОВ (МАКС ШИРИНА 2)
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
    if (targetWord && !gameOver) openApp('view-game', currentGameType);
    else alert("Нет активной игры. Начните новую!");
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
        e.dataTransfer.setData('text/plain', this.id || 'tile');
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

    const customInput = document.getElementById('custom-word-input');
    if (customInput) {
        customInput.focus();
        customInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                generateLink();
            }
        });
    }
}

function restoreMenu() { if(defaultModeSelectionHTML) document.getElementById('mode-selection').innerHTML = defaultModeSelectionHTML; }

function sanitizeWord(rawWord) {
    return String(rawWord || '').trim().toUpperCase().replace(/[^А-ЯЁ]/g, '');
}

function generateLink() {
    const input = document.getElementById('custom-word-input');
    const word = sanitizeWord(input.value);
    if (word.length < 3) {
        showMessage("Минимум 3 буквы!", 'error');
        input.focus();
        return;
    }
    const encoded = btoa(unescape(encodeURIComponent(word)));
    const url = window.location.origin + window.location.pathname + "#" + encoded;
    document.getElementById('create-actions').style.display = 'none';
    document.getElementById('custom-word-input').style.display = 'none';
    const resultArea = document.getElementById('link-result-area');
    resultArea.style.display = 'flex';
    document.getElementById('share-link').value = url;
    showMessage("Ссылка готова — можно отправлять другу.", 'success');
}

function copyLink() {
    const linkInput = document.getElementById('share-link');
    linkInput.select();
    if (!navigator.clipboard) {
        showMessage("Буфер обмена недоступен в этом браузере.", 'warning');
        return;
    }
    navigator.clipboard.writeText(linkInput.value)
        .then(() => showMessage("Ссылка скопирована!", 'success'))
        .catch(() => showMessage("Не удалось скопировать ссылку.", 'error'));
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
        if (!tile) return;
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
        if (!tile) return;
        tile.innerText = '';
        tile.style.borderColor = "#444";
    }
}

function submitGuess() {
    if (currentTile < targetWord.length) { showMessage("Мало букв!", 'warning'); return; }
    let guess = "";
    for (let i = 0; i < targetWord.length; i++) guess += document.getElementById(`tile-${currentAttempt}-${i}`).innerText;
    revealColors(guess);
    if (guess === targetWord) { showMessage("ПОБЕДА! 🎉", 'success', 5000); gameOver = true; }
    else if (currentAttempt === maxAttempts - 1) { showMessage("Слово было: " + targetWord, 'error', 6000); gameOver = true; }
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

function showMessage(msg, type = 'warning', timeout = 2500) {
    const messageArea = document.getElementById('message-area');
    if (!messageArea) return;
    messageArea.innerText = msg;
    messageArea.classList.remove('message-success', 'message-warning', 'message-error');
    if (type === 'success') messageArea.classList.add('message-success');
    else if (type === 'error') messageArea.classList.add('message-error');
    else messageArea.classList.add('message-warning');

    if (messageTimeoutId) clearTimeout(messageTimeoutId);
    if (timeout > 0) {
        messageTimeoutId = setTimeout(() => {
            messageArea.innerText = '';
            messageArea.classList.remove('message-success', 'message-warning', 'message-error');
        }, timeout);
    }
}
