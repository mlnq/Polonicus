import { makeAutoObservable, reaction } from "mobx";
import Geocode from "react-geocode";
import { LatLngExpression } from "leaflet";
import { Outpost } from "../models/outpost";

export default class UtilsStore{
    token: string | null = window.localStorage.getItem('jwt');
    accountLoading = false;
    
    constructor(){
        makeAutoObservable(this);
        
        //reakcja na zmiane wlasciwosci token
        reaction(
            ()=> this.token,
            token => {
                if(token){
                    window.localStorage.setItem('jwt',token)
                }
                else{
                    window.localStorage.removeItem('jwt')
                }
            }
            )
        }
        
    setToken = (token: string | null) =>
    {
        this.token=token;
    }

    setLoadedAcc = () =>
    {
        this.accountLoading =true;
    }
   
  


   
    // Nominatim.geocode({
        //     city: "Białystok",
        //     state: "Podlaskie",
        //     country: "Poland",
        //     addressdetails: true
        // })
    // console.log(result.lat);          // '44.9772995'
            // console.log(result.lon);          // '-93.2654691'
            // console.log(result.display_name); // 'Minneapolis, Hennepin County, Minnesota, United States of America'
            
            // // result.address is only returned when 'addressdetails: true' is sent in the geocode request
            // console.log(result.address.city);    // 'Minneapolis'
            // console.log(result.address.county);  // 'Hennepin County'
            // console.log(result.address.state);   // 'Minnesota'
            // console.log(result.address.country); // 'United States of America'

}