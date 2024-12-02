const questions = [
  { question: "What is the capital of France?", choices: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
  { question: "What is the highest mountain in the world?", choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"], answer: "Everest" },
  { question: "What is the largest country by area?", choices: ["Russia", "China", "Canada", "United States"], answer: "Russia" },
  { question: "Which is the largest planet in our solar system?", choices: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" },
  { question: "What is the capital of Canada?", choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"], answer: "Ottawa" },
];

const progressKey = 'quizProgress';
const scoreKey = 'quizScore';

window.onload = () => {
  loadProgress();
  displayQuestions();
};

function displayQuestions() {
  const questionsDiv = document.getElementById('questions');
  questionsDiv.innerHTML = '';
  
  questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `
      <h3>${question.question}</h3>
      <ul>
        ${question.choices.map(choice => `
          <li>
            <label>
              <input type="radio" name="q${index}" value="${choice}">
              ${choice}
            </label>
          </li>
        `).join('')}
      </ul>
    `;
    questionsDiv.appendChild(questionDiv);
  });

  applySavedSelections();
}

function saveProgress() {
  const progress = {};
  questions.forEach((_, index) => {
    const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
    if (selectedOption) {
      progress[`q${index}`] = selectedOption.value;
    }
  });
  sessionStorage.setItem(progressKey, JSON.stringify(progress));
}

function loadProgress() {
  const savedProgress = sessionStorage.getItem(progressKey);
  return savedProgress ? JSON.parse(savedProgress) : {};
}

function applySavedSelections() {
  const progress = loadProgress();
  for (const key in progress) {
    const radio = document.querySelector(`input[name="${key}"][value="${progress[key]}"]`);
    if (radio) {
      radio.checked = true;
    }
  }
}

function submitQuiz() {
  let score = 0;
  questions.forEach((question, index) => {
    const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
    if (selectedOption && selectedOption.value === question.answer) {
      score++;
    }
  });

  const scoreDiv = document.getElementById('score');
  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem(scoreKey, score);
}

document.getElementById('submit').addEventListener('click', () => {
  submitQuiz();
});

// Save progress on option change
document.addEventListener('change', saveProgress);
