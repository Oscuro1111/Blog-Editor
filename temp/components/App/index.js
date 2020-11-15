import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createStore , applyMiddleware} from 'redux';
import {selectSubreddit, fetchPosts} from './components/actions';
import rootReducer from './components/reducers';

const loggerMiddleware = createLogger();
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware, //lets us dispatch function
        loggerMiddleware //neat Middleware that logs actions
    )
);

const Test  = async () => {
store.dispatch(selectSubreddit('reactjs'));

 console.log("Waiting:::",await store.dispatch(fetchPosts('reactjs')).then((d)=>console.log( 'State: ',d)));

}

export default Test;
