import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Item, Label, Modal } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { Outpost } from "../../../models/outpost";
import { useStore } from "../../../stores/store";

interface Props{
    outpost:Outpost;
    handleOutpostDelete: (id:number)=>void;
    currentOutpost:any;
    setCurrentOutpost:any;
    target:any;
    setTarget:any;
}

export default function OutpostItem ({
    outpost,handleOutpostDelete,currentOutpost,setCurrentOutpost,target,setTarget
}:Props){

    const [t, i18n] = useTranslation('common');

    const {outpostStore} = useStore();
    const {loading} = outpostStore;
    const [open,setOpen] = useState(false);

    return(
        <Item key={outpost.id}>
        <Item.Content>
            <Item.Header >{outpost.name}</Item.Header>
            <Item.Meta></Item.Meta>
            <Item.Description> 
                <div>{outpost.description}</div>  
            </Item.Description>
            <Item.Extra>
                <Modal id={outpost.id}
                    basic
                    onClose={() => setOpen(false)}
                    onOpen={() => 
                        {
                            console.log(outpost.id)   
                            setCurrentOutpost(outpost);
                            setOpen(true)}
                        }
                    open={open}
                    size='small'
                    trigger={
                        <Button color='black' floated='right'
                        >
                             {t("outpostItem.delete")}
                        </Button>
                    }
                    >
                    <Header icon>
                        <Icon name='trash' />
                        {t("outpostItem.deleteInfo")} {currentOutpost.name}
                    </Header>

                    {
                            !loading && target === currentOutpost.id ?
                            (
                                <Modal.Content>
                                <LoadingComponent content={t("outpostItem.deleteInfo")}/>
                                </Modal.Content>

                            )
                            :
                            (
                                <Modal.Content>
                                <p>
                                   {t("outpostItem.confirmation")}
                                </p>
                                </Modal.Content>
                            )

                    }
                    <Modal.Actions>
                        <Button basic color='red' className="bgColor" inverted onClick={() => 
                            {
                                console.log(currentOutpost.id)
                                setOpen(false)
                            }
                            }>
                        <Icon name='remove' /> {t("outpostItem.deny")}
                        </Button>

                     
                        <Button id={outpost.id} color='green' inverted 
                                onClick={async (event) => {
                                    await console.log(outpost.id)
                                    await handleOutpostDelete(currentOutpost.id);
                                    await console.log('usunięto : '+ currentOutpost.id)
                                    await setOpen(false);}}
                        >
                            
                        <Icon name='checkmark' /> {t("outpostItem.confirm")}
                        </Button>

                    </Modal.Actions>
                </Modal>

                <Button as={Link} to={`/outposts/${outpost.id}`} floated='right' content={t("outpostItem.preview")} color='red'/>
                <Button as={Link} to={`/outposts/${outpost.id}/chronicle`} floated='right' content={t("outpostItem.chronicles")} color='violet' className="bgColor"/>
               
                
                <Label > <Icon className="fitIcon" name="map marker alternate"></Icon> {outpost.city}, {outpost.country}</Label>   
            </Item.Extra>
        </Item.Content>
    </Item>
    );


}