import React from 'react'
import { connect } from 'react-redux'

const Success = ({ message }) => <p>{message}</p>

const mapStateToProps = ({ error, isLoading, message }) => ({
  error,
  isLoading,
  message
})
export default connect(
  mapStateToProps,
  {}
)(Success)
