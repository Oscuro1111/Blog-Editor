import React from 'react';
import './editor.css';
export default class Editor extends React.Component{
 constructor(props) {
     super(props);
     window.onbeforeunload=function (e){
         //save the data to database as draft
         //savePost(data,"draft");
         return "";
     }
     this.state={
         title:null,
         data:null
     };

 }

    save(editor){
        this.setState({

            data:editor&&editor.innerHTML
        });
    }
    render(){
        return (<>
             <div id={
                 "title_box"
             }
                  contentEditable={true}
             >
                 {"Title..."}
             </div>
             <br />
            <div  onChange={e=>this.save(e.target)}
                  id={"editor_box"}  contentEditable={true} >
                {
                    this.state.data&&this.state.data
                }
                {
                    this.state.data==null&&"Text..."
                }
            </div>
            </>
        );
    }
}