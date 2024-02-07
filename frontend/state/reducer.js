// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE } from '../state/action-types'

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
  return state
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  return state
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
