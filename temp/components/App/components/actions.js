import fetch from 'cross-fetch';
import Raven from 'raven-js';

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';

export function selectSubreddit(subreddit){
    return {
        type:SELECT_SUBREDDIT,
        subreddit,
    };
}

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export function invalidateSubreddit(subreddit){
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit,
    };
}

export const REQUEST_POSTS = 'REQUEST_POSTS';

export const requestPosts = subreddit=>({type: REQUEST_POSTS, subreddit});

export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const receivePosts = (subreddit, json)=>({
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child=>child.date),
    receivedAt: Date.now(),
});

// First thunk action creator
export function fetchPosts(subreddit){
    //thunk middle know how to handle 
    return function(dispatch){
        //First dispatch: the app state is updated to inform
        //that the API call is starting
        dispatch(requestPosts(subreddit));
  
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then(
                response=>response.json(),
                error=>console.log('An error occurred ', error)
            )
            .then(json=>dispatch(receivePosts(subreddit, json))
            );
    };
}