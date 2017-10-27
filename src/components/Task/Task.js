import React from 'react';
import './Task.css';
import TaskHeader from '../TaskHeader';
import TaskDetails from '../TaskDetails';
import StatusIndicator from "../StatusIndicator/StatusIndicator";

const Task = (task) => (
        <div className="panel panel-primary container-fluid">
            <div className="panel-heading row">
                <div className="col-xs-11">
                    <TaskHeader headerText={task.task.fname + ' ' + task.task.lname}/>
                </div>
                <div className="col-xs-1 status">
                    <StatusIndicator status={task.task.status}/>
                </div>
            </div>
            <div className="panel-body"><TaskDetails taskDetails={task.task}/></div>
        </div>
);

export default Task;
