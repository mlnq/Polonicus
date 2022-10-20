import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useStore } from "../../../stores/store";
import NotFound from "../../errors/NotFound";


export default observer(function AdminDashboard() {

    const {userStore} = useStore();
    const {getAllUsers,allUsers,upgrade,downgrade,Role} = userStore;
    const [open, setOpen] = React.useState(false)

    useEffect( () =>{
      getAllUsers();
    },[getAllUsers]);
    
if(userStore.loading ) return <LoadingComponent content={"loading Polonicus"}/> 
if(Role === 1) return (<Redirect to="/" />);
return (
  <>
    <table className="ui celled table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Pochodzenie</th>
          <th>Imie</th>
          <th>Nazwisko</th>
          <th>Rola</th>
          <th>Operacja</th>
        </tr>
      </thead>
      <tbody>
        {
          // {`navbar ${!showNav && 'navBG'}`}
          allUsers?.map((user, key) => (
            <tr style={{ color: `${user.roleId == 2 ? "red" : ""}` }} key={key}>
              <td data-label="Email">{user.email}</td>
              <td data-label="Pochodzenie">{user.nationality}</td>
              <td data-label="Imie">{user.firstName}</td>
              <td data-label="Nazwisko">{user.lastName}</td>
              <td data-label="Rola">
                {user.roleId == 1 ? "Użytkownik" : "Administrator"}
              </td>
              <td data-label="Operacja">
                <Button onClick={() => console.log(user.email)}>Usuń</Button>
                <Modal
                  id={key}
                  basic
                  onClose={() => setOpen(false)}
                  onOpen={() => {
                    // setCurrentOutpost(outpost);
                    setOpen(true);
                  }}
                  open={open}
                  size="small"
                  trigger={
                    <Button color="black" floated="right">
                      Usuń
                    </Button>
                  }
                >
                  <Header icon>
                    <Icon name="trash" />
                    Usuwanie użytkownika 
                  </Header>

               
                    <Modal.Content>
                      <p>Czy napewno chcesz usunąć daną placówkę ?</p>
                    </Modal.Content>
                
                  <Modal.Actions>
                    <Button
                      basic
                      color="red"
                      inverted
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <Icon name="remove" /> Nie
                    </Button>

                    <Button
                      id={key}
                      color="green"
                      inverted
                      onClick={async (event) => {
                        await console.log(user.email);
                        await setOpen(false);
                      }}
                    >
                      <Icon name="checkmark" /> Tak
                    </Button>
                  </Modal.Actions>
                </Modal>

                <Button onClick={() => upgrade(user)}>Awansuj</Button>
                <Button onClick={() => downgrade(user)}>Degraduj</Button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </>
);


});