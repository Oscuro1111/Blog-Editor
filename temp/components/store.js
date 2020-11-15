import {createStore} from 'redux';

import {addTodo, toggleTodo,setVisibilityFilter,VisibilityFilters} from './action';
import todoApp from './reducers';

const store = createStore(todoApp);
export default function check(){ 
console.log(store.getState());

const unsubscribe  = store.subscribe(_=>console.log('ok'));

store.dispatch(addTodo("Learn about actions"));
store.dispatch(addTodo("Learn about reducers"));
store.dispatch(addTodo("Learn about store"));

console.log(store.getState());

store.dispatch(toggleTodo(0));
store.dispatch(toggleTodo(1));

store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));
console.log(store.getState());

return unsubscribe;
}