// @flow
import React, { Component } from "react";
import type { Node } from "react";
import type { Client, Stream } from "../types/agora.js";
import { SignalIcon } from "./decorations";
import { xor } from "./utils";
import AgoraIcon from "./assets/agora.png";
import SpeakerIcon from "./assets/speaker.png";
import "./style.css";

type Props = {
  // basic
  stream: ?Stream,
  video: boolean,
  audio: boolean,
  fit?: "cover" | "contain",
  placeholder?: Node,

  networkDetect?: boolean,
  speaking?: boolean,
  // audioDetect?: boolean,
  appendIcon?: Node,
  prependIcon?: Node,
  label?: string,
  autoChange?: boolean,
  // others
  className?: string,
  style?: Object,
  onClick?: Function,
  onDoubleClick?: Function
};

type State = {
  networkStatus: 0 | 1 | 2 // 0 for normal, 1 for warning, 2 for fatal
};

export default class extends Component<Props, State> {
  static defaultProps: Props = {
    stream: undefined,
    video: true,
    audio: true,
    fit: "cover",

    networkDetect: false,
    speaking: false,
    // audioDetect: false,
    autoChange: true,
    className: "",
    style: {}
  };

  _networkDetector: IntervalID;
  // _audioDetector: IntervalID
  _snapshot: {
    id: number,
    hasVideo: boolean,
    hasAudio: boolean,
    videoOn: boolean,
    audioOn: boolean,
    playing: boolean
  };

  constructor(props: Props) {
    super(props);
    try {
      this._snapshot = this._getSnapshot();
    } catch (err) {
      throw new Error("The stream you passed is invalid!");
    }
    this.state = {
      networkStatus: 0
    };
  }

  startNetworkDetector = () => {
    this.stopNetworkDetector();
    this._networkDetector = setInterval(() => {
      let stream: Stream = (this.props.stream: any);
      stream.getStats(e => {
        if (stream.local) {
          // if local stream, use accessDelay
          let accessDelay = Number.parseInt(e.accessDelay, 10);
          if (isNaN(accessDelay)) {
            return;
          }
          if (accessDelay < 100) {
            this.setState({
              networkStatus: 0
            });
          } else if (accessDelay < 200) {
            this.setState({
              networkStatus: 1
            });
          } else {
            this.setState({
              networkStatus: 2
            });
          }
        } else {
          // if remote stream, use endToEndDelay
          let endToEndDelay = Number.parseInt(e.endToEndDelay, 10);
          if (isNaN(endToEndDelay)) {
            return;
          }
          if (endToEndDelay < 200) {
            this.setState({
              networkStatus: 0
            });
          } else if (endToEndDelay < 400) {
            this.setState({
              networkStatus: 1
            });
          } else {
            this.setState({
              networkStatus: 2
            });
          }
        }
      });
    }, 1500);
  };

  stopNetworkDetector = () => {
    if (this._networkDetector) {
      clearInterval(this._networkDetector);
    }
  };

  _getSnapshot = () => {
    // init snapshot the first time we got it
    let stream: Stream = (this.props.stream: any);
    return {
      id: stream.getId(),
      hasVideo: stream.hasVideo() || stream.hasScreen(),
      hasAudio: stream.hasAudio(),
      videoOn: stream.isVideoOn(),
      audioOn: stream.isAudioOn(),
      playing: stream.isPlaying()
    };
  };

  _handleStreamSideEffects = () => {
    if (!this.props.autoChange) {
      return;
    }
    // deal with side effect
    let $prev = this._snapshot;
    let $stream: Stream = (this.props.stream: any);

    // check video
    if (xor($prev.videoOn, this.props.video)) {
      if ($stream.hasVideo()) {
        this.props.video ? $stream.enableVideo() : $stream.disableVideo();
      }
    }

    // check audio
    if (xor($prev.audioOn, this.props.audio)) {
      if ($stream.hasAudio()) {
        this.props.audio ? $stream.enableAudio() : $stream.disableAudio();
      }
    }
  };

  componentDidUpdate() {
    this._handleStreamSideEffects();

    // check detector
    if (this.props.networkDetect) {
      this.startNetworkDetector();
    } else {
      this.stopNetworkDetector();
    }

    this._snapshot = this._getSnapshot();
  }

  componentDidMount() {
    this._handleStreamSideEffects();

    // check detector
    if (this.props.networkDetect) {
      this.startNetworkDetector();
    }

    // play stream
    let stream = ((this.props.stream: any): Stream);
    stream.play(`agora--player__${stream.getId()}`);
  }

  componentWillUnmount() {
    // check detecor
    this.stopNetworkDetector();

    // stop stream
    let stream = ((this.props.stream: any): Stream);
    if (stream && stream.isPlaying()) {
      stream.stop();
      // stream.local && stream.close();
    }
  }

  render() {
    const className = `agora-player__box 
    ${this.props.fit === "cover" ? "cover" : "contain"} 
    ${this.props.className || ""} `;

    const id = `agora--player__${((this.props.stream: any): Stream).getId()}`;

    const { onClick, onDoubleClick, style } = this.props;
    return (
      <div
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        style={style}
        className={className}
        id={id}
      >
        {/* mask */}
        {(!this.props.video ||
          !(this._snapshot && this._snapshot.hasVideo)) && (
          <div className="agora-player__placeholder">
            {this.props.placeholder ? (
              this.props.placeholder
            ) : (
              <img
                style={{ maxWidth: "80%" }}
                src={AgoraIcon}
                alt="placeholder for video"
              />
            )}
          </div>
        )}

        {/* decorations */}
        <div className="agora-player__decorations">
          {this.props.prependIcon}

          {/* decoration to display network status */}
          {this.props.networkDetect && (
            <SignalIcon level={this.state.networkStatus} />
          )}

          {/* decoration to show if this stream is speaking  */}
          {this.props.speaking && (
            <div className="agora-player__icon">
              <img title="Is speaking" src={SpeakerIcon} alt="speaking" />
            </div>
          )}

          {this.props.appendIcon}
        </div>

        {/* display stream label */}
        {this.props.label && (
          <div className={`agora-player__label ` + this.props.labelClass}>{this.props.label}</div>
        )}
      </div>
    );
  }
}
