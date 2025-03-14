console.log("Script loaded!"); // Debugging: Check if script is running

// Array to store flashcards
let flashcards = [];

// Get DOM elements
const flashcardForm = document.getElementById('flashcard-form');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const flashcardList = document.getElementById('flashcard-list');
const startQuizButton = document.getElementById('start-quiz');
const quizContainer = document.getElementById('quiz-container');
const quizQuestion = document.getElementById('quiz-question');
const quizAnswer = document.getElementById('quiz-answer');
const submitAnswerButton = document.getElementById('submit-answer');
const quizFeedback = document.getElementById('quiz-feedback');
const quizizzLinkInput = document.getElementById('quizizz-link');
const importQuizizzButton = document.getElementById('import-quizizz');

// Add a new flashcard
flashcardForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from submitting
  const question = questionInput.value;
  const answer = answerInput.value;

  if (question && answer) {
    flashcards.push({ question, answer });
    displayFlashcards();
    questionInput.value = '';
    answerInput.value = '';
  } else {
    alert('Please fill in both the question and answer fields.');
  }
});

// Display all flashcards
function displayFlashcards() {
  flashcardList.innerHTML = '';
  flashcards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('flashcard');
    cardElement.innerHTML = `
      <p><strong>Q:</strong> ${card.question}</p>
      <p><strong>A:</strong> ${card.answer}</p>
      <button onclick="deleteFlashcard(${index})">Delete</button>
    `;
    flashcardList.appendChild(cardElement);
  });
}

// Delete a flashcard
function deleteFlashcard(index) {
  flashcards.splice(index, 1);
  displayFlashcards();
}

// Start the quiz
startQuizButton.addEventListener('click', () => {
  if (flashcards.length === 0) {
    alert('Add some flashcards first!');
    return;
  }
  quizContainer.style.display = 'block';
  startQuizButton.style.display = 'none';
  showNextQuestion();
});

// Show the next question
function showNextQuestion() {
  const randomIndex = Math.floor(Math.random() * flashcards.length);
  const currentCard = flashcards[randomIndex];
  quizQuestion.textContent = currentCard.question;
  quizAnswer.value = '';
  quizFeedback.textContent = '';
}

// Check the user's answer
submitAnswerButton.addEventListener('click', () => {
  const userAnswer = quizAnswer.value.trim().toLowerCase();
  const currentCard = flashcards.find(card => card.question === quizQuestion.textContent);

  if (userAnswer === currentCard.answer.toLowerCase()) {
    quizFeedback.textContent = 'Correct! 🎉';
    quizFeedback.style.color = 'green';
  } else {
    quizFeedback.textContent = `Incorrect. The correct answer is: ${currentCard.answer}`;
    quizFeedback.style.color = 'red';
  }

  setTimeout(showNextQuestion, 2000); // Show next question after 2 seconds
});

// Import from Quizizz
importQuizizzButton.addEventListener('click', () => {
  const link = quizizzLinkInput.value.trim();
  if (!link) {
    alert('Please paste a Quizizz link.');
    return;
  }

  // Simulate importing flashcards (replace with actual logic)
  const importedFlashcards = [
    { question: 'What is 2 + 2?', answer: '4' },
    { question: 'What is the capital of France?', answer: 'Paris' },
  ];

  importedFlashcards.forEach(card => flashcards.push(card));
  displayFlashcards();
  quizizzLinkInput.value = '';
});
