import React from "react";

import {Loading} from '../util-components'; 


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


        this.props.disableCloseBtn(true);

        let timeout = setTimeout(
            ()=>{
                this.props._done();
            },
            this.state.timeout
        );

        const formData = new FormData();


        formData.append("image",file,file.name);

        /*
        * const initConvert = new Promise((
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

        * */
        this.setState({
            uploading:true,
        });
        const uid= document.cookie.split('=').pop();
  
        const result = await fetch(`http://localhost:3000/blog/${uid}/save/img/${file.name}`,{
            method:"POST",
            headers: {},//setting header will result in duplication as it is implicitly handled.[can cause error:out of boundary]
            body:formData
        });

        if(result.ok){
            clearTimeout(timeout);
            let res = await result.json();
            this._doneUploading(`${res.data.result.url}`);
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
        const done   = (e)=>{
            this.props._done(e);


            this.setState({
                uploading:false
            });
            this.props.disableCloseBtn(false);
        };

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

                              res.catch(err=>{
                                  console.error(err);
                              });
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

    disableCloseBtn(flg){
        this.dbox.closeBtn.disabled=flg;
    }
    close(e){
        if(e){
            e.preventDefault();
        }
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

