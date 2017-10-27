import React from 'react';
import PropTypes from 'prop-types';
import './TaskHeader.css';

const TaskHeader = ({headerText}) => (
    <span>{headerText}</span>
);

TaskHeader.propTypes = {
    headerText: PropTypes.string.isRequired
}

export default TaskHeader;
