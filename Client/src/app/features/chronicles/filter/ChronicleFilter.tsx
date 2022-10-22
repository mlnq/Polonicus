import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card,Icon } from "semantic-ui-react";
import { useStore } from "../../../stores/store";

export default observer( function ChroniclesFilter(){

    const [t, i18n] = useTranslation('common');

    const {chronicleStore}= useStore();
    
    const [dataUpSort,setDataUpSort]=useState(true);
    const [titleUpSort,setTitleUpSort]=useState(true);


    return(
            <Card>
                 <div style={{display:'flex !important'}}>
                 <div className="filterBox">
                     <h3 >{t("filters.filter")}</h3>
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
                   {t("filters.date")}
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
                   {t("filters.chronicleTitle")}
               </div>
                    </Card.Description>
                 </div>
            </Card>

    );
});