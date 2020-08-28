import React from "react";
import { cx, css } from "emotion";
import { connect } from 'react-redux';

import { selectDungeon, setKeyLevel } from '../../store/dungeons/actions';
import KeySelection from "./KeySelection";

function DungeonSelectionConnect({ selectDungeon, setKeyLevel, dungeonsState }) {
  const { dungeons, selected, keyLevel } = dungeonsState;

  const onSelect = (dungeon) => selected.slug ? clearSelection() : selectDungeon(dungeon);
  const onSetKeyLevel = (level) => setKeyLevel(level);
  const clearSelection = () => selectDungeon({}) && onSetKeyLevel(2);

  return (
    <nav className={Styles.dungeonsListNavStyle}>
      <ul
        className={cx(
          selected.slug
            ? Styles.singleItemStyle
            : Styles.dungeonsListStyle
        )}
      >
        {selected.slug ? (
          <DungeonItem dungeon={selected} onSelect={onSelect} />
        ) : (
          dungeons.map((dungeon) => (
            <DungeonItem
              key={dungeon.slug}
              dungeon={dungeon}
              onSelect={onSelect}
            />
          ))
        )}
      </ul>
      {selected.slug && (
        <>
          <KeySelection keyLevel={keyLevel} onSelect={onSetKeyLevel}/>
          <button
            className={Styles.removeSelect}
            onClick={clearSelection}
          >
            Choose another dungeon
          </button>        
        </>
      )}
    </nav>
  );
}

function DungeonItem({ dungeon, onSelect }) {
  const { slug } = dungeon;
  const imageUrl = "https://cdnassets.raider.io/images/dungeons/";
  const name = slug.split("-").join(" ");
  return (
    <li className={Styles.itemStyle} onClick={() => onSelect(dungeon)}>
      <img
        className={Styles.dungeonImageStyle}
        src={`${imageUrl}${slug}.jpg`}
        alt={`${slug}`}
      />
      <p className={Styles.dungeonOverlayStyle}>{name}</p>
    </li>
  );
}

const mapStateToProps = state => ({
	dungeonsState: state.dungeons,
});

const mapDispatchToProps = { selectDungeon, setKeyLevel };

const DungeonSelection = connect(
	mapStateToProps,
	mapDispatchToProps
)(DungeonSelectionConnect);

export default DungeonSelection;

const Styles = {
  dungeonsListNavStyle: css`
    width: 80%;
    margin: 50px auto;
  `,

  singleItemStyle: css`
    list-style: none;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    column-gap: 10px;
    row-gap: 10px;
    grid-template-rows: 150px;
    grid-template-areas: ". a .";
  `,

  dungeonsListStyle: css`
    list-style: none;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 150px 150px 150px 150px;
    column-gap: 10px;
    row-gap: 10px;
  `,

  itemStyle: css`
    position: relative;    
    &:only-child {
      grid-area: a;
    }
  `,

  dungeonImageStyle: css`
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 4px;
  `,

  dungeonOverlayStyle: css`
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
  
  removeSelect: css`
    height: 40px;
    border: 1px solid #9370db;
    display: block;
    margin: 50px auto;
    outline: none;
    font-size: inherit;
    color: inherit;
    border-radius: 4px;
    cursor: pointer;
    &:hover,
    &:focus {
      background-color: #9d90f4;
    }
    &:active {
      background-color: #766bc4;
    }
  `,
};
