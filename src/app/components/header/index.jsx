import React from 'react'

import './header.css';


//Header
export default class Header extends React.Component {

    open(e) {

        e.preventDefault();
        const homePage = document.getElementById('home_page');

        const metaConatiner = document.getElementById('meta_container');


        homePage.style.display = "none";

        metaConatiner.style.display = "block";

    }
    render() {
        return (

            <div id={"_header"}>
                <div id={"left_header"}><button onClick={this.open.bind(this)} id={'post_btn'}>Post</button></div>
                <div id={"right_header"}><button id={'cancel_btn'}>Exit</button></div>
            </div>
        );
    }

}