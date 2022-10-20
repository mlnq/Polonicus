import { LatLngExpression } from "leaflet";
import { relative } from "path";
import React, { useEffect, useState } from "react";
// import { Map, Marker, TileLayer, Popup, MapLayer } from "react-leaflet";
import { MapContainer, Marker, TileLayer, Popup,ZoomControl } from "react-leaflet";
import L from 'leaflet';
import { Button, Icon, Label } from "semantic-ui-react";
import pointer from '../../../resources/blueMarker.png'
import Markere from './Markere'
import { getSVG } from "./getSVG";
import { useStore } from "../../stores/store";
import { Link } from "react-router-dom";
import LoadingComponent from "../../layout/LoadingComponent";
import { observer } from "mobx-react-lite";

interface Props{
}
 

export default observer(function OutpostMap({}:Props) {

  const {outpostStore,utilsStore} = useStore();
  const {outpostRegistry,loadAllOutposts,outposts,allOutposts} = outpostStore;
  
  
  const [zoomo,setZoom] = useState(3.2);

  useEffect( () =>{
    if(!allOutposts)
    {
      loadAllOutposts();
    }

  },[allOutposts,loadAllOutposts]);
  
  console.log(outposts)

  const position : LatLngExpression = [53.132488, 23.168840];
  const zoom : number = 3.8;


  const myCustomColour = '#583470'

  
  return (
    <>
    <div className='mapContainer'>

        
       <MapContainer className='map' center={position} zoom={zoom}  scrollWheelZoom={false}>
            <TileLayer
            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
              {
                outposts.map((outpost)=>
                          (

                          <Marker position={[Number(outpost.coord_latitude),Number(outpost.coord_longtiude)]} key={outpost.id}>
                            <Popup>
                                <div style={{display:"flex",flexDirection:'column'}}>
                                  <span><strong>Nazwa placówki: </strong>{outpost.name}</span>
                                  <span><strong>Miasto: </strong> {outpost.city}</span>
                                  <span><strong>Ulica: </strong> {outpost.street}</span>
                                  {/* <Button as={Link} to={``}>Przeczytaj kroniki</Button> */}
                                </div>
                            </Popup>
                          </Marker>
                          
                          )
                          )
              }
        </MapContainer>
    </div>
    </>
  );

 
});

