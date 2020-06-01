import React from "react";
import { css } from "emotion";

function SearchResults({ results, onClick }) {
  return (
    <ul className={styles.resultsList}>
      {results.map((result, index) => (
        <li
          className={styles.resultItem}
          key={`${result.name}-${index}`}
          onClick={() => onClick({id: result.id, region: result.region})}
        >
          {result.name.toLowerCase()} {result.region.toUpperCase()}-
          {result.realm}
        </li>
      ))}
    </ul>
  );
}

const styles = {
  resultsList: css`
    max-height: 400px; //Height of 10 items
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: scroll;    
  `,
  resultItem: css`
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    border-top: 1px solid #9370db;
    background: #fff;
    cursor: pointer;
    text-transform: capitalize;
    &:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  `,
};

export default SearchResults;
