import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchSignature from '../actions/fetchSignature.js'
import SubmissionReceipt from '../components/SubmissionReceipt.jsx'

export class SubmissionReceiptContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!this.props.isFetching && this.props.receipt === null)
      this.props.dispatch(fetchSignature())
  }

  render() {
    return <SubmissionReceipt {...this.props} />
  }
}

export function mapStateToProps(state) {
  const { isFetching, timestamp, receipt } = state.app.signature

  const { status } = state.app.submission
  const { email } = state.app.user.oidc.profile

  const { filingPeriod } = state.app

  return {
    isFetching,
    timestamp,
    receipt,
    status,
    filingPeriod,
    email
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  SubmissionReceiptContainer
)
