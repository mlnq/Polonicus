import { observer } from "mobx-react-lite";
import  {  useState } from "react";
import { useTranslation } from "react-i18next";
import OutpostMap from "./OutpostMap";


export default observer(function OutpostMapPanel(){

    const [t, i18n] = useTranslation('common');

    const [visibility, setVisibility] = useState(true);

    // const zoom : number = 3.8;
    return(
        <>
         <div className='mapFrame'></div>
            {/* <div className='mapFrameTopFill'></div> */}


            {
                visibility?
                (
                    <div className='roundedMapDiv'>
                            <a  href="#" onClick={() => setVisibility(!visibility)}><h3>X</h3></a>
                        <h3> {t("map.popup")}</h3>
                    </div>
                )
                :
                null
            }

        <div className='mapContainer' >
            <OutpostMap />
        </div>   
        </>
    );
});