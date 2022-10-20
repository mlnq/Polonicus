import React, { useEffect,useRef } from "react";
import { convertToRaw, Editor, EditorState, RichUtils } from "draft-js";
import ToolBar from "./ToolBar";
import { Button, Form, TextArea } from "semantic-ui-react";
import { observer } from "mobx-react-lite";


interface Props {
  error?:Boolean;
  editorState:any;
  setEditorState:(state:any) => void;
}

export default function MyEditor({error,editorState,setEditorState}:Props) {
    const styles = {
        editor: {
          border: "1px solid #ddd",
          minHeight: "30em",
          borderRadius: "5px",
          padding:'2em',
          // overflowY: 'scroll',
          height: '400px',
          overflowY: 'auto'
        },
        editorDanger: {
          border: "1px solid red",
          minHeight: "6em",
          borderRadius: "5px",
          padding:'6'
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
      

  // const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
  // console.log(data);
  // const xd ='duzo tekstu';
  // console.log(xd);
  // localStorage.setItem(TEXT_EDITOR_ITEM, data);
  
  const editor = useRef<any>(null);

  function focusEditor() {
    editor.current.focus();
  }

//  useEffect(() => {
//     focusEditor();
//   }, []);


  const handleToggleClick = (inlineStyle:any) => {
    const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
    setEditorState(newState);
  };

  const handleBlockClick = (blockType: string) => {
    const newState = RichUtils.toggleBlockType(editorState, blockType);
    setEditorState(newState);
  };

  const handleKeyCommand = (command :any, editorState:any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  const data = convertToRaw(editorState.getCurrentContent());





 
  return (
    <>
      <ToolBar
        currentInlineStyle={editorState.getCurrentInlineStyle()}
        onToggle={handleToggleClick}
        onBlock={handleBlockClick}
      />

      <div onClick={focusEditor} style={ true ? styles.editor: styles.editorDanger}>
    
      <Editor
        ref={editor}
        customStyleMap={customStyleMap}
        editorState={editorState}
        onChange={editorState => setEditorState(editorState)}
        handleKeyCommand={handleKeyCommand}
      />

      </div>
      {/* <Button icon='undo' disabled={editorState.getUndoStack().size <= 0}
              onMouseDown={() => setEditorState(EditorState.undo(editorState))}></Button>
      <Button icon='redo' disabled={editorState.getRedoStack().size <= 0}
             onMouseDown={() => setEditorState(EditorState.redo(editorState))}></Button>
      */}
      </> 
  );





}