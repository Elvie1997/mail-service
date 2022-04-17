import React from 'react';
import './Switch.scss';

const Switch = ({handleAudio, isPlaying}) => {
  return (
    <div className='switch'>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        onChange={handleAudio}
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
      <div className='switch-text'>{isPlaying ? 'Выкл. подкаст' : 'Вкл. подкаст'}</div>
    </div>
  );
};

export default Switch;