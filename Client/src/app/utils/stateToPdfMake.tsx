import { convertFromRaw, 
  EditorState,
  ContentState
} from 'draft-js';
import React from 'react';
import { useState } from 'react';
import { List, Map } from 'immutable';

const BLOCK_TYPE ={
  ORDERED_LIST_ITEM: 'orderedlist',
  UNORDERED_LIST_ITEM :'unorderedlist',
  HEADER_ONE:'header-one',
  HEADER_TWO:'header-two',
  HEADER_THREE:'header-three',
  HEADER_FOUR:'header-four',
  HEADER_FIVE:'header-five',
  HEADER_SIX:'header-six',
}
const INLINE_STYLE = {
  BOLD:'bold',
  CODE:'code',
  ITALIC:'italic',
  STRIKETHROUGH:'strikethrough',
  UNDERLINE:'underline',
};

const { BOLD, CODE, ITALIC, STRIKETHROUGH, UNDERLINE } = INLINE_STYLE;




export class StateToPdfMake{

  helper: any ;
  contentState: any ;
  currentBlock: any;
  output: any;
  blocks: any;
  listOlAcc: any;
  listUlAcc: any;

  selectionState:any;

  constructor(editorState: EditorState) {
    this.contentState = editorState;
    this.currentBlock = 0;
    this.output       = { content : [] };
    this.blocks       = null;
    this.listOlAcc    = [];
    this.listUlAcc    = [];
    this.selectionState = editorState.getSelection();
  }


  getSelectedBlocksMap(editorState: EditorState) {

    this.selectionState = editorState.getSelection();
  
    this.contentState = editorState.getCurrentContent();
  
    const startKey = this.selectionState.getStartKey();
    const endKey = this.selectionState.getEndKey();
    const blockMap = this.contentState.getBlockMap();
    return blockMap
      .toSeq()
      .skipUntil((_:any, k:any) => k === startKey)
      .takeUntil((_:any, k:any) => k === endKey)
      .concat([[endKey, blockMap.get(endKey)]]);
  }
  getSelectedBlocksList(editorState:EditorState) {
    return this.getSelectedBlocksMap(editorState).toList();
  }
  
  getSelectedBlock(editorState:EditorState) {
    if (editorState) {
      return this.getSelectedBlocksList(editorState).get(0);
    }
    return undefined;
  }
  
  getEntityRange(editorState:EditorState, entityKey:any) {
    const block = this.getSelectedBlock(editorState);
    let entityRange: any;
  
    block?.findEntityRanges(
      (value:any) => value.get('entity') === entityKey,
      (start:any, end:any) => {
        entityRange = {
          start,
          end,
          text: block.get('text').slice(start, end),
        };
      }
    );
    return entityRange;
  }

  generate() {
    this.helper=this.contentState.getCurrentContent();
    this.blocks = this.helper.getBlockMap().toArray();

    while(this.currentBlock < this.blocks.length) {
      this._processBlock();
    }

    return this.output;
  }

  _processBlock() {
    const block = this.blocks[this.currentBlock];

    const defaultHeaderStyle = { bold : true, margin : [ 0, 5, 0, 0 ] };

    if(block.getType() !==  BLOCK_TYPE.UNORDERED_LIST_ITEM && !!this.listUlAcc.length) {
      //this._updateAndResetUlList();
    }

    if(block.getType() !== BLOCK_TYPE.ORDERED_LIST_ITEM && !!this.listOlAcc.length) {
      //this._updateAndResetOlList();
    }

    switch (block.getType()) {
      case BLOCK_TYPE.HEADER_ONE:
        this.output.content.push({
          text : block.getText(), fontSize : 24, ...defaultHeaderStyle
        });
      break;

      case BLOCK_TYPE.HEADER_TWO:
        this.output.content.push({
          text : block.getText(), fontSize : 22, ...defaultHeaderStyle
        });
      break;

      case BLOCK_TYPE.HEADER_THREE:
        this.output.content.push({
          text : block.getText(), fontSize : 20, ...defaultHeaderStyle
        });
      break;

      case BLOCK_TYPE.HEADER_FOUR:
        this.output.content.push({
          text : block.getText(), fontSize : 18, ...defaultHeaderStyle
        });
      break;

      case BLOCK_TYPE.HEADER_FIVE:
        this.output.content.push({
          text : block.getText(), fontSize : 16, ...defaultHeaderStyle
        });
      break;

      case BLOCK_TYPE.HEADER_SIX:
        this.output.content.push({
          text : block.getText(), fontSize : 14, ...defaultHeaderStyle
        });
      break;

      case BLOCK_TYPE.ORDERED_LIST_ITEM:
        this.listOlAcc.push({ text : [ ...this._renderBlockContent(block) ] });
      break;

      case BLOCK_TYPE.UNORDERED_LIST_ITEM:
        this.listUlAcc.push({ text : [ ...this._renderBlockContent(block) ] });
      break;

      default:
        const data = this._renderBlockContent(block);

        this.output.content.push(
          !!data.length ? { text : [ ...data ] } : { text : '\n' }
        );
    }

    // Clear lists when is last block
    if(block.getKey() === this.helper.getLastBlock().getKey()) {
      if(!!this.listUlAcc.length) {
        this._updateAndResetUlList();
      }

      if(!!this.listOlAcc.length) {
        this._updateAndResetOlList();
      }
    }

    this.currentBlock += 1;
  }

  _renderBlockContent(block: any) {
    if(block.getText() === '') {
      return [];
    }

    const range = this.getEntityRange(block.getText(), block.getCharacterList());

    const ret = range.reduce((acc:any, [entityKey, stylePieces]:any) => {
      acc.push(
        ...stylePieces.map(([ text, style ]:any) => {
          return {
            text       : this._encodeContent(text),
            bold       : style.has(BOLD),
            italics    : style.has(ITALIC),
            decoration : this._getTextDecorations(style)
          };
        }).filter((properties:any) => properties.text !== ' ')
      );

      return acc;
    }, []);

    return ret;
  }

  _getTextDecorations(style : any) {
    let object :any= {}; 
    object= { [UNDERLINE]: 'underline', [STRIKETHROUGH]: 'lineThrough' };

    return Object.keys(object).reduce((acc:any, key) => {
      if(style.has(key)) {
        acc.push(object[key]);
      }

      return acc;
    }, []);
  }

  _encodeContent(text: any) {
    return text.replace(/[*_`]/g, '\\$&');
  }

  _updateAndResetUlList() {
    this.output.content.push({ ul : this.listUlAcc });
    this.listUlAcc = [];
  }

  _updateAndResetOlList() {
    this.output.content.push({ ol : this.listOlAcc });
    this.listOlAcc = [];
  }


}
