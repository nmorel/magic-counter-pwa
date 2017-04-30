import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './PlayerCounter.css';
import * as gameActions from '../actions/gameActions';
import {counterTypes} from '../constants';

import * as _ from 'lodash';
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
    const life = _.padStart(this.props.player.life.toString(), 2, '0');

    return (
      <div className={`PlayerCounter PlayerCounter-${this.props.orientation}`} style={this.props.style}>
        <div className="PlayerCounter-inner">
          {/* Content */}
          <div className="PlayerCounter-content">
            <div className="PlayerCounter-action-text">
              +
            </div>
            <div className="PlayerCounter-life-text">
              {life}
            </div>
            <div className="PlayerCounter-action-text">
              -
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
