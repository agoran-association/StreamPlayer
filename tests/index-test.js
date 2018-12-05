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

  it('Test mask', () => {
    let stream = createStream({streamId: 1024, video: true, audio: true, local: true})
    render(<StreamPlayer key={1024} stream={stream} video={false} audio={true}/>, node, () => {
      expect(node.innerHTML).toContain('agora-player__placeholder')
    })
    render(<StreamPlayer key={1024} stream={stream} video={true} audio={true}/>, node, () => {
      expect(node.innerHTML).toNotContain('agora-player__placeholder')
    })
  })
})
