import {makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import { Outpost } from "../models/outpost";
import * as Nominatim from "nominatim-browser";

export default class OutpostStore{

    outpostRegistry = new Map<number,Outpost>();
    selectedOutpost: Outpost | undefined = undefined;
    loading = false;
    loadingInitial: Boolean|undefined = undefined;
    allOutposts:Boolean|undefined = false;


    constructor(){
        makeAutoObservable(this);
    }
    
    
    get outposts() {
        return Array.from(this.outpostRegistry.values());
    }

    public async getLongLat(outpost:Outpost){
    
        console.log(outpost.city);
        let response = await Nominatim.geocode({
            country: outpost.country,
            city: outpost.city,
            street: outpost.street,
            addressdetails: false,
        })
        if(response)
        {
            response = await Nominatim.geocode({
                country: outpost.country,
                city: outpost.city,
            })
        }
        else{
            response = await Nominatim.geocode({
                country: outpost.country,
            })
        }
        console.log(response);
        console.log(response[0]);
        // return [parseFloat(response[0]['lat']),parseFloat(response[0]['lon'])];
        //git jest to 
        return response[0];
    }
    createOutpost = async (outpost: Outpost) =>{
        this.loading =true;
        try{
            const longLat:any =await this.getLongLat(outpost).then();
            console.log(parseFloat(longLat['lat']));
            console.log(parseFloat(longLat['lon']));

            outpost.coord_latitude=longLat['lat'];
            outpost.coord_longtiude=longLat['lon'];

            const response = await agent.Outposts.create(outpost);
            runInAction(()=>this.allOutposts=false);

            runInAction(() => {
                outpost.userId= 4;
                outpost.id = response.id;
                this.outpostRegistry.set(response.id,outpost);
                this.selectedOutpost = outpost;
                this.loading=false;
            });
        }
        catch(e){
            runInAction(() => {
                this.loading=false;
            });
            
        }
    }
    loadAllOutposts = async () =>{
        this.setLoadingInitial(true);
        try{
            runInAction(()=>this.allOutposts=true) ;
            console.log(this.allOutposts)

            const outpostsLoad = await agent.Outposts.getAll();
            outpostsLoad.forEach(outpost => 
                this.outpostRegistry.set(outpost.id,outpost)
            );
            console.log(outpostsLoad)

            this.setLoadingInitial(false);
        }
        catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadOutposts = async () =>{
        this.setLoadingInitial(true);

            try{
                runInAction(()=>this.allOutposts=false) ;
                console.log(this.allOutposts)
                const outpostsLoad = await agent.Outposts.list();
                outpostsLoad.forEach(outpost => 
                    this.outpostRegistry.set(outpost.id,outpost)
                );
                this.setLoadingInitial(false);
            }
            catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
    }
    
    loadOutpost = async (id:number) => {
        let outpost = this.outpostRegistry.get(id);
        //EDIT zwaraca dane  do forma
        if(outpost){
            console.log(`Taki obiekt w promise istnieje id:${id}, outpost.name: ${outpost.name}`);
            outpost.id=id;
            this.selectedOutpost = outpost;
            runInAction(()=>this.allOutposts=false);
            return outpost;
        }
        else {
            this.loadingInitial = true;
            try{
                outpost = await agent.Outposts.details(id);
                this.outpostRegistry.set(outpost.id,outpost);
                this.selectedOutpost = outpost;
                this.setLoadingInitial(false);
                runInAction(()=>this.allOutposts=false);
                return outpost;
            }
            catch(e)
            {
                console.log(e);
                this.setLoadingInitial(false);
            }
        }

    }


    setLoadingInitial = (state:boolean) => {
        this.loadingInitial=state;
    }
    

    
    clearOutpost=()=>{
        this.outpostRegistry.clear();
        this.allOutposts=false;
    }



    updateOutpost = async(outpost: Outpost) =>{

        this.loading=true;
        try{
            await agent.Outposts.update(outpost);
            runInAction(()=>this.allOutposts=false);

            runInAction(()=>{
                this.outpostRegistry.set(outpost.id,outpost);
                this.selectedOutpost=outpost;
                this.loading=false;
            });
        }
        catch(e)
        {
            console.log(e);
            runInAction(() => {
                this.loading=false;
            });
        }
    }

    deleteOutpost = async(id: number)=>{
        this.loading=true;
        try{
             await agent.Outposts.delete(id);
             runInAction(()=>this.allOutposts=false);

             runInAction(()=>{
                this.outpostRegistry.delete(id);
                this.loading=false;
            });
        }
        catch(e)
        {
            console.log(e);
            runInAction(() => {
                this.loading=false;
            });
        }
    }

//sortowania
    sortChroniclesByName(direction:Boolean){
        let array = Array.from(this.outpostRegistry.values());

        direction?
        array.sort((a, b) => a.name.localeCompare(b.name) )
        :
        array.sort((a, b) => b.name.localeCompare(a.name) );


        this.outpostRegistry.clear(); 

        array.forEach(
            chronicle =>{
                this.outpostRegistry.set(chronicle.id,chronicle);
            }
        );
    }
    
    sortChroniclesByCity(direction:Boolean){
        let array = Array.from(this.outpostRegistry.values());
        
        direction?
        array.sort((a, b) => a.city.localeCompare(b.city) )
        :
        array.sort((a, b) => b.city.localeCompare(a.city) )


        this.outpostRegistry.clear(); 

        array.forEach(
            chronicle =>{
                this.outpostRegistry.set(chronicle.id,chronicle);
            }
        );
    }
}