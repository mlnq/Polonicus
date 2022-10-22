import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { Container, Dropdown, Icon, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { useLanguageChange } from "../utils/useLanguageChange";



export default observer(function NavBar(){

    const [t, i18n] = useTranslation('common');

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

    const options = [
        { key: 1,flag: 'pl',value: 'pl' ,id:'pl'},
        { key: 3, flag: 'us',value:'en',id:'en' },
        { key: 3, flag: 'ru',value:'ru',id:'ru' },
      ]
    
     const handleDropDownSelect = (event:any, data:any) => {
        changeLanguage(event.currentTarget.id);
       };

    return (
      <>
        <Menu
          inverted
          visible={showNav}
          className={`navbar ${!showNav && "navBG"}`}
          fixed="top"
        >
          <Container>
            <Menu.Item as={NavLink} to="/" exact header>
              <img
                src="/assets/logo.svg"
                alt="logo"
                style={{ marginRight: 10 }}
              />
              <span className="logoFont">Polonicus App</span>
            </Menu.Item>

            <Menu.Item as={NavLink} to="/chronicles" name={t("navbar.chronicles")}/>
            <Menu.Item as={NavLink} to="/outposts/map" name={t("navbar.map")} />

            {userStore.isLogged ? (
              <Menu.Item position="right">
                <Icon name="user" />
                <Dropdown text={`${accountDetails?.email}`} pointing="top left">
                  <Dropdown.Menu>
                    <Dropdown.Item
                    icon="user"
                      as={Link}
                      to="/accountDetails"
                      text={t("navbar.accountDetails")}
                    />
                    <Dropdown.Item
                      icon="address book"
                      as={Link}
                      to="/outposts"
                      text={t("navbar.myOutpostPanel")}
                    />
                    {userStore.Role === 2 ? (
                      <Dropdown.Item
                        icon="chess"
                        as={Link}
                        to="/adminDashboard"
                        text={t("navbar.adminPanel")}
                      />
                    ) : null}
                    <Dropdown.Item onClick={logout} icon="sign-out" text={t("navbar.logout")} />
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            ) : null}   
            <Menu.Item>
            <Dropdown
              defaultValue={currentLanguage}
              icon="language"
              options={options}
              className="language"
              onChange={handleDropDownSelect}         
            />
        </Menu.Item>
          </Container>
        </Menu>
      </>
    );
});