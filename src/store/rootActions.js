import * as searchActions from './search/actions'
import * as playerActions from './player/actions'
import * as scoresActions from './scores/actions'
import * as dungeonsActions from './dungeons/actions'
import { bindActionCreators } from 'redux'

const rootActions = dispatch => {
  return {
    searchActions: bindActionCreators(searchActions, dispatch),
    scoresActions: bindActionCreators(scoresActions, dispatch),
    playerActions: bindActionCreators(playerActions, dispatch),
    dungeonsActions: bindActionCreators(dungeonsActions, dispatch),
  }
}

export default rootActions