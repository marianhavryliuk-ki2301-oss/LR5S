
function fahrenheitToCelsius(f) {
    return 5 / 9 * (f - 32);
}

function celsiusToFahrenheit(c) {
    return c * 9 / 5 + 32;
}

function round2(x) {
    return Math.round(x * 100) / 100;
}

function onFahrenheitChange() {
    const fahr = document.getElementById("fahr");
    const cels = document.getElementById("cels");
    const value = parseFloat(fahr.value.replace(",", "."));
    cels.value = isNaN(value) ? "" : round2(fahrenheitToCelsius(value));
}

function onCelsiusChange() {
    const fahr = document.getElementById("fahr");
    const cels = document.getElementById("cels");
    const value = parseFloat(cels.value.replace(",", "."));
    fahr.value = isNaN(value) ? "" : round2(celsiusToFahrenheit(value));
}

function initTask1() {

    document.getElementById("fahr").addEventListener("input", onFahrenheitChange);
    document.getElementById("cels").addEventListener("input", onCelsiusChange);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = randomInt(0, i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function scoreText(correct, total) {
    const percent = total === 0 ? 0 : Math.round(correct / total * 100);
    return `Загальний рахунок ${percent}% (${correct} правильних відповідей з ${total})`;
}

const quiz2 = { a: 0, b: 0, correct: 0, total: 0, answered: true };

function newTask2() {
    quiz2.a = randomInt(2, 9);
    quiz2.b = randomInt(2, 9);
    quiz2.answered = false;
    document.getElementById("question2").textContent = `${quiz2.a} × ${quiz2.b} =`;
    document.getElementById("answer2").value = "";
    document.getElementById("result2").textContent = "";
    document.getElementById("answer2").focus();
}

function checkTask2() {
    if (quiz2.answered) return;        
    const input = document.getElementById("answer2");
    const result = document.getElementById("result2");
    if (input.value.trim() === "") {
        result.textContent = "Введіть відповідь";
        result.className = "bad";
        return;
    }
    const right = quiz2.a * quiz2.b;
    quiz2.answered = true;
    quiz2.total++;
    if (Number(input.value) === right) {
        quiz2.correct++;
        result.textContent = "Правильно!";
        result.className = "ok";
    } else {
        result.textContent = `Помилка, правильна відповідь «${right}»`;
        result.className = "bad";
    }
    document.getElementById("score2").textContent = scoreText(quiz2.correct, quiz2.total);
}

function initTask2() {
    document.getElementById("next2").addEventListener("click", newTask2);
    document.getElementById("check2").addEventListener("click", checkTask2);
    document.getElementById("answer2").addEventListener("keydown", e => {
        if (e.key === "Enter") checkTask2();
    });
    document.getElementById("score2").textContent = scoreText(0, 0);
    newTask2();
}

const quiz3 = { right: 0, correct: 0, total: 0, answered: true };

function generateOptions(right) {
    const options = new Set([right]);
    while (options.size < 4) {
        const wrong = randomInt(2, 9) * randomInt(2, 9);
        options.add(wrong);
    }
    return shuffle([...options]);
}

function newTask3() {
    const a = randomInt(2, 9);
    const b = randomInt(2, 9);
    quiz3.right = a * b;
    quiz3.answered = false;

    document.getElementById("question3").textContent = `${a} × ${b} =`;
    document.getElementById("result3").textContent = "";

    const box = document.getElementById("radioOptions");
    box.innerHTML = "";
    generateOptions(quiz3.right).forEach(value => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer3";
        radio.value = value;
        radio.addEventListener("change", onRadioChange);
        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + value));
        box.appendChild(label);
    });
}

function onRadioChange(e) {
    if (quiz3.answered) return;                 
    quiz3.answered = true;
    quiz3.total++;

    const result = document.getElementById("result3");
    if (Number(e.target.value) === quiz3.right) {
        quiz3.correct++;
        result.textContent = "Правильно!";
        result.className = "ok";
    } else {
        result.textContent = `Помилка, правильна відповідь «${quiz3.right}»`;
        result.className = "bad";
    }
    document.querySelectorAll("#radioOptions input").forEach(r => r.disabled = true);
    document.getElementById("score3").textContent = scoreText(quiz3.correct, quiz3.total);
}

function initTask3() {
    document.getElementById("next3").addEventListener("click", newTask3);
    document.getElementById("score3").textContent = scoreText(0, 0);
    newTask3();
}

let imagesArray = [
    {
        path: '001.jpg',
        title: 'Dodge Challenger',
        description: 'Спорткар у підземному паркінгу'
    },
    {
        path: '002.jpg',
        title: 'BMW M5',
        description: 'Седан бізнес-класу з M-пакетом'
    },
    {
        path: '003.jpg',
        title: 'Mercedes-AMG G 63',
        description: 'Повнорозмірний позашляховик'
    }
];

