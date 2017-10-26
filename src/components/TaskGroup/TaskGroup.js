import React from 'react';
import './TaskGroup.css';
import Task from '../Task';

function createTaskItems(props){
    return props.tasks.map((task, i) => {
        return(
            <Task task={task} key={i}/>
        );
    });
}

const TaskGroup = (props) => {
    return (
        <div>
            {createTaskItems(props)}
        </div>
    )
};

export default TaskGroup;
