export const GET_PLAYER = 'GET_PLAYER';
export const GET_PLAYER_SUCCEED = 'GET_PLAYER_SUCCEED';
export const GET_PLAYER_FAILED = 'GET_PLAYER_FAILED';

export const getPlayer = ({id, region}) => {
  return {
    type: GET_PLAYER,
    selected: { id, region }
  }
}

export const getPlayerSucceed = (player) => {
  return {
    type: GET_PLAYER_SUCCEED,
    player
  }
}

export const getPlayerFailed = (error) => {
  return {
    type: GET_PLAYER_FAILED,
    error
  }
}