const questions = [
  { question: "What is the capital of France?", choices: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
  { question: "What is the highest mountain in the world?", choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"], answer: "Everest" },
  { question: "What is the largest country by area?", choices: ["Russia", "China", "Canada", "United States"], answer: "Russia" },
  { question: "Which is the largest planet in our solar system?", choices: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" },
  { question: "What is the capital of Canada?", choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"], answer: "Ottawa" },
];

// Load progress from session storage
const savedProgress = JSON.parse(sessionStorage.getItem('progress')) || {};

// Render questions
const questionsDiv = document.getElementById('questions');
questions.forEach((q, index) => {
  const questionDiv = document.createElement('div');
  questionDiv.classList.add('question');

  const questionText = document.createElement('h3');
  questionText.textContent = q.question;
  questionDiv.appendChild(questionText);

  q.choices.forEach(choice => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `question-${index}`;
    input.value = choice;
    input.checked = savedProgress[`question-${index}`] === choice;

    input.addEventListener('change', () => {
      savedProgress[`question-${index}`] = choice;
      sessionStorage.setItem('progress', JSON.stringify(savedProgress));
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(choice));
    questionDiv.appendChild(label);
  });

  questionsDiv.appendChild(questionDiv);
});

// Submit quiz
document.getElementById('submit').addEventListener('click', () => {
  let score = 0;
  
  questions.forEach((q, index) => {
    if (savedProgress[`question-${index}`] === q.answer) {
      score++;
    }
  });

  document.getElementById('score').textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem('score', score);
});
