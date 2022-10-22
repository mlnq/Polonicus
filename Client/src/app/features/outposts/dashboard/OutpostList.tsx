import { observer } from "mobx-react-lite";
import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { Segment,Item, Button, Label, Modal, Header, Icon } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useStore } from "../../../stores/store";
import OutpostItem from "./OutpostItem";


export default observer( function OutpostList(){
    
    
    const {outpostStore} = useStore();
    const {outposts,loading,deleteOutpost,loadOutposts} = outpostStore;
    
    //cur id to delete
    const [target,setTarget] = useState(0);
    const [currentOutpost, setCurrentOutpost] = useState(outposts[0]);

    // function handleOutpostDelete(event: SyntheticEvent<HTMLButtonElement>,id:number){
    //     let currentButton =parseInt(event.currentTarget.id);
    //     setTarget(currentButton);
    //     deleteOutpost(id);
    // }
    function handleOutpostDelete(id:number){

            let currentModalButton = currentOutpost.id;
            setTarget(currentModalButton);
            deleteOutpost(id);
        }
    
    // if(outposts.length === 1)  loadOutposts();
    return (
        <Segment>
            <Item.Group divided>
                {
                    outposts.map( outpost =>
                        (
                           <OutpostItem 
                           target={target}
                           setTarget={setTarget}
                           currentOutpost={currentOutpost}
                           setCurrentOutpost={setCurrentOutpost}
                           handleOutpostDelete={handleOutpostDelete} 
                           outpost={outpost} key={outpost.id}/>
                        )    
                    )
                }
            </Item.Group>
        </Segment>
    );
});