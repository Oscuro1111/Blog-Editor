import React from 'react'

import './header.css';

import {Loading} from '../util-components';

//Header
export default class Header extends React.Component{


    constructor(props){
        super(props);

        this.state={sending:false};
    }
    onPost(e){
        e.preventDefault();

        //upload post
        //change window.location oo the main UI
        //window.location.set("http:/host/home");

        const content = document.getElementById('editor_box').innerHTML;
        
        const thumnail = prompt("Thumnail image url?");

        const fileData = new Blob([content],{type:"text/html"});

        const fileName  = document.cookie.split('=').pop();
       
        const id       = document.cookie.split('=')[1].split('-')[0];

        const formData = new FormData();

        formData.append("file",fileData,fileName);
        formData.append("id",id);
        formData.append('thum',thumnail);
        formData.append("title",id);//depricated
        

        fetch(`http://localhost:3000/blog/${document.cookie.split('=')[1]}/save/post`,{
            method:"POST",
            headers:{},
            body:formData
        }).then(async res=>{
            let result = await res.json();


            const uid = fileName;
            window.onbeforeunload=null;

            document.location = `http://localhost:3000/blog/${uid}/home/posts`;
          
        }).catch(err=>{
            console.error(err);
        });

        this.setState({
            sending:true
        });

    }
    render(){
        return (

           <div id={"_header"}>
               {
                   this.state.sending?<Loading />
                   :<>
                   <div id={"left_header"}><button onClick={this.onPost.bind(this)} id={'post_btn'}>Post</button></div>
                   <div id={"right_header"}><button id={'cancel_btn'}>Exit</button></div>
                   </>   
               }
            </div>
        );
    }

}