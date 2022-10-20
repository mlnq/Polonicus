import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useStore } from "../../../stores/store";



export default observer (function OutpostDetails()
{

    const {outpostStore} = useStore();
    const {selectedOutpost,loadOutpost,loadingInitial} = outpostStore;
    const {id} = useParams<{id: string}>();

    useEffect(()=>{
        if(id) loadOutpost(parseInt(id));
    },[id,loadOutpost])
    
    //obsługa w sytuacji kiedy outpost nie istnieje w kodzie
    if(loadingInitial) return <LoadingComponent/>;

    return (
        <Card fluid>
            <Card.Content>
                    <Card.Header>
                        {selectedOutpost?.name}
                    </Card.Header>
                    <Card.Meta>
                        {selectedOutpost?.city}
                    </Card.Meta>
                    <Card.Description>
                        {selectedOutpost?.description}
                    </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group>
                        <Button as={Link} to={`/editOutpost/${id}`}  basic color='red' content='Edit'/>
                        <Button as={Link} to={`/outposts`} basic color='grey' content='cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    );
});