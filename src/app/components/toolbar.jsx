import React, { useState } from 'react';

import './toolbar.css';
import * as PropTypes from "prop-types";

import undo from '../assets/toolbar-icons/undo.svg';
import redo from '../assets/toolbar-icons/redo.svg';
import bold from '../assets/toolbar-icons/bold.svg';
import underline from '../assets/toolbar-icons/underline.svg';
import justify from '../assets/toolbar-icons/justify.svg';
import italic from '../assets/toolbar-icons/italic.svg';
import more from '../assets/toolbar-icons/plus.svg';
import strike from '../assets/toolbar-icons/strikethrough.svg';
import subscript from '../assets/toolbar-icons/subscript.svg';
import superscript from '../assets/toolbar-icons/superscript.svg';
import addImg from '../assets/toolbar-icons/img1.svg';
import listIcon from '../assets/toolbar-icons/list.svg';
import fontSize from '../assets/toolbar-icons/fontSize.svg';
import insertTable from '../assets/toolbar-icons/insert-table.svg';
import insertLink from '../assets/toolbar-icons/link.svg';
import cancel from '../assets/toolbar-icons/cancel.svg';

import ImageSelect from "./imgselecter";



//APIs
import EditSelected from '../apis/editorSelectionAPI';



const orderListHandler = function(e){
    e.preventDefault();
    if(document.execCommand){
        document.execCommand("insertOrderedList");
    }
}

const unorderedListHandler = function(e){
    e.preventDefault();
    if(document.execCommand){
        document.execCommand("insertUnorderedList");
    }
}

const undoHandler=function(e){
    e.preventDefault();

    if(document.execCommand){
        document.execCommand("undo");
    }

}

const redoHandler = function(e){
    e.preventDefault();
    document.execCommand("redo");
}

const justifyHandler = function (e){
    e.preventDefault();

    if(document.execCommand){
        document.execCommand("indent");
    }

}

const strikeHandle=function(e){
    e.preventDefault();

    if(document.execCommand){
        document.execCommand("strikeThrough");
    }
}

const superScript=function (e){
    e.preventDefault();
     if(document.execCommand){
         document.execCommand("superscript");
     }
}

const subScript=function (e){
    e.preventDefault();
    if(document.execCommand){
        document.execCommand("subscript");
    }
}

const italicHandler=function (e){
    e.preventDefault();
    if(document.execCommand){
        document.execCommand("italic");
    }
}


const boldHandler=function(e){
    e.preventDefault();
    if(document.execCommand){
        document.execCommand("bold");
    }
    else{
        //hint:-
        //startContainer -style
        const ele = EditSelected.createEle();
        ele.style.fontWeight="bold";
        EditSelected.setEdit(ele);
        EditSelected.exec();
    }
}

const underlineHandler=function(e){
    e.preventDefault();

    if(document.execCommand){
        document.execCommand("underline");
    }else{
        const ele = EditSelected.createEle();
        ele.style.textDecoration="underline";
        EditSelected.setEdit(ele);
        EditSelected.exec();
    }
}

class LinkOpt extends  React.Component{

    createLink(e){
        e.preventDefault();


            if(document.getSelection().isCollapsed){
                alert("select the text which you want to covert to link first.");
            }else {
                if(document.execCommand){
                    const message =  prompt("Write the url.");
                    document.execCommand("createLink",false,message);
                }
            }

    }

    render(){
        return (
            <>
                <div onClick={this.createLink.bind(this)} className="cross_dropdown_link">
                    {this.props.icon}
                </div>
            </>
        );
    }
}

class TableOpt extends  React.Component{


    constructor(props) {
        super(props);

        this.inputs={
            rows:null,
            cols:null
        };
    }

