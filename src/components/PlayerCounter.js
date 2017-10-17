import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './PlayerCounter.css';
import * as gameActions from '../actions/gameActions';
import {counterTypes} from '../constants';
import padStart from 'lodash/padStart';
import {getColor} from '../helper';

class PlayerCounterComponent extends Component {
  state = {
    mouseDownIncrement: false,
    mouseDownDecrement: false,
  };

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
    const life =
      (this.props.player.life < 0 ? '-' : '') +
      padStart(Math.abs(this.props.player.life).toString(), 2, '0');

    const playerColor = getColor(this.props.player.id);

    return (
      <div
        className={`PlayerCounter PlayerCounter-${this.props.orientation}`}
        style={this.props.style}
      >
        <div className="PlayerCounter-inner">
          {/* Content */}
          <div className="PlayerCounter-content">
            <div className="PlayerCounter-action-text">
              <svg
                fill={playerColor}
                style={{
                  transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
                  opacity: this.state.mouseDownIncrement ? 0.6 : 1,
                  transform: this.state.mouseDownIncrement
                    ? 'translateX(1px) translateY(2px) scale(0.98)'
                    : 'translateX(0) translateY(0) scale(1)',
                }}
                viewBox="0 0 24 24"
              >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </div>
            <div className="PlayerCounter-life-text">
              <svg key={life} viewBox="0 0 24 12" strokeWidth="0.15">
                <text
                  x={12}
                  y={10.5}
                  textAnchor="middle"
                  fontSize={14}
                  strokeDasharray="50 50"
                  strokeDashoffset="30"
                  fill={playerColor}
                  stroke={playerColor}
                >
                  {life}
                  <animate
                    dur="0.5s"
                    attributeName="stroke-dashoffset"
                    values="40;0"
                    fill="freeze"
                  />
                  <animate dur="1s" attributeName="fill-opacity" values={`0.2;1`} fill="freeze" />
                </text>
              </svg>
            </div>
            <div className="PlayerCounter-action-text">
              <svg
                fill={playerColor}
                style={{
                  transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
                  opacity: this.state.mouseDownDecrement ? 0.6 : 1,
                  transform: this.state.mouseDownDecrement
                    ? 'translateX(1px) translateY(2px) scale(0.98)'
                    : 'translateX(0) translateY(0) scale(1)',
                }}
                viewBox="0 0 24 24"
              >
                <path d="M19 13H5v-2h14v2z" />
              </svg>
            </div>
          </div>

          {/* Actions */}
          <div className="PlayerCounter-overlay-actions">
            <div
              className={`PlayerCounter-overlay-action`}
              onMouseDown={() => this.setState({mouseDownIncrement: true})}
              onMouseUp={() => this.setState({mouseDownIncrement: false})}
              onClick={this.onIncrementLife}
            />
            <div
              className={`PlayerCounter-overlay-action`}
              onMouseDown={() => this.setState({mouseDownDecrement: true})}
              onMouseUp={() => this.setState({mouseDownDecrement: false})}
              onClick={this.onDecrementLife}
            />
          </div>

          {/* Player's name */}
          <div className="PlayerCounter-name" style={{backgroundColor: playerColor}}>
            <span className="PlayerCounter-name-text">{this.props.player.name}</span>
          </div>
        </div>
      </div>
    );
  }
}

export const PlayerCounter = connect(undefined, dispatch => ({
  actions: bindActionCreators(gameActions, dispatch),
}))(PlayerCounterComponent);
