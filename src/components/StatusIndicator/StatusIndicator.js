import React from 'react';
import './StatusIndicator.css';
import FontAwesome from 'react-fontawesome';

function showStatusIcon(status){
    switch (status) {
        case 0:
            return {
                icon: 'circle-thin',
                class: 'status_notstarted'
            };
        case 1:
            return {
                icon: 'adjust',
                class: 'status_inprogress'
            };
        default :
            return {
              icon: 'circle',
              class: 'status_completed'
            }
    }
}

const StatusIndicator = ({status}) => (
       <span>
           <FontAwesome name={showStatusIcon(status).icon} className={showStatusIcon(status).class}/>
       </span>
);

export default StatusIndicator;
