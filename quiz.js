fetch('questions.json')
    .then(response => response.json())
    .then(questions => {
        const quizContainer = document.getElementById('quiz');

        // Utility function to shuffle an array
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        // Dynamically create quiz
        questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question-container');
            questionDiv.innerHTML = `<p class="question">${index + 1}. ${question.question}</p>`;

            // Shuffle options
            const shuffledOptions = [...question.options];
            shuffleArray(shuffledOptions);

            shuffledOptions.forEach((option, optIndex) => {
                const optionElem = document.createElement('label');
                optionElem.classList.add('option-label');
                optionElem.innerHTML = `
                    <input type="radio" name="question${index}" data-correct="${option.correct}">
                    ${option.text}
                `;
                questionDiv.appendChild(optionElem);
            });

            // Placeholder for result message
            const resultMessage = document.createElement('p');
            resultMessage.classList.add('result-message');
            questionDiv.appendChild(resultMessage);

            quizContainer.appendChild(questionDiv);
        });

        // Submit button
        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Submit';
        submitBtn.classList.add('submit-button');
        submitBtn.addEventListener('click', () => {
            const allQuestions = document.querySelectorAll('.question-container');

            allQuestions.forEach((questionDiv, index) => {
                const selectedOption = questionDiv.querySelector(`input[name="question${index}"]:checked`);
                const resultMessage = questionDiv.querySelector('.result-message');
                resultMessage.style.display = 'block';

                // Highlight the correct answer
                const allOptions = questionDiv.querySelectorAll('input[type="radio"]');
                allOptions.forEach(option => {
                    const parentLabel = option.parentElement;
                    if (option.getAttribute('data-correct') === 'true') {
                        parentLabel.classList.add('correct-answer'); // Add highlight for correct answer
                    }
                });

                if (selectedOption) {
                    const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
                    resultMessage.textContent = isCorrect ? 'Correct!' : 'Wrong!';
                    resultMessage.classList.add(isCorrect ? 'correct' : 'wrong');
                } else {
                    resultMessage.textContent = 'No answer selected!';
                    resultMessage.classList.add('wrong');
                }
            });
        });

        quizContainer.appendChild(submitBtn);
    })
    .catch(error => console.error('Error loading quiz:', error));
