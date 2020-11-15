/*
eslint-disable eqeqeq */
/*
Author:CROSS-DEV
e-mail:saihljarial1999@gmail.com
*/
const EditSelected = (
    api=>{
        if(window.getSelection){
            return api;
        }else {
            alert("Error:Browser does not support the selection api.Application will not work(update browser and retry)");
            return null;
        }
    }
)({

    exec:function(){

        //only select the contents of node;
        const selected  = window.getSelection();
        if(selected.isCollapsed){
            alert("Select the text first");
            return false;
        }

        const range     = selected.getRangeAt(0);
        const startContainer  =range.startContainer;

         let selectedText  = selected.toString();


        if(this.ele!==null){
            this.ele.innerText = selectedText;
            selected.deleteFromDocument();
            startContainer.after(this.ele);//before its sibling
            let temp = this.ele;

            selected.removeAllRanges();
            let _range = document.createRange();
            //correct way
            _range.selectNodeContents(temp);
            //_range.selectNode(temp);(Wrong way) error !
            //Reason:
            //checking-selecting node will case in startContainer to be the parentNode (which is editor) .
            // so using startContainer after will result in appending it on before the next sibling of editor element (causing selected node to move outside
            // of editor or page )
            // [node.after()] implementation:(reference :https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/after)

            selected.addRange(_range);
            this.reset();
        }else{
            throw new Error("set element first.");
        }


    },
    id:1,
    createEle:function(){
        const ele = document.createElement("font");
        ele.id='font-'+this.id;
        this.id++;
        return ele;
    },
    setEdit:function(ele_){
        this.ele=ele_;
    },
    ele:null,
    reset:function(){
        if(this.ele){
            this.ele=null;
        }
    }
});


export  default EditSelected;

