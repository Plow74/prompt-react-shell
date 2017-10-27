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

function tasks(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: []
    },
    action)
{
    switch (action.type) {
        case types.INVALIDATE_TAB:
            return Object.assign({}, state, {
                didInvalidate: true
            });
            break;
        case types.REQUESTS_TASKS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
            break;
        case types.RECEIVE_TASKS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.tasks,
                lastUpdated: action.receivedAt
            });
            break;
        default:
            return state;
            break;
    }
}

function tasksForTab(state = {}, action) {
    switch (action.type) {
        case types.INVALIDATE_TAB:
        case types.RECEIVE_TASKS:
        case types.REQUESTS_TASKS:
            return Object.assign({}, state, {
                [action.selectedTabIndex]: tasks(state[action.selectedTabIndex], action)
            });
            break;
        default:
            return state;
            break;
    }
}

const rootReducer = combineReducers({
    tasksForTab,
    selectedTab
})

export default rootReducer
