import React,  {useState} from "react";
import { css } from 'emotion'
import { connect } from 'react-redux';

import { setScore } from '../../store/scores/actions';
import { ReactComponent as Logo } from '../../assets/loader.svg';

function HighScoresConnect({ setScore, scoresState }) {   
  const { loading, error, levels } = scoresState;
  const [inputValues, setInputValues] = useState(levels);

  const onChange = (e, scorerName, level) => {
    setInputValues({
    ...inputValues, 
    [level]: {
      ...inputValues[level],
      scores: {
        ...inputValues[level].scores,
        [scorerName]: e.target.value
      }
    }
  });
}

  const onSetScores = (e, scorerName, level) => {
    e.preventDefault();
    const newScore = inputValues[level].scores[scorerName];
    newScore && setScore(newScore, level, scorerName);
  } 
  return (
    <div className={styles.HighScoresStyle}>
      <ul className={styles.HighScoresListStyle}>
      {Object.keys(inputValues).map(level => (
        <li className={styles.HighScoresItemStyle} key={level}>
            <img className={styles.HighScoreImage}src={inputValues[level].imageUrl} alt="level image"/>
            <p className={styles.HighScoreOverlayStyle}>{level}</p>
              <ul className={styles.HighScoreListValues}>
              {Object.keys(inputValues[level].scores)
              .sort((a, b) => inputValues[level].scores[b] - inputValues[level].scores[a])
              .map(scorerName => (
                <li className={styles.HighScoreListValue} key={scorerName}>
                  <p>{scorerName}</p>
                  <form className={styles.Form} onSubmit={e => onSetScores(e, scorerName, level)}>
                    <input className={styles.Input}
                        type="text" 
                        placeholder="Update your high score"
                        value={inputValues[level].scores[scorerName]}
                        onChange={e => onChange(e, scorerName, level)} 
                        onBlur={e => onSetScores(e, scorerName, level)}
                        disabled={loading === level}/>
                    {loading === level && <Logo className={styles.logo}/>}
                    {error && <p>{error}</p>}      
                  </form>
                </li>
              ))}
              </ul>
        </li>
      ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
	scoresState: state.scores,
});

const mapDispatchToProps = { setScore };

const Search = connect(
	mapStateToProps,
	mapDispatchToProps
)(HighScoresConnect);

export default Search;

const styles = {
  HighScoresStyle: css`
    margin:0 auto;
    max-width: 80%;
  `,
  HighScoresListStyle: css`
    list-style: none;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    column-gap: 20px;
    row-gap: 20px;
  `,
  HighScoresItemStyle: css`
    display: flex;
    flex-direction: column;
    position: relative;
  `,
  HighScoreImage: css`
    width: 100%;
    height: 100%;
  `,
  HighScoreOverlayStyle: css`
    position: absolute;
    top: 10%;
    margin: 0;
    color: #ffffff;
    text-transform: capitalize;
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  `,
  HighScoreListValues: css`
    padding: 0;
    margin: 0;
  `,
  HighScoreListValue: css`
    list-style: none;
    border: 1px solid rgba(0,0,0,.125);
    display: flex;
    justify-content: space-between;
    padding: .75rem 1.25rem;
    &:nth-child(odd) {
      color: #0c5460;
      background-color: #bee5eb;
    }
    &:nth-child(even) {
      color: #004085;
      background-color: #b8daff;
      border-top: none;
    }
    > p {
      margin: 0;
      text-transform: capitalize;
      align-self: center;
    }
  `,
  Form: css`
    position: relative;
  `,
  Input: css`
    height:30px;
    outline: none;
    font-size: inherit;
    color: inherit;
    border: 1px solid rgba(0,0,0,.125);
    padding: 10px;
  `,
  logo: css`
    width: 24px;
    height: 24px;
    position: absolute;
    top: 3px;
    right: 10px;
  `,
}