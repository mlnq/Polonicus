import React from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  DraftEditorCommand,
  convertToRaw,
  convertFromRaw
} from "draft-js";
import "draft-js/dist/Draft.css";
import { Button } from "semantic-ui-react";
// import { mediaBlockRenderer } from "./Media";

const TEXT_EDITOR_ITEM = "draft-js-example-item";

const TextEditor: React.FC = () => {
  const data = localStorage.getItem(TEXT_EDITOR_ITEM);
  const initialState =  data    
    ? EditorState.createWithContent(convertFromRaw(JSON.parse(data)))
    : EditorState.createEmpty();
  const [editorState, setEditorState] = React.useState<EditorState>(initialState);

  const handleSave = () => {
    const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    localStorage.setItem(TEXT_EDITOR_ITEM, data);
  };

 
  const handleKeyCommand = (command: DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleTogggleClick = (e: React.MouseEvent, inlineStyle: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleBlockClick = (e: React.MouseEvent, blockType: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <div className="texteditor">
      <Button onMouseDown={(e:any) => {handleBlockClick(e, "header-one")}}>H1</Button>
      <Button onMouseDown={(e:any) => handleBlockClick(e, "header-two")}>H2</Button>
      <Button onMouseDown={(e:any) => handleBlockClick(e, "header-three")}>H3</Button>
      <Button onMouseDown={(e:any) => handleBlockClick(e, "unstyled")}>Normal</Button>
      <Button onMouseDown={(e:any) => handleTogggleClick(e, "BOLD")}>bold</Button>
      <Button onMouseDown={(e:any) => handleTogggleClick(e, "UNDERLINE")}>underline</Button>
      <Button onMouseDown={(e:any) => handleTogggleClick(e, "ITALIC")}>italic</Button>
      <Button onMouseDown={(e:any) => handleBlockClick(e, "ordered-list-item")}>Ordered List</Button>
      <Button onMouseDown={(e:any) => handleBlockClick(e, "unordered-list-item")}>Unordered List</Button>
    
      <Button
        icon='undo'
        disabled={editorState.getUndoStack().size <= 0}
        onMouseDown={() => setEditorState(EditorState.undo(editorState))}>
        cofnij
      </Button>
      <Button
      icon='redo'
        disabled={editorState.getRedoStack().size <= 0}
        onMouseDown={() => setEditorState(EditorState.redo(editorState))}>
        ponów
      </Button>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        // blockRendererFn={mediaBlockRenderer}
      />
      <Button 
        primary
        className="save"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleSave();
        }}>
        save
      </Button>
    </div>
  );
};

export default TextEditor;
