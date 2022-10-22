import { ContentState, convertFromRaw, EditorState } from "draft-js";
import { observer } from "mobx-react-lite";
import  { useEffect, useState } from "react";
import {  Grid } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useStore } from "../../../stores/store";
import ChroniclesFilter from "../filter/ChronicleFilter";
import ChroniclesList from "./ChroniclesList";



export default observer(function ChroniclesVisitorDashBoard(){

    const {chronicleStore} = useStore(); 
    const {getAllChronicles} = chronicleStore;
    const [editorState,setEditorState] = useState<EditorState>
    (EditorState.createWithContent(ContentState.createFromText('Brak treści...')));


    const {loadingInitial,}= chronicleStore;

    useEffect(()=>{
        getAllChronicles();
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