import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Card, Header, Icon, Search, Segment } from "semantic-ui-react";
import { useStore } from "../../../stores/store";


export default  observer( function OutpostFiler(){
    const {outpostStore}= useStore();

    const [alphabetUpSort,setAlphabetUpSort]=useState(true);
    const [cityUpSort,setCityUpSort]=useState(true);

    return (
        <Card>
        <div style={{display:'flex !important'}}>
            <div className="filterBox">
                <h3 >Filtry </h3>
            </div>
           <Card.Description column >

               <div className="ui button basic fluid flexLeft" 
                    onClick={()=>{
                        setAlphabetUpSort(!alphabetUpSort);
                        outpostStore.sortChroniclesByName(alphabetUpSort)}}>
                   {
                       alphabetUpSort?
                       (
                        <Icon name="arrow up"/>
                       )
                        :
                       (
                        <Icon name="arrow down"/>
                       )
                   }
                   Nazwy placówki
               </div>
               <div className="ui button basic fluid flexLeft" 
                    onClick={()=>{
                        setCityUpSort(!cityUpSort);
                        outpostStore.sortChroniclesByCity(cityUpSort)}}>
                   {
                       cityUpSort?
                       (
                        <Icon name="arrow up"/>
                       )
                        :
                       (
                        <Icon name="arrow down"/>
                       )
                   }
                   Miejscowości
               </div>
              
           </Card.Description>
        </div>
        </Card>
    );
});