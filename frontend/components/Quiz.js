import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Quiz({ fetchQuiz, selectAnswer, quiz, selectedAnswer, postAnswer }) {
  useEffect(() => {
    fetchQuiz()
  },[])

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={selectedAnswer === quiz.answers[0].answer_id ? 'answer selected' : 'answer'}>
                {quiz.answers[0].text}
                <button onClick={() => selectAnswer(quiz.answers[0].answer_id)}>
                  {selectedAnswer === quiz.answers[0].answer_id ? 'SELECTED' : 'select'}
                </button>
              </div>

              <div className={selectedAnswer === quiz.answers[1].answer_id ? 'answer selected' : 'answer'}>
              {quiz.answers[1].text}
                <button onClick={() => selectAnswer(quiz.answers[1].answer_id)}>
                {selectedAnswer === quiz.answers[1].answer_id ? 'SELECTED' : 'select'}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" disabled={!selectedAnswer} onClick={() => postAnswer(quiz, selectedAnswer)}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  }
}

export default connect(mapStateToProps, actionCreators)(Quiz)
