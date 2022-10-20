import React from "react";
import { Button} from "semantic-ui-react";

interface Props{
  currentInlineStyle:any;
  onToggle:any;
  onBlock:any;
}

export default function ToolBar({currentInlineStyle,onToggle,onBlock}:Props){

const inlineStyles = [
    { label: "bold", style: "BOLD" },
    { label: "italic", style: "ITALIC" },
    { label: "underline", style: "UNDERLINE" },
    { label: "strikethrough", style: "STRIKETHROUGH" },
  ];

const blockStyles = [
    { label: 'header-one',key:'H1', style: "header-one" },
    { label: 'header-two',key:'H2', style: "header-two" },
    { label: 'header-three',key:'H3', style: "header-three" },
    // { label: 'paragraph',key:'paragraph', style: "paragraph" },
    { label: 'unorderedlist',key:'Lista', style: "unordered-list-item" },
    { label: 'orderedlist',key:'Lista numerowana', style: "ordered-list-item" },
    { label: 'blockquote',key:'Cytat', style: "blockquote" },
    { label: 'unstyled',key:'Normalna linia', style: "unstyled" },
];
return (
    <>
    {
      inlineStyles.map(
        (type,key) => (
          <Button 
          key={key}
          active={currentInlineStyle.has(type.style) ? true: false}
          icon={type.label}
          onClick={
            (e:any) => {
            e.preventDefault();
            onToggle(type.style);
          }}
          >
          </Button>
        )
      )
    }
    {
      blockStyles.map(
        type => (
          <Button 
          key={type.label}
          active={currentInlineStyle.has(type.style) ? true: false}
          onClick={
            (e:any) => {
            e.preventDefault();
            onBlock(type.style);
          }}
          >
          {type.key ? type.key : null}
          </Button>
        )
      )
    }
    
 </>
);

}