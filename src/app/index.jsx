import React from 'react';
import  './cstyle.css';
import Header from './components/header';
import ToolBar from "./components/toolbar";
import Editor from "./components/editor";



import {DialogBox} from "./components/util-components";
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`


//registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

//toolbar

export default class Home extends React.Component{

    render(){

        return (<>
            <DialogBox />
            <span id={"home_page"}>
                 <Header />
                 <ToolBar />
                 <br />
                 <br />
                 <br />
                 <br />
                 <Editor />
            </span>
        </>);
    }
} 