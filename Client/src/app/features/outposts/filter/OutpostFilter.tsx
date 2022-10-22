import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {  Card, Icon,  } from "semantic-ui-react";
import { useStore } from "../../../stores/store";


export default  observer( function OutpostFiler(){
    const [t, i18n] = useTranslation('common');

    const {outpostStore}= useStore();
    const [alphabetUpSort,setAlphabetUpSort]=useState(true);
    const [cityUpSort,setCityUpSort]=useState(true);

    return (
        <Card>
        <div style={{display:'flex !important'}}>
            <div className="filterBox">
                <h3 >{t("filters.filter")}</h3>
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
                    {t("filters.outpostName")}
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
                   {t("filters.city")}
               </div>
              
           </Card.Description>
        </div>
        </Card>
    );
});