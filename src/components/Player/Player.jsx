import React from "react";
import { css } from 'emotion'
import { connect } from 'react-redux';

function PlayerConnect({playerState}) {
  const { name, score, realm, spec } = playerState.player;
    
  return (
    <div className={playerStyle}>
      <p>This is the player content</p>
      <p>{name}</p>
      <p>{score}</p>
      <p>{realm}</p>
      <p>{spec}</p>
    </div>
  );
};

const mapStateToProps = state => ({
	playerState: state.player,
});

const Player = connect(mapStateToProps)(PlayerConnect);

export default Player;

const playerStyle = css`
  display: flex;
  justify-content: center;
  flex-direction: row;
`
      