    _genTable(rows,cols){
        let rows_ = Number(rows);

        let cols_ = Number(cols);

        if(cols_<1||rows_<1){
            alert("rows and cols must be greater then 0.");
            return document.createElement("span");
        }


        const table = document.createElement("table");
        table.border="border";
        table.style.borderCollapse="collapse";

        for(let r=0;r<rows_;r++){
             const row  = document.createElement("tr");

             for(let c=0;c < cols_;c++){
                 const col = document.createElement("td");
                 col.style.width="10vw";
                 col.innerText="col";
                 row.appendChild(col);
             }



             table.appendChild(row);
        }
        return table;
    }
    createTable(e){
        e.preventDefault();

        const  editor = document.getElementById("editor_box");

        let rows =  this.inputs.rows.value;
        let cols =  this.inputs.cols.value;
        let space =document.createElement("div");
        editor.appendChild(this._genTable(rows,cols));
        space.innerHTML="----------------";
        editor.appendChild(space);
    }

    render(){
        return (
            <>
                <div className="cross_dropdown_table">
                    {this.props.icon}
                    <div className="cross_dropdown-content_table">
                        <p id={"rows"}>
                            Rows:
                        </p>
                        <input ref={
                            r=>{
                                this.inputs.rows =r;
                            }
                        } type={"number"} id={"rows"} name={"row"}/>
                        <p id={"cols"}>
                            Columns:
                        </p>
                        <input ref={
                            r=>{
                                this.inputs.cols=r;
                            }
                        } type={"number"} id={"cols"} name={"cols"} />
                        <button onClick={this.createTable.bind(this)}>
                            create
                        </button>;
                    </div>
                </div>
            </>
        );
    }
}

class ListOpt extends  React.Component{

    render(){
        return (
                 <>
                     <div className="cross_dropdown_list">
                         {this.props.icon}
                         <div className="cross_dropdown-content_list">
                             <button onClick={orderListHandler}>
                                  ordered list
                             </button>
                             <button onClick={unorderedListHandler}>
                                 unordered list
                             </button>
                         </div>
                     </div>
                </>
        );
    }
}

class FontSize extends React.Component {


    constructor(props) {

        super(props);
        this.state = {
            size: 20
        };

    }

    checkLimit(size){
        if(size<10||size>50){
            alert("limit crossed");
            return true;
        }
        return false;
    }
    increment() {

        let size = this.state.size;

        if(this.checkLimit(size+4)){
            return;
        }

        this.setSize(this.state.size+4);

        this.setState({
            size: this.state.size + 4
        });
    }

    setSize(size){
        if(EditSelected){
            const ele = EditSelected.createEle();
            ele.style.fontSize=size+"px";

            EditSelected.setEdit(ele);
            EditSelected.exec();
        }
    }
    decrement() {

        let size = this.state.size;

        if(this.checkLimit(size-4)){
            return;
        }
        this.setSize(this.state.size-4);

        this.setState({
            size: this.state.size - 4
        });
    }

    render() {
        //setting size
/*
* this.setSize(this.state.size+1);

* */
        return (
            <div className="cross_dropdown">
                {this.props.icon}
                <div className="cross_dropdown-content">
                    <p className={"toolbar_text"}>Font size</p>

                    <span> <button className={"cross_btn-minus"} onClick={e => this.decrement()}>-</button></span>
                    <span className={"cross_show-size"}>{this.state.size}</span>
                    <span><button className={"cross_btn-plus"} onClick={e => this.increment()}>+</button></span>
                    <br />
                </div>
            </div>
        );
    }
}


class ColorSelector extends React.Component {

    onChange(e) {
        console.log(e.target.value);

        const ele  = EditSelected.createEle();
        ele.style.color = `${e.target.value}`;

        EditSelected.setEdit(ele);
        EditSelected.exec();
    };


    render() {

        return (
            <input type={"color"} name={"color"} onChange={this.onChange} />
        );
    }
}

function Icon({ icon, height, width, handler }) {

    return (height && width) ? <img
        id={"iconImg"}
        src={icon}
        onChange={handler || function (e) { }}
        style={{ "height": height, "width": width }}
        alt={'loading'} /> :
        <img src={icon}
             id={"iconImg"}
            onClick={handler || function (e) { }}
            alt={'loading'} />;
}

class ToolButton extends React.Component {

    render() {
        return (
            <span style={this.props.styles || {}} id={"_toolButton"}>
                {this.props.child}
                {this.props.children}
            </span>
        );
    }
}

