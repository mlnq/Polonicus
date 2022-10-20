import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Card, Header, Icon } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import OutpostMap from "./OutpostMap";


export default observer(function OutpostMapPanel(){


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
                        <h3> Sprawdź skąd pochodzą opowiedziane historie!</h3>
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