import { connect } from 'react-redux'

function mapStateToProps(state) {
  if (!state || !state.routing || !state.app) return

  const pathname = state.routing.locationBeforeTransitions.pathname
  const page = pathname.split('/').slice(-1)[0]
  const base = pathname
    .split('/')
    .slice(0, -1)
    .join('/')

  const { code } = state.app.submission.status
  const { types, fetched } = state.app.edits

  const syntacticalValidityEditsExist =
    types.syntactical.edits.length !== 0 || types.validity.edits.length !== 0
  const qualityVerified =
    types.quality.verified || types.quality.edits.length === 0
  const macroVerified = types.macro.verified || types.macro.edits.length === 0

  return {
    page,
    base,
    code,
    fetched,
    syntacticalValidityEditsExist,
    qualityVerified,
    macroVerified
  }
}

export default component => {
  return connect(mapStateToProps)(component)
}

export { mapStateToProps }
