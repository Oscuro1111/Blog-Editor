
import {createStore} from 'redux';

export function storeCreator(reducers,applyMiddleware=null){
    var store  = createStore(reducers);
    if(applyMiddleware){
        return applyMiddleware(store);
    }else{
        return Object.assign({}, store);
    }
}

export function applyMiddleware(...middlewares) {
    middlewares.reverse();
    return store=>{

    let dispatch = store.dispatch;
    middlewares.forEach(middleware=>dispatch=middleware(store)(dispatch));
    return Object.assign({},store,{dispatch});
};
}
