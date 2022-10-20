import { ContentState, convertFromRaw, EditorState } from "draft-js";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useStore } from "../../../stores/store";
import ChroniclesFilter from "../filter/ChronicleFilter";
import ChroniclesList from "./ChroniclesList";
import ChroniclesVisitorItem from "./ChroniclesVisitorItem";



export default observer(function ChroniclesVisitorDashBoard(){

    const {chronicleStore} = useStore(); 
    const {getAllChronicles} = chronicleStore;
    const [editorState,setEditorState] = useState<EditorState>
    (EditorState.createWithContent(ContentState.createFromText('Brak treści... uzupełnij dane edytując wpis')));


    const {loadingInitial,}= chronicleStore;

    useEffect(()=>{
        getAllChronicles().then(

            () =>console.log('xd')
            
            );
           
    },[getAllChronicles])

    if(loadingInitial ) return <LoadingComponent content={"loading Polonicus"}/> 
    return(
        <Grid>
            <Grid.Column width='4'>
                <ChroniclesFilter/>
            </Grid.Column>
            <Grid.Column width='12'>
                <ChroniclesList />
            </Grid.Column>
        </Grid>
    );
});