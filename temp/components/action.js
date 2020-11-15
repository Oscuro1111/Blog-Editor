//Types of action for the payload of the store 
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

let nextTodoId = 0;
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE',
};

//Action creator 
export function addTodo(text){
    return {type: ADD_TODO, id: ++nextTodoId, text};//Action 
}

export function toggleTodo(index){
    return {type: TOGGLE_TODO,index};
} 

export function setVisibilityFilter(filter){
    return {type: SET_VISIBILITY_FILTER, filter};
}
