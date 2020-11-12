import React from "react";
import './style-1.css';

import loader from '../../assets/toolbar-icons/loader2.gif';


class Loading extends  React.Component{

    render() {

        return (
            <center>
            <div id={"loader"}>
                <img src={loader} alt={"loading..."}/>
            </div>
            </center>
        );
    }
}

class UploadFile extends React.Component{


    constructor(props) {
        super(props);
        this.state={
            uploading:false,
            done:false,
            timeout:10000,
        }
        this.inputs={
            file:null,
            fileUrl:null
        }

    }


   async startUploading(){
        const file = this.inputs.file.files[0];
        var base64=null;
        const initConvert = new Promise((
            resolve,reject
        )=>{
            const fileReader = new FileReader();
               fileReader.onloadend=function(){

                base64=fileReader.result.substr(fileReader.result.indexOf(',')+1);
                resolve(base64);
            }
            fileReader.readAsDataURL(file);
            
        });

        await initConvert;
        
        this.setState({
            uploading:true,
        });
        const result = await fetch("https://214b8382-7e22-48e8-95f7-617ca99e5b31.mock.pstmn.io/img",{
            method:"POST",
            body:{image:base64}
        });
        if(result.ok){

            let res = await result.json();
            this._doneUploading(`${res.id}`);
        }

        return result;
    }

    addImg(e){
        e.preventDefault();

        if(this.inputs.fileUrl.value.length>0){
            this._doneUploading(this.inputs.fileUrl.value);
        }
    }

    _doneUploading(imgUrl){
        const editor = document.getElementById("editor_box");

        const imgEle = document.createElement("img");
        const done   = (e)=>this.props._done(e);
        //lazy load
        imgEle.onload=function(e){
            const img_ = document.createElement("img");
            img_.src=this.src;
            img_.id="editor_img";
            img_.style.height="30vw";
            img_.style.width="60vw";
            editor.appendChild(img_);
            done(e);
        }

        imgEle.src=imgUrl;
    }

    _onError(){

    }

    render(){
        return (
            <>
                {
                  this.state.uploading!==false?<Loading />:(
                      <fieldset>
                          <legend>
                              Upload image
                          </legend>
                          <label htmlFor={"cross-dev-img-url"}>
                              Url of image:
                          </label>
                          <form action={"#"}>
                              <input ref={
                                  r=>{
                                      this.inputs.fileUrl=r;
                                  }
                              } id={"cross-dev-img-url"} type={"text"} name={"url"} required/>
                              <button onClick={this.addImg.bind(this)} id={"d-add-btn"}>
                                  add
                              </button>
                          </form>
                          <hr />
                          {"OR"}
                          <br/>
                          <label htmlFor={"cross-dev-img-file"}>
                              select image file:
                          </label>
                      <form action={"#"}>
                      <input ref={r=>{
                          this.inputs.file=r;
                      }} id={"cross-dev-img-file"} type={"file"} name={"url"}  required/>
                      <button onClick={
                          e=>{
                              e.preventDefault();
                              const res =this.startUploading();
                              res.then(msg=>{
                                  console.log(msg);
                              })
                          }
                      } id={"d-upload-btn"}>
                          upload
                      </button>
                      </form></fieldset>
                  )
                }
                </>
        );

    }
}




export  class DialogBox extends React.Component{

    constructor(props) {
        super(props);

        this.state ={
            close:"none",
            open:"block",
            current:"none",
        }

        this.dbox={
           ref_:null,
            closeBtn:null
        }
    }

    disableCloseBtn(){
        this.dbox.closeBtn.disabled=true;
    }
    close(e){
        e.preventDefault();
        const home_page     = document.getElementById("home_page");

        this.dbox.ref_.style.display = "none";
        home_page.style.display="block";
    }

    render(){
        return (
            <div ref={
                r=>{
                    this.dbox.ref_=r;
                }
            } id={"d-box"}>
                <div id={"d-content"}>
                    <div id={'d-controller'}>
                              <span  id={"d-controller-right"}>
                                  <button ref={
                                      r=>{
                                          this.dbox.closeBtn=r;

                                      }
                                  } onClick={this.close.bind(this)}>exit</button>
                             </span>
                    </div>
                    <br/>
                    <hr />
                    <div id={"cross-dev-main-content"}>
                            <UploadFile  disableCloseBtn ={this.disableCloseBtn.bind(this)} _done={this.close.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}

