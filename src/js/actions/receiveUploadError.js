import * as types from '../constants'

export default function receiveUploadError(error) {
  return (dispatch, getState) => {
    return dispatch({
      type: types.RECEIVE_UPLOAD_ERROR,
      error,
      id: getState().app.institution.id
    })
  }
}
