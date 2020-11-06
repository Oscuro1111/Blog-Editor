import React from 'react';
import  './cstyle.css';
import Header from './components/header';
import ToolBar from "./components/toolbar";
//toolbar
export default class Home extends React.Component{

    render(){

        return (<>
                <Header />
                <ToolBar />
        </>);
    }
} 