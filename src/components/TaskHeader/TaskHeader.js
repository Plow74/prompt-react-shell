import React from 'react';
import PropTypes from 'prop-types';
import './TaskHeader.css';
import ProgressIndicator from '../ProgressIndicator/';

const TaskHeader = ({headerText}) => (
  <div className='taskheader_wrapper'>
    <span>{headerText}</span>
    <span className='indicator_position'>
      <ProgressIndicator />
    </span>
  </div>
);

TaskHeader.propTypes = {
    headerText: PropTypes.string.isRequired
}

export default TaskHeader;
