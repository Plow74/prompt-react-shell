import types from '../constants/';
import { combineReducers } from 'redux'

function selectedTab(state = 0, action){
    switch (action.type){
        case types.SELECT_TAB:
            return action.selectedTabIndex;
            break;
        default:
            return state;
            break;
    }
}

function receivedTasks(
    state = {
        isFetching: false,
        items: [],
        taskCount: 0
    },
    action)
{
    switch (action.type) {
        case types.REQUESTS_TASKS:
            return Object.assign({}, state, {
                isFetching: true,
                items: action.tasks
            });
            break;
        case types.RECEIVE_TASKS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.tasks,
                lastUpdated: action.receivedAt,
                taskCount: action.tasks.length
            });
            break;
        default:
            return state;
            break;
    }
}

const rootReducer = combineReducers({
    receivedTasks,
    selectedTab
})

export default rootReducer
