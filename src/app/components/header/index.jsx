import React from 'react'

import './header.css';


//Header
export default class Header extends React.Component{

    render(){
        return (
            <div id={"_header"}>
                <div id={"left_header"}>Post</div>
                <div id={"right_header"}>Cancel</div>
            </div>
        );
    }

}