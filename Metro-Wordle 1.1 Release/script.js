// --- БАЗА СЛОВ ---
// Мы вставили слова прямо сюда, чтобы работало без сервера
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

let targetWord = "";
let currentAttempt = 0;
let currentTile = 0;
let gameOver = false;
const maxAttempts = 6;
let currentGameType = "METRO WORDLE"; 

// Сохраняем исходный HTML меню выбора
const defaultModeSelectionHTML = document.getElementById('mode-selection').innerHTML;

// --- ЗАГРУЗКА ---
window.addEventListener('DOMContentLoaded', () => {
    updateClock();
    
    // Проверка ссылки (для игры от друга)
    const hash = window.location.hash.substring(1);
    if (hash) {
        try {
            const decoded = decodeURIComponent(escape(atob(hash))).toUpperCase().replace(/\s/g, '');
            if (decoded && decoded.length >= 3) {
                targetWord = decoded;
                currentGameType = "Metro Wordle от друга"; 
                openAppWindow();
                startGameUI();
            }
        } catch (e) {
            console.error(e);
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }
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

// --- УПРАВЛЕНИЕ ОКНАМИ И НАВИГАЦИЯ ---

function openAppWindow() {
    document.getElementById('game-app').style.display = 'flex';
}

// Плитка "Играть"
function openGameMenu() {
    openAppWindow();
    document.getElementById('app-title-text').innerText = "METRO WORDLE";
    document.getElementById('about-interface').style.display = 'none';
    
    if (targetWord && !gameOver) {
        // Если игра уже активна, идем сразу в игру
        document.getElementById('app-title-text').innerText = currentGameType;
        document.getElementById('mode-selection').style.display = 'none';
        document.getElementById('game-interface').style.display = 'flex';
    } else {
        // Иначе в выбор режима
        document.getElementById('mode-selection').style.display = 'flex';
        document.getElementById('game-interface').style.display = 'none';
    }
}

// Плитка "Вернуться в игру"
function resumeGame() {
    if (targetWord && !gameOver) {
        openAppWindow();
        document.getElementById('app-title-text').innerText = currentGameType;
        document.getElementById('about-interface').style.display = 'none';
        document.getElementById('mode-selection').style.display = 'none';
        document.getElementById('game-interface').style.display = 'flex';
    } else {
        alert("Нет активной игры. Начните новую!");
    }
}

// Плитка "О программе"
function openAbout() {
    openAppWindow();
    document.getElementById('app-title-text').innerText = "ИНФОРМАЦИЯ";
    document.getElementById('mode-selection').style.display = 'none';
    document.getElementById('game-interface').style.display = 'none';
    document.getElementById('about-interface').style.display = 'flex';
}

// --- ЛОГИКА КНОПКИ НАЗАД ---
function handleBackButton() {
    const gameInterface = document.getElementById('game-interface');
    const aboutInterface = document.getElementById('about-interface');
    const modeSelection = document.getElementById('mode-selection');
    
    // Проверка, находимся ли мы в режиме "Создания игры"
    const isCreateMode = document.getElementById('custom-word-input') !== null;

    // 1. Если мы в Создании игры -> Возврат в меню выбора
    if (isCreateMode) {
        restoreMenu();
        return;
    }

    // 2. Если мы в Игре -> Возврат в меню выбора
    if (gameInterface.style.display === 'flex') {
        gameInterface.style.display = 'none';
        modeSelection.style.display = 'flex';
        document.getElementById('app-title-text').innerText = "METRO WORDLE";
        return;
    }

    // 3. Если мы в "О программе" -> Закрываем приложение
    if (aboutInterface.style.display === 'flex') {
        closeApp();
        return;
    }

    // 4. Если мы в Меню выбора -> Закрываем приложение
    if (modeSelection.style.display === 'flex') {
        closeApp();
        return;
    }
    
    // Страховка
    closeApp();
}

function closeApp() {
    document.getElementById('game-app').style.display = 'none';
    document.getElementById('about-interface').style.display = 'none';
    document.getElementById('game-interface').style.display = 'none';
    
    // Сброс хеша только если мы выходим на рабочий стол
    if (window.location.hash) {
        history.pushState("", document.title, window.location.pathname + window.location.search);
    }
}

function resetGame() {
    currentAttempt = 0;
    currentTile = 0;
    gameOver = false;
    document.getElementById('game-container').innerHTML = '';
    document.getElementById('message-area').innerText = '';
    
    document.querySelectorAll('.key').forEach(key => {
        key.className = key.className.replace(' correct', '').replace(' present', '').replace(' absent', '');
        key.style.background = "";
        key.style.opacity = "";
    });
}

// --- РЕЖИМЫ ИГРЫ ---

function startRandomMode() {
    resetGame();
    // Выбираем случайное слово
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
            
            <div id="create-actions">
                <button class="metro-btn-action" onclick="generateLink()">СОЗДАТЬ ССЫЛКУ</button>
            </div>

            <div id="link-result-area" style="display: none; width: 100%; display: flex; flex-direction: column; align-items: center;">
                <input type="text" id="share-link" class="link-box" readonly>
                <button class="metro-btn-action" onclick="copyLink()" style="margin-top: 20px; background: var(--metro-green);">СКОПИРОВАТЬ</button>
            </div>
        </div>
    `;
}

function restoreMenu() {
    document.getElementById('mode-selection').innerHTML = defaultModeSelectionHTML;
}

function generateLink() {
    const input = document.getElementById('custom-word-input');
    const word = input.value.trim().toUpperCase().replace(/[^А-ЯЁ]/g, '');
    
    if (word.length < 3) {
        alert("Слово должно быть не короче 3 букв!");
        return;
    }

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
    navigator.clipboard.writeText(linkInput.value).then(() => {
        alert("Ссылка скопирована!");
    });
}

// --- ИГРОВОЙ ПРОЦЕСС ---

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

    // Адаптация размера плиток для длинных слов
    let tileSize = 55;
    if (wordLength > 6) tileSize = 45;
    if (wordLength > 9) tileSize = 35;
    if (wordLength > 12) tileSize = 28;

    for (let i = 0; i < maxAttempts; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < wordLength; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile-game-cell';
            tile.id = `tile-${i}-${j}`;
            
            // Применяем размер
            tile.style.width = tileSize + 'px';
            tile.style.height = tileSize + 'px';
            tile.style.fontSize = (tileSize * 0.6) + 'px'; // Шрифт зависит от размера плитки
            
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

        if (index === 2) {
            rowDiv.appendChild(createKey("ENTER", "key-wide key-enter", submitGuess));
        }

        rowStr.split("").forEach(char => {
            const el = createKey(char, "", () => addLetter(char));
            el.id = `key-${char}`;
            rowDiv.appendChild(el);
        });

        if (index === 2) {
            rowDiv.appendChild(createKey("⌫", "key-wide key-back", deleteLetter));
        }
        kb.appendChild(rowDiv);
    });
}

function createKey(text, extraClass, action) {
    const el = document.createElement('div');
    el.className = `key ${extraClass}`;
    el.innerText = text;
    el.onclick = (e) => { 
        e.stopPropagation();
        if (!gameOver) action(); 
    };
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
        showMessage("Слово было: " + targetWord);
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
        if (guess[i] === targetWord[i]) {
            results[i] = 'correct';
            targetLetters[i] = null;
        }
    }

    for (let i = 0; i < targetWord.length; i++) {
        if (results[i] === 'absent' && targetLetters.includes(guess[i])) {
            results[i] = 'present';
            targetLetters[targetLetters.indexOf(guess[i])] = null;
        }
    }

    for (let i = 0; i < targetWord.length; i++) {
        const tile = rowTiles[i];
        const result = results[i];
        
        tile.classList.add(result);
        
        if (guess[i]) {
            const keyEl = document.getElementById(`key-${guess[i]}`);
            if (keyEl) {
                if (result === 'correct') {
                    keyEl.classList.remove('present', 'absent');
                    keyEl.classList.add('correct');
                } else if (result === 'present' && !keyEl.classList.contains('correct')) {
                    keyEl.classList.remove('absent');
                    keyEl.classList.add('present');
                } else if (result === 'absent' && !keyEl.classList.contains('correct') && !keyEl.classList.contains('present')) {
                    keyEl.classList.add('absent');
                }
            }
        }
    }
}

function showMessage(msg) {
    const area = document.getElementById('message-area');
    area.innerText = msg;
}