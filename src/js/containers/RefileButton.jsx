import React, { Component } from 'react'
import { connect } from 'react-redux'
import RefileButton from '../components/RefileButton.jsx'
import showConfirm from '../actions/showConfirm.js'
import setInstitution from '../actions/setInstitution.js'

class RefileButtonContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <RefileButton {...this.props} />
  }
}

function mapDispatchToProps(dispatch) {
  const showConfirmModal = () => {
    dispatch(showConfirm())
  }

  const updateInstitution = institution => {
    dispatch(setInstitution(institution))
  }

  return { showConfirmModal, updateInstitution }
}

export default connect(null, mapDispatchToProps)(RefileButtonContainer)
export { RefileButtonContainer, mapDispatchToProps }
