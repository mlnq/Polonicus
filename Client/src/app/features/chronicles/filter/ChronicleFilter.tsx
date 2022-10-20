import { render } from "@testing-library/react";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, ButtonGroup, Card, CardContent, Header, Icon } from "semantic-ui-react";
import { useStore } from "../../../stores/store";

export default observer( function ChroniclesFilter(){


    const {chronicleStore}= useStore();
    
    const [dataUpSort,setDataUpSort]=useState(true);
    const [titleUpSort,setTitleUpSort]=useState(true);


    return(
            <Card>
                 <div style={{display:'flex !important'}}>
                 <div className="filterBox">
                     <h3 >Filtry </h3>
                 </div>
                    <Card.Description column >
                    <div className="ui button basic fluid flexLeft" 
                    onClick={()=>{
                        setDataUpSort(!dataUpSort);
                        chronicleStore.sortChroniclesByDate(dataUpSort)}}>
                   {
                       dataUpSort?
                       (
                        <Icon name="arrow up"/>
                       )
                        :
                       (
                        <Icon name="arrow down"/>
                       )
                   }
                    Data
               </div>
               <div className="ui button basic fluid flexLeft" 
                    onClick={()=>{
                        setTitleUpSort(!titleUpSort);
                        chronicleStore.sortChroniclesByName(titleUpSort)}}>
                   {
                       titleUpSort?
                       (
                        <Icon name="arrow up"/>
                       )
                        :
                       (
                        <Icon name="arrow down"/>
                       )
                   }
                   Tytuł kroniki
               </div>
                    </Card.Description>
                 </div>
            </Card>

    );
});