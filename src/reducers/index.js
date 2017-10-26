import types from '../constants/';
import { combineReducers } from 'redux'

export const initialState = {
    todos: [],
    deleted: {},
    disableAddTodo: true,
    disableUndelete: true,
};

/*export const redditInitialState = {
    posts: []
}

export const tasksInitialState = {
    tasks: []
};*/

function todo (state = initialState, action) {
    switch (action.type) {

        case types.SUBMIT_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: action.id,
                        text: action.text,
                    },
                ],
                disableAddTodo: true,
            };
        case types.GET_TASKS:
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                ],
            };
        case types.DELETE_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos.filter(todo => (
                        todo.id !== action.id
                    )),
                ],
                deleted: state.todos.filter(todo => todo.id === action.id)[0],
                disableUndelete: false,
            };

        case types.UNDELETE_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    state.deleted,
                ],
                deleted: {},
                disableUndelete: true,
            };

        case types.INPUT_CHANGED:
            if (action.inputText) {
                return {
                    ...state,
                    disableAddTodo: false,
                };
            }
            return {
                ...state,
            };

        default:
            return state;
    }
}

function selectedTab(state = 0, action){
    switch (action.type){
        case types.SELECT_TAB:
            return action.selectedTabIndex;
        default:
            return state
    }
}

function selectedSubreddit(state = 'reactjs', action) {
    switch (action.type) {
        case types.SELECT_SUBREDDIT:
            return action.subreddit;
        default:
            return state
    }
}

function posts(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: []
    },
    action
) {
    switch (action.type) {
        case types.INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case types.REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case types.RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

function tasks(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: []
    },
    action
) {
    switch (action.type) {
        case types.INVALIDATE_TAB:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case types.REQUESTS_TASKS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case types.RECEIVE_TASKS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.tasks,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

function postsBySubreddit(state = {}, action) {
    switch (action.type) {
        case types.INVALIDATE_SUBREDDIT:
        case types.RECEIVE_POSTS:
        case types.REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.subreddit]: posts(state[action.subreddit], action)
            })
        default:
            return state
    }
}

function tasksForTab(state = {}, action) {
    switch (action.type) {
        case types.INVALIDATE_TAB:
        case types.RECEIVE_TASKS:
        case types.REQUESTS_TASKS:
            return Object.assign({}, state, {
                [action.selectedTabIndex]: tasks(state[action.selectedTabIndex], action)
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    todo,
    postsBySubreddit,
    selectedSubreddit,
    tasksForTab,
    selectedTab
})

export default rootReducer
