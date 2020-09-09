export const SET_SCORE = 'SET_SCORE';
export const SCORE_SUCCEED = 'SCORE_SUCCEED';
export const SCORE_FAILED = 'SCORE_FAILED';

export const setScore = (newScore, level, player) => {
  return {
    type: SET_SCORE,
    level,
    player,
    newScore
  }
}

export const scoreSucceed = () => {
  return {
    type: SCORE_SUCCEED
  }
}

export const scoreFailed = () => {
  return {
    type: SCORE_FAILED
  }
}