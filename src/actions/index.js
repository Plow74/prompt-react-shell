import types from '../constants/';
import fetch from 'isomorphic-fetch'

export function fetchTasks(){
    return dispatch => {
        dispatch(requestTasks());
        return fetch(`http://www.filltext.com/?rows=!1000&fname={firstName}&lname={lastName}&tel={phone|format}&address={streetAddress}&city={city}&state={usState|abbr}&zip={zip}&status={numberRange|0,%202}&location={lorem|3}&date={date}&pretty=true`)
            .then(response => response.json())
            .then(json => dispatch(receiveTasks(json)))
    }
}

export function selectTab(selectedTabIndex) {
    return{
        type: types.SELECT_TAB,
        selectedTabIndex,
    }
}

export function requestTasks() {
    return {
        type: types.REQUESTS_TASKS,
        tasks: []
    }
}

export function receiveTasks(json) {
    return {
        type: types.RECEIVE_TASKS,
        tasks: json,
        receivedAt: Date.now()
    }
}
