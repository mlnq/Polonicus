import { observer } from 'mobx-react-lite';
import React, { useEffect } from "react";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Grid} from "semantic-ui-react";
import { Outpost } from "../../../models/outpost";
import { useStore } from "../../../stores/store";
import OutpostDetails from "../details/OutpostDetails";
import OutpostFilter from '../filter/OutpostFilter';
import OutpostForm from "../form/OutpostForm";
import OutpostList from "./OutpostList";
import LoadingComponent from '../../../layout/LoadingComponent';


export default observer(function OutpostDashboard(){

    const {outpostStore,userStore} = useStore();   
    const {outpostRegistry,loadOutposts,setLoadingInitial,allOutposts,clearOutpost,outposts} = outpostStore;
    const {isLogged,firstTime,setFirstTime}=userStore;


  
    useEffect(()=>{
       
        if(firstTime)
        {
            console.log('pierszy raz')
            clearOutpost();
            setFirstTime(false);
        }
        else{

        if(outposts.length<=0) {
           loadOutposts();
        }
        }

        if(allOutposts)
        {
           clearOutpost();
           loadOutposts();
       }
       
      
    },[allOutposts,clearOutpost,firstTime,setFirstTime]);

   

    if(outpostStore.loadingInitial ) return <LoadingComponent content={"loading Polonicus"}/> 
    return(
        <Grid>
            <Grid.Column width='4'>

                <Button fluid as={Link} to="/outpostCreate" name="outpostCreate" icon='plus' negative content='Dodaj Placówke'/>
                <OutpostFilter/>

            </Grid.Column>
            
            <Grid.Column width='12'>
                <OutpostList />
            </Grid.Column>
        </Grid>
    );
});