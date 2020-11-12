import React from 'react'

import './header.css';


//Header
export default class Header extends React.Component{


    onPost(e){
        e.preventDefault();
        //const content = getElementById("editor_box").innerHTML;

        //this.props.getPost(content);
    }
    render(){
        return (
            <div id={"_header"}>
                <div id={"left_header"}><button onClick={this.onPost.bind(this)} id={'post_btn'}>Post</button></div>
                <div id={"right_header"}><button id={'cancel_btn'}>Cancel</button></div>
            </div>
        );
    }

}