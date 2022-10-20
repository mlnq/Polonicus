import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Icon } from "semantic-ui-react";
import NavBar from "../../layout/NavBar";
import { useStore } from "../../stores/store";
import LoginForm from "../user/LoginForm";
import Logo from '../../../resources/logo.svg';
import {useTranslation} from "react-i18next";
import { observer } from "mobx-react-lite";
import I18NextHttpBackend from "i18next-http-backend";

export default observer(function HomePage()
{
    const [t, i18n] = useTranslation('common');

    const {userStore} = useStore();

    return (

        <div className='box background clean'>


            <div className='homePage clean'>
                
                <img src={Logo} alt="Polonicus Logo" style={{width:'250px'}} />
                <h2 className='logoFont'>Polonicus App</h2>

                    {userStore.isLogged ?
                        (<>
                            <Link to={`/outposts`}>
                                 <button className='whiteBtn'><Icon name='book'/>{t('welcome.title')}</button>
                            </Link>  
                        </>)
                        :
                        (<>
                            <h1>Przywracamy pamięć o korzeniach!</h1>    
                            <Link to={`/chronicles`}>
                                 <button className='whiteBtn'><Icon name='book'/>Przeczytaj kroniki</button>
                            </Link>  
                            <Link to={`/login`}>
                                 <button className='whiteBtn'><Icon name='user'/>Zaloguj się!</button>
                            </Link>  
                            <Link to={`/register`}>
                                 <div className='link'>Nie posiadasz konta ? Zarejestruj się!</div>
                            </Link>  

                        </>)
                    }
            </div>
        </div>
        
    )
});