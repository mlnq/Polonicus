import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import Logo from '../../../resources/logo.svg';
import {useTranslation} from "react-i18next";
import { observer } from "mobx-react-lite";

export default observer(function HomePage()
{
    const [t, i18n] = useTranslation('common');

    const {userStore} = useStore();

    return (

        <div className='box background clean flexCol'>


            <div className='homePage clean '>
                
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
                            <h1>{t('welcome.welcome')}</h1>    
                            <Link to={`/chronicles`}>
                                 <button className='whiteBtn'><Icon name='book'/>{t('welcome.readAll')}</button>
                            </Link>  
                            <Link to={`/login`}>
                                 <button className='whiteBtn'><Icon name='user'/>{t('welcome.login')}</button>
                            </Link>  
                            <Link to={`/register`}>
                                 <div className='link'>{t('welcome.register')}</div>
                            </Link>  

                        </>)
                    }
            </div>
            <div className="pb">System powstał na Wydziale Informatyki Politechniki Białostockiej.</div>
        </div>
        
    )
});