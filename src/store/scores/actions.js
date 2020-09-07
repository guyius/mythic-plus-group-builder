export const SET_SCORE = 'SET_SCORE';
export const SCORE_SUCCEED = 'SCORE_SUCCEED';
export const SCORE_FAILED = 'SCORE_FAILED';

export const setScore = (level, scores) => {
  return {
    type: SET_SCORE,
    level,
    scores
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