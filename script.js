const questions = [
  { question: "What is the capital of France?", choices: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
  { question: "What is the highest mountain in the world?", choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"], answer: "Everest" },
  { question: "What is the largest country by area?", choices: ["Russia", "China", "Canada", "United States"], answer: "Russia" },
  { question: "Which is the largest planet in our solar system?", choices: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" },
  { question: "What is the capital of Canada?", choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"], answer: "Ottawa" },
];

const questionsElement = document.getElementById('questions');
const submitButton = document.getElementById('submit');
const scoreDisplay = document.getElementById('score');

// Retrieve user progress from session storage
const userAnswers = JSON.parse(sessionStorage.getItem('progress')) || {};

function renderQuestions() {
  questionsElement.innerHTML = ''; // Clear any existing questions
  questions.forEach((question, i) => {
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `<p>${question.question}</p>`;
    question.choices.forEach(choice => {
      const choiceElement = document.createElement('input');
      choiceElement.type = 'radio';
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }
      choiceElement.addEventListener('change', () => {
        userAnswers[i] = choice;
        sessionStorage.setItem('progress', JSON.stringify(userAnswers));
      });
      questionDiv.appendChild(choiceElement);
      questionDiv.appendChild(document.createTextNode(choice));
    });
    questionsElement.appendChild(questionDiv);
  });
}

function calculateScore() {
  let score = 0;
  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });
  return score;
}

submitButton.addEventListener('click', () => {
  const score = calculateScore();
  localStorage.setItem('score', score);
  scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;
});

renderQuestions();
