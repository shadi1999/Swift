import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Clappr from 'clappr';
import { Events } from 'p2p-media-loader-core';
import { Engine, initClapprPlayer } from 'p2p-media-loader-hlsjs';
import axios from 'axios';
import config from '../../Config';

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
    clearInterval(this.timer);
  }

  change(source) {
    if (this.player) {
      this.destroyPlayer();
    }
    
    const engine = new Engine();
    let thiz = this;
    this.player = new Clappr.Player({
      parent: this.refs.player,
      source: source,
      width: '100%',
      height: '100%',
      autoPlay: true,
      hideMediaControl: true,
      disableKeyboardShortcuts: true,
      playbackNotSupportedMessage: "There was no stream at this part of the lecture.",
      // chromeless: true,
      disableErrorScreen: true,
      events: {
        onError: function(e) {
          setTimeout(function() { thiz.player.configure(thiz.player.options); }, 3200);
        }
      },
      hlsjsConfig: {
        enableWorker: true,
        liveSyncDurationCount: 7,
        loader: engine.createLoaderClass()
      }
    });
    initClapprPlayer(this.player);

    // Statistics
    if(this.props.live) {
      const downloadTotals = { http: 0, p2p: 0 };
      engine.on(Events.PieceBytesDownloaded, (method, size) => {
        downloadTotals[method] += size;
        console.log(downloadTotals)
      });

      this.timer = setInterval(async () => {
        // Send that download statistics to the server every 15 seconds.
        try {
          const res = await axios.post(`${config.URL.Server}/api/lectures/downloadStats`, { downloadTotals, classroomId: this.props.classroomId });
          downloadTotals.http = 0;
          downloadTotals.p2p = 0;
        } catch(e) {
          console.log(e);
        }
      }, 15000);
    }
  }

  render() {
    return (
      <div className="clappr-vid" ref="player"></div>
    );
  }
};

export default VideoPlayer;
// export default connect()(VideoPlayer);