function initPhotoRotator(containerId, images) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    let current = 0;

    const counter = document.createElement("div");
    counter.style.gridColumn = "2";
    counter.style.gridRow = "1";
    counter.style.textAlign = "center";
    counter.style.padding = "6px";
    counter.style.borderBottom = "1px solid #ddd";
    counter.style.fontSize = "14px";

    const prev = document.createElement("a");
    prev.textContent = "Назад";
    prev.style.gridColumn = "1";
    prev.style.gridRow = "2";
    prev.style.alignSelf = "center";
    prev.style.textAlign = "center";

    const imgBox = document.createElement("div");
    imgBox.style.gridColumn = "2";
    imgBox.style.gridRow = "2";
    imgBox.style.display = "flex";
    imgBox.style.alignItems = "center";
    imgBox.style.justifyContent = "center";
    imgBox.style.overflow = "hidden";
    imgBox.style.background = "#f5f5f5";

    const img = document.createElement("img");
    img.style.maxWidth = "100%";
    img.style.maxHeight = "100%";
    img.style.objectFit = "contain";
    imgBox.appendChild(img);

    const next = document.createElement("a");
    next.textContent = "Вперед";
    next.style.gridColumn = "3";
    next.style.gridRow = "2";
    next.style.alignSelf = "center";
    next.style.textAlign = "center";

    const caption = document.createElement("div");
    caption.style.gridColumn = "2";
    caption.style.gridRow = "3";
    caption.style.textAlign = "center";
    caption.style.padding = "6px";
    caption.style.borderTop = "1px solid #ddd";
    caption.style.fontSize = "14px";
    caption.style.minHeight = "40px";

    const titleEl = document.createElement("div");
    titleEl.style.fontWeight = "bold";
    const descEl = document.createElement("div");
    caption.appendChild(titleEl);
    caption.appendChild(descEl);

    container.appendChild(counter);
    container.appendChild(prev);
    container.appendChild(imgBox);
    container.appendChild(next);
    container.appendChild(caption);

    function show() {
        const item = images[current];
        counter.textContent = `Фотографія ${current + 1} з ${images.length}`;
        img.src = item.path;
        img.alt = item.title;
        titleEl.textContent = item.title;
        descEl.textContent = item.description;

        prev.style.visibility = current === 0 ? "hidden" : "visible";
        next.style.visibility = current === images.length - 1 ? "hidden" : "visible";
    }

    prev.addEventListener("click", () => { if (current > 0) { current--; show(); } });
    next.addEventListener("click", () => { if (current < images.length - 1) { current++; show(); } });

    show();
}

const DIGIT_FONT = {
    0: ["111", "101", "101", "101", "111"],
    1: ["010", "110", "010", "010", "111"],
    2: ["111", "001", "111", "100", "111"],
    3: ["111", "001", "111", "001", "111"],
    4: ["101", "101", "111", "001", "001"],
    5: ["111", "100", "111", "001", "111"],
    6: ["111", "100", "111", "101", "111"],
    7: ["111", "001", "010", "010", "010"],
    8: ["111", "101", "111", "101", "111"],
    9: ["111", "101", "111", "001", "111"]
};

function generateCaptchaNumber(count) {
    let s = "";
    for (let i = 0; i < count; i++) s += randomInt(0, 9);
    return s;
}

function drawCaptcha(container, number) {
    container.innerHTML = "";
    const pixel = 8;   
    for (const digit of number) {
        const digitBox = document.createElement("div");
        digitBox.style.display = "inline-grid";
        digitBox.style.gridTemplateColumns = `repeat(3, ${pixel}px)`;
        digitBox.style.marginRight = `${pixel}px`;
        DIGIT_FONT[digit].forEach(row => {
            for (const bit of row) {
                const span = document.createElement("span");
                span.style.display = "block";
                span.style.width = `${pixel}px`;
                span.style.height = `${pixel}px`;
                span.style.background = bit === "1" ? "red" : "white";
                digitBox.appendChild(span);
            }
        });
        container.appendChild(digitBox);
    }
}

function initCaptcha(count, containerId) {
    const root = document.getElementById(containerId);
    root.innerHTML = "";
    let code = "";

    const display = document.createElement("div");
    display.style.border = "2px solid #bbb";
    display.style.padding = "6px";
    display.style.display = "inline-block";
    display.style.background = "white";

    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = count;
    input.style.display = "block";
    input.style.marginTop = "4px";
    input.style.width = "150px";

    const message = document.createElement("div");
    message.style.marginTop = "4px";
    message.style.minHeight = "24px";

    const refresh = document.createElement("button");
    refresh.textContent = "Оновити";

    function generate() {
        code = generateCaptchaNumber(count);
        drawCaptcha(display, code);
        input.value = "";
        message.textContent = "";
    }

    function check() {
        if (input.value.length < count) {
            message.textContent = "";
            return;
        }
        if (input.value === code) {
            message.textContent = "Правильно";
            message.style.color = "green";
        } else {
            message.textContent = "Помилка";
            message.style.color = "red";
        }
    }

    input.addEventListener("input", check);
    refresh.addEventListener("click", generate);

    root.appendChild(display);
    root.appendChild(input);
    root.appendChild(message);
    root.appendChild(refresh);

    generate();
}

initTask1();
initTask2();
initTask3();
initPhotoRotator('rotator', imagesArray);
initCaptcha(4, 'captcha');