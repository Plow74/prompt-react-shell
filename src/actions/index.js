import types from '../constants/';
import fetch from 'isomorphic-fetch'

function fetchTasks(tasks){
    return dispatch => {
        dispatch(requestTasks(tasks));
        return fetch(`http://www.filltext.com/?rows=!1000&fname={firstName}&lname={lastName}&tel={phone|format}&address={streetAddress}&city={city}&state={usState|abbr}&zip={zip}&status={numberRange|0,%202}&location={lorem|3}&date={date}&pretty=true`)
            .then(response => response.json())
            .then(json => dispatch(receiveTasks(tasks, json)))
    }
}

function shouldFetchTasks(state, selectedTabIndex = 0) {
    const tasks = state.tasksForTab[selectedTabIndex];
    if(!tasks){
        return true;
    }else if (tasks.isFetching){
        return false;
    }else {
        return tasks.didInvalidate;
    }
}

export function fetchTasksIfNeeded(selectedTabIndex){
    return (dispatch, getState) => {
        if (shouldFetchTasks(getState(), selectedTabIndex)) {
            return dispatch(fetchTasks(selectedTabIndex))
        }
    }
}

export function selectTab(selectedTabIndex) {
    return{
        type: types.SELECT_TAB,
        selectedTabIndex,
    }
}

export function invalidateTab(selectedTabIndex) {
    return{
        type: types.INVALIDATE_TAB,
        selectedTabIndex,
    }
}

export function requestTasks(tasks) {
    return {
        type: types.REQUESTS_TASKS,
        tasks,
    }

}

export function receiveTasks(tasks, json) {
    return {
        type: types.RECEIVE_TASKS,
        tasks: json,
        receivedAt: Date.now()
    }
}
