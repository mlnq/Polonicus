


import React, { useEffect,useRef, useState } from "react";
import { convertToRaw, Editor, EditorProps, EditorState, RichUtils } from "draft-js";
import ToolBar from "./ToolBar";
import { Button } from "semantic-ui-react";

interface Props{
    data:any;
}

export default function MyEditor({data}:Props) {

    const [editorState,setEditorState]=useState();

    const styles = {
        editor: {
          border: "1px solid gray",
          minHeight: "6em",
          padding:'2em',
        }
      };
      
      const customStyleMap = {
        STRIKETHROUGH: {
          textDecoration: "line-through"
        },
        FONT_SIZE_30: {
          fontSize: "30px"
        }
      };


  return (
    <>
        <Editor editorState={data} readOnly={true} onChange={()=>{}}/>
    </>
  );
}


