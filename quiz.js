const fs = require('fs');
const { JSDOM } = require('jsdom');


const questions = [
    {
        question: "Which of the following is a client site language ?",
        answer:[
            { text: "Java", correct: false },
            { text: "c", correct: false },
            { text: "python", correct: false },
            { text: "javascript", correct: true },

        ]
    },
    {
    question: " Which keyword is used to define constant in java?",
        answer:[
            { text: "final", correct: true },
            { text: "const", correct: false },
            { text: "static", correct: false },
            { text: "constant", correct:false },

        ]
    },
    {
        question: " What is the parent class of all classes in Java?",
            answer:[
                { text: "object", correct: true },
                { text: "main", correct: false },
                { text: "super", correct: false },
                { text: "none of the above", correct:false },
    
            ]
        }
];

const htmlContent = fs.readFileSync(__dirname + "/quiz.html", 'utf-8');

// Create a virtual DOM
const dom = new JSDOM(htmlContent);
const { document } = dom.window;

const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const questionElement = document.getElementById("question");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Try Again';
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})


startQuiz();
