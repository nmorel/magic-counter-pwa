import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './PlayerCounter.css';
import * as gameActions from '../actions/gameActions';
import {counterTypes} from '../constants';
import padStart from 'lodash/padStart';
import {getColor} from '../helper';

class PlayerCounterComponent extends Component {

  onIncrementLife = () => {
    this.props.actions.incrementCounter(counterTypes.life, this.props.player);
  };

  onDecrementLife = () => {
    this.props.actions.decrementCounter(counterTypes.life, this.props.player);
  };

  onRollDice = () => {
    this.props.actions.rollDice(this.props.player);
  };

  render() {
    const life = (this.props.player.life < 0 ? '-' : '')
      + padStart(Math.abs(this.props.player.life).toString(), 2, '0');

    return (
      <div className={`PlayerCounter PlayerCounter-${this.props.orientation}`}
           style={this.props.style}>
        <div className="PlayerCounter-inner">
          {/* Content */}
          <div className="PlayerCounter-content">
            <div className="PlayerCounter-action-text">
              <svg
                fill="#fff"
                viewBox="0 0 24 24"
              >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </div>
            <div className="PlayerCounter-life-text">
              <svg viewBox="0 0 24 12">
                <text x={12} y={10.5} fill="#fff" textAnchor="middle" fontSize={14}>{life}</text>
              </svg>
            </div>
            <div className="PlayerCounter-action-text">
              <svg
                fill="#fff"
                viewBox="0 0 24 24"
              >
                <path d="M19 13H5v-2h14v2z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </div>
          </div>

          {/* Actions */}
          <div className="PlayerCounter-overlay-actions">
            <div
              className={`PlayerCounter-overlay-action`}
              onClick={this.onIncrementLife}
            />
            <div
              className={`PlayerCounter-overlay-action`}
              onClick={this.onDecrementLife}
            />
          </div>

          {/* Player's name */}
          <div
            className="PlayerCounter-name"
            style={{backgroundColor: getColor(this.props.player.id)}}
          >
            <span className="PlayerCounter-name-text">
              {this.props.player.name}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export const PlayerCounter = connect(
  undefined,
  (dispatch) => ({
    actions: bindActionCreators(gameActions, dispatch)
  })
)(PlayerCounterComponent);
