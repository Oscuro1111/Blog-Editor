import React from 'react';

import 'filepond/dist/filepond.min.css'
import './imgSelect.css';



export default class ImageSelect extends React.Component{

    constructor(props) {
        super(props);

        this.state={
            reset:true
        }
    }

    open(e){
        e.preventDefault();

        const dbox = document.getElementById("d-box");
        const home_page     = document.getElementById("home_page");
        home_page.style.display="none";
        dbox.style.display="block";
    }
    render(){

        return (
            <>
                <div  className="cross_dropdown_img">
                    <span onClick={this.open.bind(this)}>{this.props.icon}</span>
                </div>
            </>
        );
    }
}
