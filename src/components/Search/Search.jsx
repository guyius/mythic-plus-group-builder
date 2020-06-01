import React, { useState } from "react";
import {css} from 'emotion';
import { connect } from 'react-redux';

import { doSearch } from '../../store/search/actions';
import { getPlayer } from '../../store/player/actions';
import { ReactComponent as Logo } from '../../assets/loader.svg';
import SearchResults from './SearchResults';

function SearchConnect({ doSearch, getPlayer, searchState }) {
  const { results, loading, error, query } = searchState;
  const [inputValue, setInputValue] = useState("");

  const onChange = (e) => setInputValue(e.target.value);
  const onSearch = (e) => {
    e.preventDefault();
    inputValue && inputValue !== query && doSearch(inputValue);
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSearch} className={styles.form}>
        <input className={styles.input}
            type="text" 
            spellCheck="false"
            placeholder="Search for your character"
            value={inputValue}
            onChange={onChange} 
            onBlur={onSearch}/>
        {loading && <Logo className={styles.logo}/>}
        {error && <p>{error}</p>}      
      </form>
      {results.length > 0 && <SearchResults results={results} onClick={getPlayer}/>}
    </div>
  );
}

const mapStateToProps = state => ({
	searchState: state.search,
});

const mapDispatchToProps = { doSearch, getPlayer };

const Search = connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchConnect);

export default Search;

const styles = {
    wrapper: css`
      position: relative;
      width: 50%;
      margin: 100px auto;
      border: 1px solid #9370DB;
      border-radius: 4px;
      font-size: 0.875em;
      color: #222;
      line-height: 0.875em;
    `,
    form: css`      
      display: flex;    
      flex-direction: column;
      align-items: center;
    `,
    logo: css`
      width: 32px;
      height: 32px;
      position: absolute;
      top: 4px;
      right: 20px;
    `,
    input: css`
      height:40px;
      width: 100%;
      border: none;
      padding-left: 10px;
      outline: none;
      font-size: inherit;
      color: inherit;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    `,
    resultsList: css`
      width: 100%;
      margin: 0;
      padding: 0;
      list-style: none;
    `,
    resultItem: css`
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
      border-top: 1px solid #9370DB;
      background: #fff;
      cursor: pointer;
      text-transform: capitalize;
      &:last-child {
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
      }
    `,
}
