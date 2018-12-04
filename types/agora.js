// @flow
export interface Client {
  init: Function;
  join: Function;
  publish: (stream: Stream, cb?: Function) => any;
  subscribe: (stream: Stream, cb?: Function) => any;
  on: Function;
  unpublish: (stream: Stream, cb?: Function) => any;
  leave: Function;
  enableDualStream: Function;
  setRemoteVideoStreamType: Function;
}

export interface Stream {
  local: boolean,
  close: Function;
  getStats: Function,
  setVideoProfile: Function;
  init: Function;
  play: Function;
  disableVideo: Function;
  disableAudio: Function;
  enableVideo: Function;
  enableAudio: Function;
  on: Function;
  getId: Function;
  stop: Function;
  hasVideo: Function;
  hasAudio: Function;
  isVideoOn: Function;
  isAudioOn: Function;
  isPlaying: Function;
}

export type ClientConfig = {
  /** The channel mode.
   * - `"live"`: Sets the channel mode as live broadcast (interop with the native SDK).
   * - `"rtc"`: Sets the channel mode as communication (non-interop with the native SDK).
   */
  mode: 'live' | 'rtc',
  /** The codec the Web browser uses for encoding and decoding.
   * - `"vp8"`: Sets the browser to use VP8 for encoding and decoding.
   * - `"h264"`: Sets the browser to use H264 for encoding and decoding.
   */
  codec: 'vp8' | 'h264',
  /** Your Nginx server domain name.
   *
   * Enterprise users with a company firewall can use this property to pass signaling messages to the Agora SD-RTN through the Nginx Server.
   */
  proxyServer?: string,
  /** TURN server settings.
   *
   * Enterprise users with a company firewall can use this property to pass audio and video data to the Agora SD-RTN through the TURN Server.
   */
  turnServer?: {
    /** Your TURN Server URL address. */
    turnServerURL: string,
    /** Your TURN Server username. */
    username: string,
    /** Your TURN Server password. */
    password: string,
    /** The UDP port(s) you want to add to TURN Server. */
    udpport?: string,
    /** The TCP port(s) you want add to TURN Server. */
    tcpport?: string,
    /** Sets whether to force data transfer by TURN Server:
     * - true: Force data transfer.
     * - false: (default) Not to force data transfer.
     */
    forceturn: boolean
  }
};

export interface StreamSpec {
  /**
   * The stream ID.
   *
   * Please set the stream ID as the user ID, which can be retrieved from the callback of Client.join.
   */
  streamID?: ?number;
  /**
   * Marks whether this stream contains an audio track.
   */
  audio: boolean;
  /**
   * Marks whether this stream contains a video track.
   */
  video: boolean;
  /**
   * Marks whether this stream conatains a screen-sharing track.
   */
  screen: boolean;
  /**
   * Specifies the audio source of the stream.
   */
  audioSource?: Object;
  /**
   * Specifies the video source of the stream.
   */
  videoSource?: Object;
  /**
   * The camera device ID retrieved from the getDevices method.
   */
  cameraId?: string;
  /**
   * The microphone device ID retrieved from the getDevices method.
   */
  microphoneId?: string;
  /**
   * Marks whether the video image of the publisher is mirrored on the publisher’s webpage.
   *
   * The default value is `true` (except in the screen-share mode). Agora recommends enabling this function when using the front camera, and disabling it when using the rear camera.
   */
  mirror?: boolean;
  /**
   * The extension ID of the Chrome screen-sharing extension.
   *
   * Set this property if you use the Chrome screen-sharing extension. See [Screen Sharing on Chrome](/en/Quickstart%20Guide/screensharing_web#screen-sharing-on-chrome) for details.
   */
  extensionid?: string;
  /** The screen-sharing mode on the Firefox browser.
   *
   * If you are using the Firefox browser, setting this property specifies the screen-sharing mode:
   * - `"screen"`: Share the current screen
   * - `"application"`: Share all windows of an App
   * - `"window"`: Share a specified window of an App
   *
   * **Note:**
   *
   * Firefox on Windows does not support the application mode.
   *
   * See [Screen Sharing on Firefox](/en/Quickstart%20Guide/screensharing_web#screen-sharing-on-firefox) for details.
   */
  mediaSource?: 'screen' | 'application' | 'window';
  /** Marks whether to enable audio processing. */
  audioProcessing?: {
    /** Marks whether to enable audio gain control.
     *
     * The default value is `true` (enable). If you wish not to enable the audio gain control, set `AGC` as `false`.
     *
     * **Note:**
     *
     * Safari does not suport this setting.
     */
    AGC: boolean,
    /** Marks whether to enable acoustic echo cancellation.
     *
     * The default value is `true` (enable). If you wish not to enable the  acoustic echo cancellation, set `AEC` as `false`.
     *
     * **Note:**
     *
     * Safari does not support this setting.
     */
    AEC: boolean,
    /** Marks whether to enable automatic noise suppression.
     *
     * The default value is `true` (enable). If you wish not to enable automatic noise suppression, set `ANS` as `false`.
     *
     * **Note:**
     *
     * - Safari does not support this setting.
     * - Noise suppression is always enabled on Firefox. Setting `ANS` as `false` will not take effect on Firefox.
     */
    ANS: boolean
  };
}

export type VideoProfile = string;
