const questions = [
    {
        question: "Сега знам, че ти умираш да дадеш на мен (Мишо пича) своят номер,но ще трбява първо да отговориш на няколко въпроса",
        choices: ["Уфф, какви са тези глупости сега🙄", "Гледай си работата, глупак", "Добре,айде да видим", "Не искам да отговарям"],
        answer: "Добре,айде да видим"
    },
    {
        question: "Колко е готин Мишо, по прякор ''Мишо пича'' ?",
        choices: ["Мии става", "Колко пък да е готин", "Доста,ама само аз мисля така", "Само от прякора става ясно"],
        answer: "Само от прякора става ясно"
    },
    {
        question: "В кой квартал в София, се води Мишо пича по лична карта?",
        choices: ["Люлин бате 💪🏻", "Младост 🤮", "Надежда 🏳️‍🌈", "Красно село ☠️"],
        answer: "Красно село ☠️"
    },
    {
        question: "И сега за пълнеж, най-basic въпроса, кой е любимият цвят на Мишо?",
        choices: ["Синьо, Левски 💙", "Тъмно Зелено, като очите му 👀", "Червено като, любимият цвят на момичето което чете това", "Розово, защото в гей 😩"],
        answer: "Тъмно Зелено, като очите му 👀"
    },
    {
        question: "Браво, стигна до тук, сигурен съм че ти е било много ама много сложно. Както и да е, това е последният...Колко си развълнувана за уикенда?",
        choices: ["Какво ще има уикенда?", "Много, все пак ще идва известна личност в града ми.", "Не съм, имам да пиша домашни", "Не може да ме накараш да се вълнувам толкова лесно."],
        answer: "Не може да ме накараш да се вълнувам толкова лесно."
    }
];

const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// CONSTANTS
const MAX_QUESTIONS = 5;

// Initialize the game
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

// Get a new question
getNewQuestion = () => {
    if (questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // Go to the end page or perform any other action when all questions are answered
        return window.location.assign('./end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    // Get the current question
    currentQuestion = availableQuestions[questionCounter - 1];
    question.innerText = currentQuestion.question;

    // Display choices for the current question
    choices.forEach((choice, index) => {
        choice.innerText = currentQuestion.choices[index];
    });

    // Enable accepting answers for the new question
    acceptingAnswers = true;
};

// Handle click on a choice
// Handle click on a choice
choices.forEach((choice, index) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.innerText;

        if (selectedAnswer === currentQuestion.answer) {
            // Increment score and proceed to the next question for a correct answer
            incrementScore();
            setTimeout(getNewQuestion, 100);
        } else {
            // Display feedback or perform any other action for a wrong answer
            console.log("Incorrect answer! Please try again.");
            // Reset acceptingAnswers to true to allow trying again
            acceptingAnswers = true;
        }
    });
});

// Increment the score
incrementScore = () => {
    score++;
    scoreText.innerText = score;
};

// Start the game when the page loads
startGame();
