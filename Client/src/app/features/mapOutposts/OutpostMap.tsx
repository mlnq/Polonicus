import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
// import { Map, Marker, TileLayer, Popup, MapLayer } from "react-leaflet";
import { MapContainer, Marker, TileLayer, Popup,ZoomControl } from "react-leaflet";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";


export default observer(function OutpostMap() {

  const [t, i18n] = useTranslation('common');

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
                                  <span><strong>{t("map.outpostName")}</strong>{outpost.name}</span>
                                  <span><strong>{t("map.city")}</strong> {outpost.city}</span>
                                  <span><strong>{t("map.street")}</strong> {outpost.street}</span>
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

