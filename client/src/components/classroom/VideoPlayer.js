import React from 'react';
import Clappr from 'clappr';

export default class VideoPlayer {


  shouldComponentUpdate(nextProps, nextState) {
    let changed = (nextProps.source != this.props.source);
    this.props = nextProps;
    this.state = nextState;
    if (changed) {
      this.change(nextProps.source);
    }
    return false;
  }

  componentDidMount() {
    this.change(this.props.source);
  }

  componentWillUnmount() {
    this.destroyPlayer();
  }

  destroyPlayer() {
    if (this.player) {
      this.player.destroy();
    }
    this.player = null;
  }

  change(source) {
    if (this.player) {
      this.destroyPlayer();
    }
    this.player = new Clappr.Player({
      parent: this.refs.player,
      source: source,
      width: '100%',
      height: '100%',
      hlsjsConfig: {
        enableWorker: true
      }
    });
  }

  render() {
    return (
      <div>
        <div ref="player"></div>
      </div>
    );
  }
};