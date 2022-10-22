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
   
}