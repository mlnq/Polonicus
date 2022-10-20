import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Card, Header, Icon, Image } from "semantic-ui-react";
import { getJSDocAugmentsTag } from "typescript";
import { useStore } from "../../stores/store";

export default observer (function AccountDetails()
{
    const {userStore}=useStore();
    const {isLogged, accountDetails,getAge} = userStore;

    useEffect(
        ()=>{
            if(isLogged)
            {
                
            }
        }
    );

    return(
        <>
        <Header as="h2">Szczegóły konta</Header>
        <Card>
            <Card.Content>
            <Card.Header>{accountDetails!.firstName} {accountDetails!.lastName}</Card.Header>
            <Card.Meta>
                Wiek: {getAge()}
            </Card.Meta>
            <Card.Description>
                 Adres email:<strong>{accountDetails!.email}</strong>
            </Card.Description>
            </Card.Content>
            
            
            <Card.Content extra>
            Rola: {accountDetails?.roleId}
            </Card.Content>
        </Card>
          {/* <Card fluid>
            <Card.Content>
                    <Card.Header>
                        {user!.email}
                    </Card.Header>

            </Card.Content>
           </Card > */}
            
        </>
    );

});