import React, {Component} from 'react';
import './Game.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../actions/gameActions';

import {PlayerCounter} from '../components/PlayerCounter';
import chunk from 'lodash/chunk';

class GameComponent extends Component {

  onRemovePlayer = () => {
    this.props.actions.removePlayer();
  };

  onAddPlayer = () => {
    this.props.actions.addPlayer();
  };

  render() {
    const isLandscape = this.props.layout === 'LANDSCAPE';
    const players = this.props.game.players;

    let nbCol;
    let orientation;
    if (isLandscape) {
      if (players.length < 4) {
        nbCol = players.length;
        orientation = 'column';
      } else if (players.length < 5) {
        nbCol = 2;
        orientation = 'row';
      } else if (players.length < 7) {
        nbCol = 3;
        orientation = 'column';
      } else {
        nbCol = 3;
        orientation = 'row';
      }
    } else {
      if (players.length < 4) {
        nbCol = 1;
        orientation = 'row';
      } else if (players.length < 5) {
        nbCol = 2;
        orientation = 'column';
      } else if (players.length < 7) {
        nbCol = 2;
        orientation = 'column';
      } else {
        nbCol = 3;
        orientation = 'column';
      }
    }

    const chunks = chunk(players, nbCol);
    const rows = chunks.map((chunk, rowIndex) => {
      const cells = chunk.map((player, colIndex) => {
        const style = {};
        if (colIndex > 0) {
          style.borderLeftWidth = 2;
          style.borderLeftColor = 'white';
          style.borderStyle = 'solid';
        }
        if (rowIndex > 0) {
          style.borderTopWidth = 2;
          style.borderTopColor = 'white';
          style.borderStyle = 'solid';
        }
        if (players.length === 5 && ((rowIndex === 1 && isLandscape) || (rowIndex === 2 && !isLandscape))) {
          orientation = 'row';
        }
        return (
          <PlayerCounter
            key={player.id}
            player={player}
            orientation={orientation}
            style={style}
            nbPlayer={nbCol + chunks.length - 1}
          />
        );
      });

      return (
        <div key={'row' + rowIndex} className="Game-row">
          {cells}
        </div>
      )
    });

    return (
      <div className="Game-Full">
        <div className="Game">
          {rows}
        </div>
        <div className="Game-menu">
          <div>
            <span>Players :</span>
            <span
              className="Game-menu-action"
              onClick={this.onRemovePlayer}
            >
              -
            </span>
            <span>{players.length}</span>
            <span
              className="Game-menu-action"
              onClick={this.onAddPlayer}
            >
              +
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export const Game = connect(
  state => ({
    game: state.game,
    layout: state.layout.layout,
  }),
  (dispatch) => ({
    actions: bindActionCreators(gameActions, dispatch)
  })
)(GameComponent);
