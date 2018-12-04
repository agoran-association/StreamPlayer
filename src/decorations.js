// @flow
import React, {Component} from 'react';
import DangerIcon from './assets/network-danger.png';
import WarnIcon from './assets/network-warning.png';
import InfoIcon from './assets/network-good.png';

type SignalIconProps = {
  level: 0 | 1 | 2, // 1 for warning, 2 for fatal, 0 for normal
}

export function SignalIcon(props: SignalIconProps) {
  if (props.level === 1) {
    return (
      <div className="agora-player__network">
        <img
          title="Poor Network latency"
          src={WarnIcon}
          alt="weak-signal"
        />
      </div>
    );
  } else if (props.level === 2) {
    return (
      <div className="agora-player__network">
        <img 
          title="Severe Network latency"
          src={DangerIcon} 
          alt="poor-signal" 
        />
      </div>
    );
  } else {
    return (
      <div className="agora-player__network">
        <img 
          title="Good Network"
          src={InfoIcon} 
          alt="good-signal" 
        />
      </div>
    );
  }
}
