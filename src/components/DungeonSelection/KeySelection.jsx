import React, { useState } from "react";
import { css } from "emotion";

function KeySelection({ keyLevel, onSelect}) {
  const [localKey, setLocalKey] = useState(2);
  const onSetLocalKey = (level) => {
    setLocalKey(level);
    level !== keyLevel && onSelect(level);
  }
  return (
    <div className={Styles.keySelectionWrapper}>
      <p className={Styles.keyValue}>Dungeon level: {keyLevel}</p>
      <input
        className={Styles.slider}
        name="key-level"
        type="range"
        value={localKey}
        min="2"
        max="30"
        onChange={(e) =>  onSetLocalKey(e.target.value)}
      />      
    </div>
  );
}

export default KeySelection;

const Styles = {
  keySelectionWrapper: css`
    width: 40%;
    margin: 50px auto;
  `,

  keyValue: css`color: #fff;`,

  slider: css`
    width: 100%;
    height: 15px;
    border-radius: 5px;  
    background: #ffffff;
    outline: none;
    opacity: 0.7;
    transition: opacity .2s;
    -webkit-appearance: none;

    &:hover,
    &:active,
    &:focus {
      opacity: 1;
    }

    &::-webkit-slider-thumb {
      appearance: none;
      width: 25px;
      height: 25px;
      border-radius: 50%; 
      background: #9d90f4;
      cursor: pointer;
    }
    
    &::-moz-range-thumb {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #9d90f4;
      cursor: pointer;
    }
  `
};
