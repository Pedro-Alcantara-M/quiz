const initialState = { 
    qtd: Number || String,
    questions: [],
    answers: []
  }
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'Qtd':
        return { ...state, qtd: action.payload };
      case "Questions": {
        return {...state, questions: action.payload };
        }
      case "Answers": {
        return {...state, answers: action.payload };
        }
      default:
        return state;
    }
  }
  export {initialState, reducer}