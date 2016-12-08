import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import HomeComponent from '../components/Home.jsx'

class HomeContainer extends Component {
  constructor(props) {
      super(props)
  }


  render() {
    return <HomeComponent {...this.props} />
  }
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
    viewInstitutions(e) {
      e.preventDefault()
      browserHistory.push('/institutions')
    }
  }
}

export default connect(mapStateToProps)(HomeContainer)