import { ReactDOM } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { divIcon,icon } from 'leaflet'
import Markere from './Markere'

export const getSVG = (category:any,  myStyle:any) => { 
    let pin
    switch (category) {              
        case 'motorcycle':
            pin = <Markere {...myStyle}/>
            break;                                 
        case 'truck':
            pin = <Markere {...myStyle}/>
            break;                                                                
        default:
            pin = <Markere {...myStyle}/>
            break;
        }
    const iconMarkup = renderToStaticMarkup(
       pin
    )
    const customMarketIcon = divIcon({
        html: iconMarkup,
        iconSize: [40, 30],
        popupAnchor: [25,20],
        iconAnchor:[0,0],
        className: 'dummy'
    })
    return customMarketIcon;
}