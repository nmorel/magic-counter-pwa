import React, {Component} from 'react';
import {connect} from 'react-redux';

const cache = {};

class FitTextComponent extends Component {
  container;
  content;

  componentDidMount() {
    this.calculate();
  }

  componentDidUpdate() {
    this.calculate();
  }

  calculate() {
    const baseWidth = this.container.offsetWidth;
    const baseHeight = this.container.offsetHeight;

    const key = `${baseWidth}_${baseHeight}_${this.props.text.length}`;
    if (cache[key]) {
      this.content.style.fontSize = cache[key];
      return;
    }

    const offset = 20;
    let size = offset;

    this.content.style.fontSize = `${size}px`;
    while (baseWidth > this.content.offsetWidth && baseHeight > this.content.offsetHeight && size < 400) {
      size += offset;
      this.content.style.fontSize = `${size}px`;
    }

    let minSize = size - offset;
    let maxSize = size;
    while ((baseWidth <= this.content.offsetWidth || baseHeight <= this.content.offsetHeight) && maxSize >= minSize) {
      maxSize -= 4;
      this.content.style.fontSize = `${maxSize}px`;
    }

    cache[key] = this.content.style.fontSize;
  }

  render() {
    return (
      <div
        ref={(container) => this.container = container}
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          maxHeight: '100%',
          overflow: 'hidden'
        }}
      >
        <div
          ref={(content) => this.content = content}
        >
          {this.props.text}
        </div>
      </div>
    )
  }
}

// We register for change on players number and layout change to recalculate the text size
export const FitText = connect(
  state => ({
    nbPlayers: state.game.players.length,
    layout: state.layout,
  })
)(FitTextComponent);
