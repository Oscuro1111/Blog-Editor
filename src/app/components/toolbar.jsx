import React ,{useState}from 'react';

import './toolbar.css';
import * as PropTypes from "prop-types";

import undo from '../assets/toolbar-icons/undo.svg';
import redo from '../assets/toolbar-icons/redo.svg';
import bold from '../assets/toolbar-icons/bold.svg';
import underline from  '../assets/toolbar-icons/underline.svg';
import justify from '../assets/toolbar-icons/justify.svg';
import italic from '../assets/toolbar-icons/italic.svg';
import more from '../assets/toolbar-icons/plus.svg';
import strike from '../assets/toolbar-icons/strikethrough.svg';
import subscript from '../assets/toolbar-icons/subscript.svg';
import superscript from '../assets/toolbar-icons/superscript.svg';
import addImg  from '../assets/toolbar-icons/img1.svg';
import listIcon from '../assets/toolbar-icons/list.svg';
import fontSize from '../assets/toolbar-icons/fontSize.svg';
import insertTable from '../assets/toolbar-icons/insert-table.svg';
import insertLink from '../assets/toolbar-icons/link.svg';
import cancel  from '../assets/toolbar-icons/cancel.svg';
function Icon({icon,height,width,handler}){

    return (height&&width)?<img
            src={icon}
            onChange={handler||function(e){}}
            style={{"height":height,"width":width}}
            alt={'loading'}/>:
        <img src={icon}
             onClick={handler||function(e){}}
             alt={'loading'}/>;
}

class ToolButton extends React.Component{

    render(){
        return (
            <span style={this.props.styles||{}} id={"_toolButton"}>
                {this.props.child}
            </span>
        );
    }
}

ToolButton.propTypes = {
    child:PropTypes.node
};





function MobileView(){
     const  [state,setState]= useState({showMore:false});

     const toggle = e => {
         setState(pre=>{
             return {showMore: !pre.showMore};
         })
     };
    const show = <>
        <ToolButton child={<Icon icon={strike}/>}/>
        <ToolButton child={<Icon icon={subscript}/>}/>
        <ToolButton child={<Icon icon={superscript}/>}/>
        <ToolButton child={<Icon height={"20px"} width={"20px"} icon={addImg}/>}/>
        <ToolButton child={<Icon icon={listIcon}/>}/>

        <ToolButton child={<input type={"color"} name={"color"} onChange={function (e) {

            console.log(e.target.value);
        }

        }/>}/>
        <ToolButton child={<Icon icon={fontSize}/>}/>
        <ToolButton child={<Icon icon={insertTable}/>}/>
        <ToolButton child={<Icon icon={insertLink}/>}/>
    </>;
    return (
        <div id={"_toolbar"}>
            {
                state.showMore&&show
            }
            {
                !state.showMore&&<>
                    <ToolButton child={<Icon icon={undo} />} />
                    <ToolButton child={<Icon icon={redo} />} />
                    <ToolButton child={<Icon icon={bold} />} />
                    <ToolButton child={<Icon icon={italic} />} />
                    <ToolButton child={<Icon icon={underline} />}/>
                    <ToolButton child={<Icon icon={justify} />} />
                </>
            }
            <ToolButton styles={{"float":"right"}} child={<Icon handler={toggle} icon={(state.showMore&&cancel)||more} />} />
        </div>
    );
}

function DesktopView(){


    return (
        <div id={"_toolbar"}>
            <ToolButton child={<Icon icon={undo} />} />
            <ToolButton child={<Icon icon={redo} />} />
            <ToolButton child={<Icon icon={bold} />} />
            <ToolButton child={<Icon icon={italic} />} />
            <ToolButton child={<Icon icon={underline} />}/>
            <ToolButton child={<Icon icon={justify} />} />
            <ToolButton child={<Icon icon={strike} />} />
            <ToolButton child={<Icon icon={subscript} />} />
            <ToolButton child={<Icon icon={superscript} />} />
            <ToolButton child={<Icon height={"20px"} width={"20px"} icon={addImg} />} />
            <ToolButton child={<Icon icon={listIcon} />} />

            <ToolButton child={<input type={"color"} name={"color"} onChange={function(e){

                     console.log(e.target.value);
            }
            }/>}/>
            <ToolButton child={<Icon icon={fontSize} />} />
            <ToolButton child={<Icon icon={insertTable} />} />
            <ToolButton child={<Icon icon={insertLink} />} />
        </div>);
}

export default  class ToolBar extends React.Component{

    
    constructor(props) {
        super(props);
        
        this.state = {
            portableView : window.outerWidth>900?DesktopView():<MobileView />
        };
        this.state.isLessThen900px =setState=>query=>{
             if(query.matches){ 
                 setState({
                     portableView: <MobileView />
                 });
             }else{
                 setState({
                     portableView: DesktopView()
                 });
             }
        };
        this.state.mediaQuery = window.matchMedia("(max-width:900px)");

        this.state.mediaQuery.addListener(this.state.isLessThen900px(this.setState.bind(this)));
    }


    render(){
        return (
            <>
                {this.state.portableView}
            </>
        );
    }
}