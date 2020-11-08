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

class LinkOpt extends  React.Component{

    render(){
        return (
            <>
                <div className="cross_dropdown_link">
                    {this.props.icon}
                    <div className="cross_dropdown-content_link">
                        <p id={"name"}>
                            Name:
                        </p>
                        <input type={"text"} id={"name"} name={"text"}/>

                        <p id={"link"}>
                            Link:
                        </p>
                        <input type={"link"} id={"link"} name={"link"} />
                        <button>
                            create link
                        </button>
                    </div>
                </div>
            </>
        );
    }
}





class TableOpt extends  React.Component{

    render(){
        return (
            <>
                <div className="cross_dropdown_table">
                    {this.props.icon}
                    <div className="cross_dropdown-content_table">
                        <p id={"rows"}>
                            Rows:
                        </p>
                        <input type={"number"} id={"rows"} name={"row"}/>

                        <p id={"cols"}>
                            Columns:
                        </p>
                        <input type={"number"} id={"cols"} name={"cols"} />
                        <button>
                            create
                        </button>
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
                             <button>
                                  ordered list
                             </button>
                             <button>
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
            size: 0
        };

    }

    increment() {
        this.setState({
            size: this.state.size + 1
        });
    }

    decrement() {
        this.setState({
            size: this.state.size - 1
        });
    }
    render() {
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
    };


    render() {

        return (
            <input type={"color"} name={"color"} onChange={this.onChange} />
        );
    }
}

function Icon({ icon, height, width, handler }) {

    return (height && width) ? <img
        src={icon}
        onChange={handler || function (e) { }}
        style={{ "height": height, "width": width }}
        alt={'loading'} /> :
        <img src={icon}
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
        <ToolButton child={<Icon icon={strike} />} />
        <ToolButton child={<Icon icon={subscript} />} />
        <ToolButton child={<Icon icon={superscript} />} />

        </>;
    return (
        <div id={"_toolbar"}>
            {
                state.showMore && show
            }
            {
                !state.showMore && <>
                    <ToolButton child={<Icon icon={undo} />} />
                    <ToolButton child={<Icon icon={redo} />} />
                    <ToolButton child={<Icon icon={bold} />} />
                    <ToolButton child={<Icon icon={italic} />} />
                    <ToolButton child={<Icon icon={underline} />} />
                    <ToolButton child={<Icon icon={justify} />} />
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
            <ToolButton child={<Icon icon={undo} />} />
            <ToolButton child={<Icon icon={redo} />} />
            <ToolButton child={<Icon icon={bold} />} />
            <ToolButton child={<Icon icon={italic} />} />
            <ToolButton>
                <TableOpt icon={<Icon icon={insertTable}/>} />
            </ToolButton>
            <ToolButton child={<Icon icon={underline} />} />
            <ToolButton child={<Icon icon={justify} />} />
            <ToolButton child={<Icon icon={strike} />} />
            <ToolButton child={<Icon icon={subscript} />} />
            <ToolButton child={<Icon icon={superscript} />} />


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