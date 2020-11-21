import React from 'react';

import './postHandlerStyle.css';
import { Loading } from '../util-components';


class PublishPost extends React.Component {


  constructor(props) {

    super(props);

    //state
    this.state = {
      timeout: 30000,
      sending: false,
    };

    //form refrences
    this.inputs = {

      file: null,
      title: null,
    };

  }



//start posting data to server 
  async onPost(title, thum, timeout) {

    //upload post
    //change window.location oo the main UI
    //window.location.set("http:/host/home");

    const content = document.getElementById('editor_box').innerHTML;

    const fileData = new Blob([content], { type: "text/html" });

    const fileName = document.cookie.split('=').pop();

    const id = document.cookie.split('=')[1].split('-')[0];

    const formData = new FormData();

    formData.append("file", fileData, fileName);
    formData.append("id", id);
    formData.append('thum', thum);
    formData.append("title", title);

    await fetch(`http://localhost:3000/blog/${document.cookie.split('=')[1]}/save/post`, {
      method: "POST",
      headers: {},
      body: formData
    }).then(async res => {
      //let result = await res.json();
      const uid = fileName;

      clearTimeout(timeout);
      document.location = `http://localhost:3000/blog/${uid}/home/posts`;

    }).catch(err => {
      throw err;
    });


  }


  //sending image
  async sendImage(image) {

    const uid = document.cookie.split('=').pop();

    const formData = new FormData();

    formData.append("image", image, image.name);

    const result = await fetch(`http://localhost:3000/blog/${uid}/save/img/${image.name}`, {
      method: "POST",
      headers: {},//setting header will result in duplication as it is implicitly handled.[can cause error:out of boundary]
      body: formData
    });


    if (result.ok) {
      let res = await result.json();
      return res.data.result.url;
    }
  }


  //start publishing
  async startPublishing(title, imageFile) {

    const timeout = setTimeout(
      () => {
        alert("server is down.");

        this.props.closeBtn();
      },
      this.state.timeout
    );


    //start loading icon
    this.setState({
      sending: true
    });

    try {
      const thumUrl = await this.sendImage(imageFile);

      await this.onPost(title, thumUrl, timeout);

    } catch (err) {

      console.error(err);

      this.setState({
        sending: false
      });

      alert("error happended during publishing post.Unable to save post.");
      this.props.closeBtn();

    }

  }


  //publish method
  publish(e) {


    e.preventDefault();

    const file = this.inputs.file.files[0];

    const title = this.inputs.title.value;

    this.startPublishing(title, file);
  }


  render() {

    return (
      <>
        <center>
          <div>
            {
              this.state.sending ? <Loading /> : <>
                <ButtonBack closeBtn={e => this.props.closeBtn()} />
                <form action={"#"} id={"meta_form"}>
                  <fieldset>
                    <legend>Meta info</legend>
                    <label htmlFor={"title"}>Title Name:</label>
                    <input
                      ref={

                        r => {

                          this.inputs.title = r;
                        }
                      }
                      type={"text"} id={"title"} required />
                    <br />
                    <label htmlFor={"thum"}>Thumbnail image:</label>
                    <input
                      ref={
                        r => {
                          this.inputs.file = r;
                        }
                      }
                      type={"file"} id={"thum"} required />

                    <input onClick={this.publish.bind(this)} type={"submit"} id={"meta_submit_btn"} value={"publish"} />
                  </fieldset>
                </form>

              </>
            }
          </div>
        </center>
      </>
    );
  }
}


class ButtonBack extends React.Component {


  render() {
    return (
      <div id={"meta_back"}>
        <button onClick={e => this.props.closeBtn(e)}>back</button>
      </div>
    );
  }
}

export class PublishBox extends React.Component {



  constructor(props) {
    super(props);

    this.container = {
      ref: null,
    };
  }



  close() {

    const homePage = document.getElementById("home_page");

    this.container.ref.style.display = "none";

    homePage.style.display = "block";
  }

  render() {

    return (
      <div
        ref={
          r => {
            this.container.ref = r;
          }
        }
        id="meta_container">
        <div id="meta_content">

          <PublishPost closeBtn={this.close.bind(this)} />
        </div>
      </div>
    );
  }
}
