export const createStream = ({video, audio, streamId, local}) => {
  let stream = {
    id: streamId,
    _hasVideo: video,
    _hasAudio: audio,
    local: local,
    video: video,
    audio: audio,
    playing: false,
    close() {return},
    getStats(cb) {
      if (this.local) {
        cb({
          audioSendBytes: '100',
          audioSendPackets: '100',
          audioSendPacketsLost: '100',
          videoSendBytes: '100',
          videoSendPackets: '100',
          videoSendPacketsLost: '100',
          videoSendFrameRate: '100',
          videoSendResolutionWidth: '100',
          videoSendResolutionHeight: '100',
          accessDelay: '100'
        })
      } else {
        cb({
          audioReceiveBytes: '100',
          audioReceivePackets: '100',
          audioReceivePacketsLost: '100',
          videoReceiveBytes: '100',
          videoReceivePackets: '100',
          videoReceivePacketsLost: '100',
          videoReceiveFrameRate: '100',
          videoReceiveDecodeFrameRate: '100',         
          videoReceivedResolutionWidth: '100',          
          videoReceivedResolutionHeight: '100',
          accessDelay: '100',
          endToEndDelay: '100',
          videoReceiveDelay: '100',
          audioReceiveDelay: '100',
        })
      }
      
    },
    setVideoProfile() {return},
    init(onS, onF) {onS(this)},
    play() {
      this.playing = true
    },
    disableVideo() {
      this.video = false
    },
    disableAudio() {
      this.audio = false
    },
    enableVideo() {
      this.video = true && this._hasVideo
    },
    enableAudio() {
      this.audio = true && this._hasAudio
    },
    on() {
      return
    },
    getId() {
      return this.id
    },
    stop() {
      this.video = false
      this.audio = false
      this.isPlaying = false
    },
    hasVideo() {
      return this._hasVideo
    },
    hasAudio() {
      return this._hasAudio
    },
    isVideoOn() {
      return this.video
    },
    isAudioOn() {
      return this.audio
    },
    isPlaying() {
      return this.isPlaying
    },
  }

  return stream
}