import React from 'react';
import './Task.css';
import TaskHeader from '../TaskHeader';
import TaskDetails from '../TaskDetails';

const Task = (task) => (
  <div className="notification_wrapper">
    <TaskHeader headerText={task.task.fname + ' ' + task.task.lname}/>
    <TaskDetails taskDetails={task.task}/>
  </div>
);

export default Task;
