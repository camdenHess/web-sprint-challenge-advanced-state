import React from 'react'
import { connect } from 'react-redux'

export function Message({ infoMessage }) {
  return <div id="message">{infoMessage}</div>
}

const mapStateToProps = state => {
  return {
    infoMessage: state.infoMessage
  }
}

export default connect(mapStateToProps)(Message)