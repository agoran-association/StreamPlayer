import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import { createStream } from './utils'

import StreamPlayer from 'src/index.js'

describe('Component', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Test className and style', () => {
    let stream = createStream({streamId: 1024, video: true, audio: true, local: true})
    render(<StreamPlayer className="classNameForStream" style={{color: 'purple'}} key={1024} stream={stream} video={false} audio={true}/>, node, () => {
      expect(node.innerHTML).toContain('classNameForStream')
      expect(node.innerHTML).toContain('color: purple')
    })
  })

  it('Test placeholder', () => {
    let stream = createStream({streamId: 1024, video: true, audio: true, local: true})
    render(<StreamPlayer key={1024} stream={stream} video={false} audio={true}/>, node, () => {
      expect(node.innerHTML).toContain('agora-player__placeholder')
    })
    render(<StreamPlayer key={1024} stream={stream} video={true} audio={true}/>, node, () => {
      expect(node.innerHTML).toNotContain('agora-player__placeholder')
    })
  })


  it('Test network detector (remote poor)', (done) => {
    let remoteStream = createStream({streamId: 1024, video: true, audio: true, local: false, latency: '300'})
    render(<StreamPlayer key={1024} stream={remoteStream} video={true} audio={true} networkDetect={true}/>, node, () => {
      setTimeout(() => {
        expect(node.innerHTML).toContain('Poor Network latency')
        remoteStream.latency = 500
        setTimeout(() => {
          expect(node.innerHTML).toContain('Severe Network latency')
          remoteStream.latency = 50
          setTimeout(() => {
            expect(node.innerHTML).toContain('Good Network')
            done()
          }, 2000)
        }, 2000)
      }, 2000)
    })
  }).timeout(7500)

  it('Test network detector (local severe)', (done) => {
    let localStream = createStream({streamId: 1024, video: true, audio: true, local: true, latency: '300'})
    render(<StreamPlayer key={1024} stream={localStream} video={true} audio={true} networkDetect={true}/>, node, () => {
      setTimeout(() => {
        expect(node.innerHTML).toContain('Severe Network latency')
        done()
      }, 2000)
    })
  }).timeout(3000)

  it('Test speaker icon', () => {
    let stream = createStream({streamId: 1024, video: true, audio: true, local: true})
    render(<StreamPlayer key={1024} stream={stream} video={true} audio={true} speaking={true}/>, node, () => {
      expect(node.innerHTML).toContain('Is speaking')
    })
    render(<StreamPlayer key={1024} stream={stream} video={false} audio={true} speaking={false}/>, node, () => {
      expect(node.innerHTML).toNotContain('Is speaking')
    })
  })

  it('Test fit mode', () => {
    let stream = createStream({streamId: 1024, video: true, audio: true, local: true})
    render(<StreamPlayer key={1024} stream={stream} video={true} audio={true} fit="contain"/>, node, () => {
      expect(node.innerHTML).toContain('contain')
    })
    render(<StreamPlayer key={1024} stream={stream} video={false} audio={true} fit="cover"/>, node, () => {
      expect(node.innerHTML).toContain('cover')
    })
  })

  it('Test label', () => {
    let stream = createStream({streamId: 1024, video: true, audio: true, local: true})
    render(<StreamPlayer key={1024} stream={stream} video={true} audio={true} label="I am a stream"/>, node, () => {
      expect(node.innerHTML).toContain('I am a stream')
    })
  })

  it('Test isPlaying', () => {
    let stream = createStream({streamId: 1024, video: true, audio: true, local: true})
    expect(stream.isPlaying()).toBeFalsy()
    render(<StreamPlayer key={1024} stream={stream} video={true} audio={true} label="I am a stream"/>, node, () => {
      expect(stream.isPlaying()).toBeTruthy()
    })
  })

  it('Test side effects', () => {
    let stream = createStream({streamId: 1024, video: true, audio: true, local: true})
    expect(stream.isVideoOn()).toBeTruthy()
    render(<StreamPlayer key={1024} stream={stream} video={false} audio={true} label="I am a stream"/>, node, () => {
      expect(stream.isVideoOn()).toBeFalsy()
    })
  })
})
