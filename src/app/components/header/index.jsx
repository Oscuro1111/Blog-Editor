import React from 'react'

import './header.css';


//Header
export default class Header extends React.Component{

    render(){
        return (
            <div id={"_header"}>
                <div id={"left_header"}><button id={'post_btn'}>Post</button></div>
                <div id={"right_header"}><button id={'cancel_btn'}>Cancel</button></div>
            </div>
        );
    }

}