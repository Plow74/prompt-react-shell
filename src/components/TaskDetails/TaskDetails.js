import React from 'react';
import './TaskDetails.css';
import FontAwesome from 'react-fontawesome';

const TaskDetails = ({taskDetails}) => (
  <div>
      <div className="row">
          <div className="col-xs-1">
              <FontAwesome name="hospital-o"/>
          </div>
          <div className="col-xs-11">
              <b>{taskDetails.location}</b>
          </div>
      </div>
      <div className="row">
          <div className="col-xs-1">
              <FontAwesome name="clock-o"/>
          </div>
          <div className="col-xs-11">
              {taskDetails.date}
          </div>
      </div>
      <div className="row">
          <div className="col-xs-1">
              <FontAwesome name="shield"/>
          </div>
          <div className="col-xs-11">
              IP Admit
          </div>
      </div>
  </div>
);

export default TaskDetails;
