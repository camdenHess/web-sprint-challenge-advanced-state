// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE } from '../state/action-types'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  let num = state;
  switch(action.type) {

    case MOVE_CLOCKWISE:
      if (state === 5) num = 0
       else num++
      return num

    case MOVE_COUNTERCLOCKWISE:
      if (state === 0) num = 5
        else num--
      return num

    default:
      return state
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch(action.type) {

    case SET_QUIZ_INTO_STATE:
      return action.payload
      
    default:
      return state
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type) {

    case SET_SELECTED_ANSWER:
      return action.payload

    default:
      return state
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type) {

    case SET_INFO_MESSAGE:
      return action.payload

    default:
      return state
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type) {

    case INPUT_CHANGE:
      return {...state, [action.payload]: action.value}

    default:
      return state
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