ToolButton.propTypes = {
    child: PropTypes.node
};

function MobileView() {
    const [state, setState] = useState({ showMore: false });

    const toggle = e => {
        setState(pre => {
            return { showMore: !pre.showMore };
        })
    };
    const show = <>
        <ToolButton>
            <ImageSelect icon={<Icon height={"20px"} width={"20px"} icon={addImg} />}/>
        </ToolButton>
        <ToolButton>
            <FontSize icon={<Icon icon={fontSize} />} />
        </ToolButton>
        <ToolButton>
            <TableOpt icon={<Icon icon={insertTable}/>} />
        </ToolButton>
        <ToolButton>
            <ListOpt icon={<Icon icon={listIcon} />}/>
        </ToolButton>
        <ToolButton>
             <LinkOpt icon={<Icon icon={insertLink}/>}/>
        </ToolButton>

        <ToolButton>
            <ColorSelector />
        </ToolButton>
        <ToolButton child={<Icon handler={strikeHandle} icon={strike} />} />
        <ToolButton child={<Icon handler={subScript} icon={subscript} />} />
        <ToolButton child={<Icon handler={superScript} icon={superscript} />} />

        </>;
    return (
        <div id={"_toolbar"}>
            {
                state.showMore && show
            }
            {
                !state.showMore && <>
                    <ToolButton child={<Icon handler={undoHandler} icon={undo} />} />
                    <ToolButton child={<Icon handler={redoHandler}
                                             icon={redo} />} />
                    <ToolButton child={<Icon handler={boldHandler} icon={bold} />} />
                    <ToolButton child={<Icon handler={italicHandler} icon={italic} />} />
                    <ToolButton child={<Icon handler={underlineHandler} icon={underline} />} />
                    <ToolButton child={<Icon handler={justifyHandler} icon={justify} />} />
                </>
            }
            <ToolButton styles={{ "float": "right" }} child={<Icon handler={toggle} icon={(state.showMore && cancel) || more} />} />
        </div>
    );
}




function DesktopView() {


    return (
        <div id={"_toolbar"}>
            <ToolButton>
                <ImageSelect icon={<Icon height={"20px"} width={"20px"} icon={addImg} />}/>
            </ToolButton>
            <ToolButton child={<Icon handler={undoHandler}
                                     icon={undo} />} />
            <ToolButton child={<Icon handler={redoHandler}
                                     icon={redo} />} />
            <ToolButton child={<Icon handler={boldHandler} icon={bold} />} />
            <ToolButton child={<Icon handler={italicHandler}
                                      icon={italic} />} />
            <ToolButton>
                <TableOpt icon={<Icon icon={insertTable}/>} />
            </ToolButton>
            <ToolButton child={<Icon handler={underlineHandler} icon={underline} />} />
            <ToolButton child={<Icon handler={justifyHandler} icon={justify} />} />
            <ToolButton child={<Icon handler={strikeHandle} icon={strike} />} />
            <ToolButton child={<Icon handler={subScript} icon={subscript} />} />
            <ToolButton child={<Icon handler={superScript}
                                     icon={superscript} />} />


            <ToolButton>
                <ListOpt icon={<Icon icon={listIcon} />}/>
            </ToolButton>

            <ToolButton child={<ColorSelector />} />

            <ToolButton>
                <FontSize icon={<Icon icon={fontSize} />} />
            </ToolButton>

            <ToolButton>
                <LinkOpt icon={<Icon icon={insertLink} />}/>
            </ToolButton>
        </div>);
}

export default class ToolBar extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            portableView: window.outerWidth > 900 ? DesktopView() : <MobileView />
        };
        this.state.isLessThen900px = setState => query => {
            if (query.matches) {
                setState({
                    portableView: <MobileView />
                });
            } else {
                setState({
                    portableView: DesktopView()
                });
            }
        };
        this.state.mediaQuery = window.matchMedia("(max-width:900px)");

        this.state.mediaQuery.addListener(this.state.isLessThen900px(this.setState.bind(this)));
    }


    render() {
        return (
            <>
                {this.state.portableView}
            </>
        );
    }
}