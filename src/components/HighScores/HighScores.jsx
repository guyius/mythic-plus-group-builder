import React,  {useState} from "react";
import { css } from 'emotion'
import { connect } from 'react-redux';

import { setScore } from '../../store/scores/actions';

function HighScoresConnect({ setScore, scoresState }) {   
  const { loading, error, levels } = scoresState;
  const [inputValue, setInputValue] = useState("");

  const onChange = (e) => setInputValue(e.target.value);
  const onSetScores = (e) => {
    e.preventDefault();
    inputValue && setScore(inputValue);
  } 
  return (
    <div className={styles.HighScoresStyle}>
      <ul className={styles.HighScoresListStyle}>
      {levels && levels.length > 0 && levels.map(level => (
        <li className={styles.HighScoresItemStyle} key={level.name}>
            <img className={styles.HighScoreImage}src={level.imageUrl} alt="level image"/>
            <p className={styles.HighScoreOverlayStyle}>{level.name}</p>
              <ul className={styles.HighScoreListValues}>
              {level.scores.map(score => (
                <li className={styles.HighScoreListValue} key={score.name}>
                  <p>{score.name}</p>
                  <form onSubmit={onSetScores}>
                    <input className={styles.input}
                        type="number" 
                        placeholder="Update your high score"
                        value={score.score}
                        onChange={onChange} 
                        onBlur={onSetScores}/>
                    {loading && <Logo className={styles.logo}/>}
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
    top: 50%;
    transform: translate(0,  -50%);
    margin: 0;
    color: #ffffff;
    cursor: pointer;
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
    }
  `,
  Input: css`
    height:30px;
    outline: none;
    font-size: inherit;
    color: inherit;
    border: 1px solid rgba(0,0,0,.125);
  `
}
      