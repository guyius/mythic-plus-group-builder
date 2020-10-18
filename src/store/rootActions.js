import * as scoresActions from './scores/actions'
import { bindActionCreators } from 'redux'

const rootActions = dispatch => {
  return {
    scoresActions: bindActionCreators(scoresActions, dispatch),
  }
}

export default rootActions