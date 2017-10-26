import React from 'react';
import './ProgressIndicator.css';

const ProgressIndicator = () => (
  <div className='progressindicator_wrapper'>
    <div className='square'>
      <div className='content'>1</div>
    </div>
    <div className='square'>
      <div className='content'>2</div>
    </div>
    <div className='square'>
      <div className='content'>3</div>
    </div>
  </div>
);

export default ProgressIndicator;
