import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useStore } from "../../../stores/store";
import ChronicleFilter from "../filter/ChronicleFilter";
import ChroniclesList from "./ChroniclesList";



export default observer(function ChroniclesDashBoard(){

    const {chronicleStore} = useStore(); 
    const {loadChronicles,selectedOutpostId,clearChronicle} = chronicleStore;
    const {outpostId} = useParams<{outpostId: string}>();

    useEffect(()=>{
        if(outpostId)
        {
            if(parseInt(outpostId) === selectedOutpostId)
            {
                loadChronicles(parseInt(outpostId)).then(() =>console.log(outpostId));
            }
            else
            {
                clearChronicle();
                loadChronicles(parseInt(outpostId)).then(() =>console.log(outpostId));
            }

        } 
    },[loadChronicles,clearChronicle,outpostId])

    if(chronicleStore.loadingInitial ) return <LoadingComponent content={"Wczytywanie Polonicus"}/> 
    return(
        <Grid>
            <Grid.Column width='4'>
                <Button  fluid as={Link} to={`/outposts/${outpostId}/chronicleCreate`} icon='plus' color='violet' content='Dodaj kronike' />
                <ChronicleFilter/>
            </Grid.Column>
            <Grid.Column width='12'>
                <ChroniclesList />
            </Grid.Column>
        </Grid>
    );
});