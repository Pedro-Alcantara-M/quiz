const initialState = {
  qtd: Number || String,
  questions: [],
  userAnswers: {},
  score: Number || String,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'Qtd':
      return { ...state, qtd: action.payload };
    case "Questions": {
      return { ...state, questions: action.payload };
    }
    case "UserAnswers": {
      return { ...state, userAnswers: action.payload };
    }
    case "Score": {
      return { ...state, score: action.payload };
    }
    case "Difficulty": {
      return { ...state, level: action.payload };
    }
    default:
      return state;
  }
}
export { initialState, reducer }