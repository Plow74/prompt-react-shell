import types from '../constants/';
import fetch from 'isomorphic-fetch'

let todoId = 0;

const nextId = () => {
    todoId += 1;
    return todoId;
};

const actions = {
    submitTodo(text) {
        return {
            type: types.SUBMIT_TODO,
            id: nextId(),
            text,
        };
    },

    deleteTodo(id) {
        return {
            type: types.DELETE_TODO,
            id,
        };
    },

    undeleteTodo() {
        return {
            type: types.UNDELETE_TODO,
        };
    },

    inputChanged(inputText) {
        return {
            type: types.INPUT_CHANGED,
            inputText,
        };
    }
};

function fetchPosts(posts) {
    return dispatch => {
        dispatch(requestPosts(posts));
        return fetch(`http://www.filltext.com/?rows=50&fname={firstName}&lname={lastName}&tel={phone|format}&address={streetAddress}&city={city}&state={usState|abbr}&zip={zip}&status={numberRange|0,%203}&location={lorem|3}&date={date}&pretty=true`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(posts, json)))
    }
}

function fetchTasks(tasks){
    return dispatch => {
        dispatch(requestTasks(tasks));
        return fetch(`http://www.filltext.com/?rows=50&fname={firstName}&lname={lastName}&tel={phone|format}&address={streetAddress}&city={city}&state={usState|abbr}&zip={zip}&status={numberRange|0,%203}&location={lorem|3}&date={date}&pretty=true`)
            .then(response => response.json())
            .then(json => dispatch(receiveTasks(tasks, json)))
    }
}

function shouldFetchPosts(state, subreddit) {
    const posts = state.postsBySubreddit[subreddit]
    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
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

export function fetchPostsIfNeeded(subreddit) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit)) {
            return dispatch(fetchPosts(subreddit))
        }
    }
}

export function fetchTasksIfNeeded(selectedTabIndex){
    return (dispatch, getState) => {
        if (shouldFetchTasks(getState(), selectedTabIndex)) {
            return dispatch(fetchTasks(selectedTabIndex))
        }
    }
}

export function selectSubreddit(subreddit) {
    return {
        type: types.SELECT_SUBREDDIT,
        subreddit,
    }
}

export function selectTab(selectedTabIndex) {
    return{
        type: types.SELECT_TAB,
        selectedTabIndex,
    }
}

export function invalidateSubreddit(subreddit) {
    return {
        type: types.INVALIDATE_SUBREDDIT,
        subreddit,
    }
}

export function invalidateTab(selectedTabIndex) {
    return{
        type: types.INVALIDATE_TAB,
        selectedTabIndex,
    }
}

export function requestPosts(posts) {
    return {
        type: types.REQUEST_POSTS,
        posts,
    }
}

export function requestTasks(tasks) {
    return {
        type: types.REQUESTS_TASKS,
        tasks,
    }

}

export function receivePosts(posts, json) {
    return {
        type: types.RECEIVE_POSTS,
        posts: json,
        receivedAt: Date.now()
    }
}

export function receiveTasks(tasks, json) {
    return {
        type: types.RECEIVE_TASKS,
        tasks: json,
        receivedAt: Date.now()
    }
}

export default actions;
