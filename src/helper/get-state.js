
const questions = JSON.parse(localStorage.getItem('Questions'));

 const shuffleArray = (answers) => {
    // Loop em todos os elementos
    for (let i = answers?.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
        const j = Math.floor(Math.random() * (i + 1));
        // Reposicionando elemento
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

const setupAnswer = (currentIndex) => {
  let answerArr = questions[currentIndex]?.incorrect_answers

  const correctAnswer = questions[currentIndex]?.correct_answer
  answerArr?.push(correctAnswer)

  shuffleArray(answerArr)
      return answerArr
  }

const getState = (dispatch, currentIndex) => {
    dispatch({ type: 'Questions', payload: questions });
    dispatch({ type: "Answers", payload:  setupAnswer(currentIndex)});
}

export {getState}