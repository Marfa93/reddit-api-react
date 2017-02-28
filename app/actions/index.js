import fetch from 'isomorphic-fetch';
import * as types from './types';

export function selectSubreddit(subreddit) {
    return {
        type: types.SELECT_SUBREDDIT,
        subreddit
    };
}

export function invalidateSubreddit(subreddit) {
    return {
        type: types.INVALIDATE_SUBREDDIT,
        subreddit
    };
}

function requestPosts(subreddit) {
    return {
        type: types.REQUEST_POSTS,
        subreddit
    };
}

function receivePosts(subreddit, json) {
    return {
        type: types.RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    };
}

function fetchPosts(subreddit) {
    return (dispatch) => {
        dispatch(requestPosts(subreddit));
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(subreddit, json)));
    };
}

function shouldFetchPosts(state, subreddit) {
    const posts = state.postsBySubreddit[subreddit];
    if (!posts) {
        return true;
    }
    if (posts.isFetching) {
        return false;
    }
    return posts.didInvalidate;
}

export function fetchPostsIfNeeded(subreddit) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit)) {
            return dispatch(fetchPosts(subreddit));
        }
        return Promise.resolve();
    };
}
