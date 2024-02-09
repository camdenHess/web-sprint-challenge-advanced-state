// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios'
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM
} from './action-types'

export function moveClockwise() {
  return({type: MOVE_CLOCKWISE})
}

export function moveCounterClockwise() {
  return({type: MOVE_COUNTERCLOCKWISE})
}

export function selectAnswer(answer_id) {
  return({type: SET_SELECTED_ANSWER, payload: answer_id})
}

export function setMessage(message) {
  return({type: SET_INFO_MESSAGE, payload: message})
}

export function setQuiz(quiz) {
  return({type: SET_QUIZ_INTO_STATE, payload: quiz})
}

export function inputChange(id, value) {
  return({type: INPUT_CHANGE, payload: id, value})
}

export function resetForm() {
  return({type: RESET_FORM})
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        dispatch(setQuiz(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export function postAnswer(quiz, selectedAnswer) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    const submitAnswer = {
      quiz_id: quiz.quiz_id,
      answer_id: selectedAnswer
    }
    axios.post('http://localhost:9000/api/quiz/answer', submitAnswer)
      .then(res => {
        console.log(res.data.message)
        dispatch(selectAnswer(null))
        dispatch(setMessage(res.data.message))
        dispatch(fetchQuiz())
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export function postQuiz(form) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    const submitQuiz = {
      question_text: form.newQuestion,
      true_answer_text: form.newTrueAnswer,
      false_answer_text: form.newFalseAnswer
    }
    axios.post('http://localhost:9000/api/quiz/new', submitQuiz)
      .then(() => {
        dispatch(setMessage(`Congrats: "${submitQuiz.question_text}" is a great question!`))
        dispatch(resetForm())
      })
      .catch(err => {
        console.log(err)
      })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state