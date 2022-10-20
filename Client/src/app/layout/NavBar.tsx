import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Icon, Menu, Transition } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { useLanguageChange } from "../utils/useLanguageChange";



export default observer(function NavBar(){

    const {userStore,utilsStore} = useStore();
    const {accountDetails,logout}=userStore;

    const [showNav,setShowNav] = useState(true);  
    const [changeLanguage, currentLanguage] = useLanguageChange();

    const contolShowNav=() =>{
        if(window.scrollY > 10){
            setShowNav(false);
        }
        else setShowNav(true);
    }
    useEffect(()=>{
        window.addEventListener('scroll',contolShowNav);
        return() => {
            window.removeEventListener('scroll',contolShowNav);
        }
    },[])


    return(
        <>
        <Menu inverted visible={showNav} className={`navbar ${!showNav && 'navBG'}`} fixed="top" >
            <Container>
                <Menu.Item as={NavLink} to="/" exact header>
                    <img src="/assets/logo.svg" alt="logo" style={{marginRight: 10 }} />
                    <span className='logoFont'>Polonicus App</span>
                </Menu.Item>
                {/* <Menu.Item as={NavLink} to="/outposts" name="Wszystkie Placówki"/> */}

                <Menu.Item as={NavLink} to="/chronicles" name="Wszystkie Kroniki"/>
                <Menu.Item as={NavLink} to="/outposts/map" name="Mapa"/>
               

                {/* <Dropdown.Menu>
                    <Dropdown.Item text={currentLanguage} value={currentLanguage}/>
                </Dropdown.Menu> */}

                {
                    userStore.isLogged? 
                    (
                        <Menu.Item position='right'>
                            <Icon name="user" />
                        <Dropdown text={`${accountDetails?.email}`} pointing="top left" >
                        <Dropdown.Menu  >
                            <Dropdown.Item as={Link} to="/accountDetails" text="Szczegóły konta"/>
                            <Dropdown.Item as={Link} to="/outposts" text="Mój panel placówek"/>
                            {
                                userStore.Role ===2 ?
                                (
                                 <Dropdown.Item as={Link} to="/adminDashboard" text="Panel Administracyjny"/>

                                ):null
                            }
                            <Dropdown.Item onClick={logout} text="wyloguj"/>
                        </Dropdown.Menu>
                        </Dropdown>
                        </Menu.Item>
                    )
                    : null

                }
               
            </Container>
        </Menu>
        </>
    )
});