import React from "react";
import { cx, css } from "emotion";
import { connect } from 'react-redux';

import { setDungeons, selectDungeon, setKeyLevel } from '../../store/dungeons/actions';
import KeySelection from "./KeySelection";

function DungeonSelectionConnect({ setDungeons, selectDungeon, setKeyLevel, dungeonsState }) {
  const { dungeons, selected, keyLevel } = dungeonsState;

  const onSelect = (dungeon) => selected.dungeon_slug ? selectDungeon({}) : selectDungeon(dungeon);
  const onSetKeyLevel = (level) => setKeyLevel(level);
  return (
    <nav className={Styles.dungeonsListNavStyle}>
      <ul
        className={cx(
          selected.dungeon_slug
            ? Styles.singleItemStyle
            : Styles.dungeonsListStyle
        )}
      >
        {selected.dungeon_slug ? (
          <DungeonItem dungeon={selected} onSelect={onSelect} />
        ) : (
          dungeons.map((dungeon) => (
            <DungeonItem
              key={dungeon.dungeon_slug}
              dungeon={dungeon}
              onSelect={onSelect}
            />
          ))
        )}
      </ul>
      {selected.dungeon_slug && (
        <>
          <KeySelection keyLevel={keyLevel} onSelect={onSetKeyLevel}/>
          <button
            className={Styles.removeSelect}
            onClick={onSelect}
          >
            Choose another dungeon
          </button>        
        </>
      )}
    </nav>
  );
}

function DungeonItem({ dungeon, onSelect }) {
  const { dungeon_slug } = dungeon;
  const imageUrl = "https://cdnassets.raider.io/images/dungeons/";
  return (
    <li className={Styles.itemStyle} onClick={() => onSelect(dungeon)}>
      <img
        className={Styles.dungeonImageStyle}
        src={`${imageUrl}${dungeon_slug}.jpg`}
        alt={`${dungeon_slug}`}
      />
      <p className={Styles.dungeonOverlayStyle}>{dungeon_slug}</p>
    </li>
  );
}

const mapStateToProps = state => ({
	dungeonsState: state.dungeons,
});

const mapDispatchToProps = { setDungeons, selectDungeon, setKeyLevel };

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
    grid-template-rows: 100px;
    grid-template-areas: ". a .";
  `,

  dungeonsListStyle: css`
    list-style: none;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 100px 100px 100px 100px;
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
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    color: #ffffff;
    cursor: pointer;
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
