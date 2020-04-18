import React from 'react';
import Clappr from 'clappr';
import { connect } from 'react-redux';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
    console.log(source);
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
      <div className="clappr-vid" ref="player"></div>
    );
  }
};

export default VideoPlayer;
// export default connect()(VideoPlayer);