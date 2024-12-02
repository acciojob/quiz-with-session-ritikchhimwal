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
  const savedProgress = sessionStorage.getItem(progressKey);
  displayQuestions();
  if (savedProgress) {
    loadProgress(JSON.parse(savedProgress));
  }
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
          </li>`).join('')}
      </ul>
    `;
    questionsDiv.appendChild(questionDiv);
  });
}

function saveProgress() {
  const selectedOptions = {};
  questions.forEach((_, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected) {
      selectedOptions[`q${index}`] = selected.value;
    }
  });
  sessionStorage.setItem(progressKey, JSON.stringify(selectedOptions));
}

function loadProgress(progress) {
  Object.keys(progress).forEach(key => {
    const radio = document.querySelector(`input[name="${key}"][value="${progress[key]}"]`);
    if (radio) {
      radio.checked = true; // This reflects in the DOM
      radio.setAttribute('checked', 'true'); // Explicitly sets the checked attribute
    }
  });
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
  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}`;

  // Store the score in local storage
  localStorage.setItem(scoreKey, score);
}

const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', () => {
  submitButton.disabled = true; // Disable the button to prevent multiple submissions
  submitQuiz();
});

// Save progress on every change
document.addEventListener('change', saveProgress);
