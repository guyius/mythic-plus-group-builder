import React,  { useState } from "react";
import { css } from 'emotion'
import { connect } from 'react-redux';

import { setScore } from '../../store/scores/actions';
import { ReactComponent as Logo } from '../../assets/loader.svg';

function BeatSaberConnect({ setScore, scoresState }) {   
  const { loading, error, levels } = scoresState;
  const [inputValues, setInputValues] = useState(levels);
  const filters = ["All", "Tony Hawk 1", "Tony Hawk 2"];
  const [currentFilter, setCurrentFilter] = useState(filters[0]);
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
      <div className={styles.FiltersBox}>        
        <ul className={styles.FiltersList}>
          <li>Filter by game</li>
          {filters.map(filter => (
            <li key={filter}>
              <label>
              <input type="radio" 
                value={filter} 
                onChange={() => setCurrentFilter(filter)}
                checked={currentFilter === filter}/>
                {filter}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <ul className={styles.HighScoresListStyle}>
      {Object.keys(inputValues).map(level => (        
        currentFilter !== "All" && inputValues[level].game !== currentFilter ? null :
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

const BeatSaber = connect(
	mapStateToProps,
	mapDispatchToProps
)(BeatSaberConnect);

export default BeatSaber;

const styles = {
  HighScoresStyle: css`
    margin:0 auto;
    max-width: 90%;
  `,
  FiltersBox: css`
    margin: 0 auto;
  `,
  FiltersList: css`
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    > li {
      padding: 10px;
    }
  `,
  HighScoresListStyle: css`
    list-style: none;
    display: grid;    
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-gap: 1rem;
    padding: 0;
  `,
  HighScoresItemStyle: css`
    display: flex;
    flex-direction: column;
    position: relative;
  `,
  HighScoreImage: css`
    width: 100%;
    height: auto;
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
    -webkit-text-stroke: 0.5px black;
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