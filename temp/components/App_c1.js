import React from 'react';
import Footer from './Footer';
import AddTodo from './AddTodo';
import VisibleTodoList from './containers/VisibilityTodoList';
const AppSubp1 = ()=>(
    <div>
      <AddTodo/>
      <VisibleTodoList />
      <Footer/>
    </div>
);

export default AppSubp1;
