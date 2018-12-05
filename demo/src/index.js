import React, {Component} from 'react'
import {render} from 'react-dom'
import AgoraRTC from 'agora-rtc-sdk'
import StreamPlayer from '../../src/index'

class Demo extends Component {
  state = {
    stream: undefined,
    video: true,
    audio: true,
    fit: true,
    speaking: true,
    networkDetect: true,
    label: ''
  }

  handleChange = e => {
    let [key, value] = [e.currentTarget.name, e.currentTarget.value]
    this.setState({
      [key]: value
    })
  }

  handleSwitch = e => {
    let [key, value] = [e.currentTarget.name, e.currentTarget.value]
    this.setState({
      [key]: !this.state[key]
    })
  }

  componentDidMount() {
    let stream = AgoraRTC.createStream({
      streamID: 1024,
      video: true,
      audio: true,
      screen: false,
    });
    stream.init(() => {
      setTimeout(() => {
        this.setState({
          stream: stream
        })
      }, 2000)
    })

    setTimeout(() => {
      let stream2 = AgoraRTC.createStream({
        streamID: 1025,
        video: true,
        audio: true,
        screen: false,
      });
      stream2.init(() => {
        setTimeout(() => {
          this.setState({
            stream: stream2
          })
        }, 2000)
      })
    }, 10000)

  }

  render() {
    return (
      <div>
        <input onChange={this.handleSwitch} checked={this.state.video} type="checkbox" name="video" id="video"/>Video
        <input onChange={this.handleSwitch} checked={this.state.audio} type="checkbox" name="audio" id="audio"/>Audio
        <input onChange={this.handleSwitch} checked={this.state.fit} type="checkbox" name="fit" id="fit"/>Fit
        <input onChange={this.handleSwitch} checked={this.state.speaking} type="checkbox" name="speaking" id="speaking"/>Speaking
        <input onChange={this.handleSwitch} checked={this.state.networkDetect} type="checkbox" name="networkDetect" id="networkDetect"/>networkDetect
        <input onChange={this.handleChange} value={this.state.label} type="text" name="label" id="label"/>
        {
          this.state.stream &&
            <StreamPlayer 
            style={{width: '240px', height: '140px'}}
            key={this.state.stream.getId()} 
            stream={this.state.stream}
            label={this.state.label}
            fit={this.state.fit ? 'cover':'contain'}
            speaking={this.state.speaking}
            networkDetect={this.state.networkDetect}
            video={this.state.video} 
            audio={this.state.audio} />
        }
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
