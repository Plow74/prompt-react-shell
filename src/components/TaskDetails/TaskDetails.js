import React from 'react';
import './TaskDetails.css';

const TaskDetails = ({taskDetails}) => (
  <div className="taskdetails_wrapper">
    <p>
      <b>{taskDetails.location}</b>
    </p>
    <p>{taskDetails.date}</p>
    <p>IP Admit</p>
  </div>
);

export default TaskDetails;
