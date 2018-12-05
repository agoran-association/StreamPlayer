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

  it('Test placeholder', () => {
    let stream = createStream({streamId: 1024, video: true, audio: true, local: true})
    render(<StreamPlayer key={1024} stream={stream} video={false} audio={true}/>, node, () => {
      expect(node.innerHTML).toContain('agora-player__placeholder')
    })
    render(<StreamPlayer key={1024} stream={stream} video={true} audio={true}/>, node, () => {
      expect(node.innerHTML).toNotContain('agora-player__placeholder')
    })
  })

  it('Test network detector', () => {
    let stream = createStream({streamId: 1024, video: true, audio: true, local: true})
    render(<StreamPlayer key={1024} stream={stream} video={false} audio={true} networkDetect={true}/>, node, () => {
      expect(node.innerHTML).toContain('agora-player__icon')
    })
    render(<StreamPlayer key={1024} stream={stream} video={false} audio={true} networkDetect={false}/>, node, () => {
      expect(node.innerHTML).toNotContain('agora-player__icon')
    })
  })

  it('Test speaker icon', () => {
    let stream = createStream({streamId: 1024, video: true, audio: true, local: true})
    render(<StreamPlayer key={1024} stream={stream} video={false} audio={true} speaking={true}/>, node, () => {
      expect(node.innerHTML).toContain('agora-player__icon')
    })
    render(<StreamPlayer key={1024} stream={stream} video={false} audio={true} speaking={false}/>, node, () => {
      expect(node.innerHTML).toNotContain('agora-player__icon')
    })
  })

  it('Test fit mode', () => {
    let stream = createStream({streamId: 1024, video: true, audio: true, local: true})
    render(<StreamPlayer key={1024} stream={stream} video={false} audio={true} fit="contain"/>, node, () => {
      console.log(node)
      expect(node.innerHTML).toContain('contain')
    })
    render(<StreamPlayer key={1024} stream={stream} video={false} audio={true} fit="cover"/>, node, () => {
      expect(node.innerHTML).toContain('cover')
    })
  })

  it('Test label', () => {
    let stream = createStream({streamId: 1024, video: true, audio: true, local: true})
    render(<StreamPlayer key={1024} stream={stream} video={false} audio={true} label="I am a stream"/>, node, () => {
      console.log(node)
      expect(node.innerHTML).toContain('I am a stream')
    })
  })
})
