import { observer } from 'mobx-react-lite';
import  { useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button, Grid} from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import OutpostFilter from '../filter/OutpostFilter';
import OutpostList from "./OutpostList";
import LoadingComponent from '../../../layout/LoadingComponent';
import { useTranslation } from 'react-i18next';


export default observer(function OutpostDashboard(){

    const {outpostStore,userStore} = useStore();   
    const {outpostRegistry,loadOutposts,setLoadingInitial,allOutposts,clearOutpost,outposts} = outpostStore;
    const {isLogged,firstTime,setFirstTime}=userStore;

    const [t, i18n] = useTranslation('common');

  
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

                <Button fluid as={Link} to="/outpostCreate" name="outpostCreate" icon='plus' 
                negative content={t("outpostItem.add")}/>
                <OutpostFilter/>

            </Grid.Column>
            
            <Grid.Column width='12'>
                <OutpostList />
            </Grid.Column>
        </Grid>
    );
});