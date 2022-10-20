import { makeAutoObservable ,runInAction} from "mobx";
import agent from "../api/agent";
import Chronicle from "../models/chronicle";

export default class ChronicleStore{

    chronicleRegistry: Map<number,Chronicle>= new Map<number,Chronicle>();
    selectedChronicle: Chronicle | undefined = undefined;
    loading = false;
    loadingInitial = true;
    selectedOutpostId:number = 0;
    allChronicles= false;

    lastChronicle:Chronicle | undefined= undefined;

    constructor(){
        makeAutoObservable(this);
    }

    get chronicles() {
        return Array.from(this.chronicleRegistry.values()); 
    }

    getChronicleWithLastDate = async ()=>{
        this.lastChronicle= await agent.Chronicles.getLastDate();
    }

    dateFormat =  (chronicle:Chronicle)=>{
        return ('0' + chronicle.publicationDate.getDate()).slice(-2) + '/'
        + ('0' + (chronicle.publicationDate.getMonth()+1)).slice(-2) + '/'
        + chronicle.publicationDate.getFullYear();
    }

    description = () =>{
        
        return 0;
    }

    sortChroniclesByDate(direction:Boolean){
        let array = Array.from(this.chronicleRegistry.values());

        direction?
        array.sort(function(a:any,b:any){
            return b.publicationDate - a.publicationDate;
        })
        :
        array.sort(function(a:any,b:any){
            return a.publicationDate - b.publicationDate;
        })

        this.chronicleRegistry.clear(); 

        array.forEach(
            chronicle =>{
               this.setChronicle(chronicle);
            }
        );
    }
    sortChroniclesByName(direction:Boolean){
        let array = Array.from(this.chronicleRegistry.values());
        direction?
        array.sort((a, b) => a.name.localeCompare(b.name) )
        :
        array.sort((a, b) => b.name.localeCompare(a.name) );

        this.chronicleRegistry.clear(); 

        array.forEach(
            chronicle =>{
               this.setChronicle(chronicle);
            }
        );
    }



    setLoadingInitial = (state:boolean) => {
        this.loadingInitial=state;
    }

    setSelectedOutpostId(outpostId:number){
        this.selectedOutpostId=outpostId;
    }

    checkOutpostId(outpostId:number){
        let chronicles = Array.from(this.chronicleRegistry.values());
        if(chronicles.filter(o => o.outpostId !== outpostId))
        return false;        
    }

    clearChronicle=()=>{
        this.chronicleRegistry.clear();
    }

    loadChronicle = async (outpostId:number,id:number) => {
        let chronicle = this.chronicleRegistry.get(id);
        
        // console.log(`Taki obiekt w promise istnieje id:${id}, outpostId: ${chronicle!.name}`);
        //EDIT zwaraca dane  do forma
        if(chronicle && outpostId==this.selectedOutpostId){
            console.log('laduje no')
            this.selectedChronicle = chronicle;
            return chronicle;
        }
        else {
            this.loadingInitial = true;
            try{
                this.setSelectedOutpostId(outpostId);
                console.log("KRAWCZYK KRÓL:"+chronicle);
                chronicle = await agent.Chronicles.details(id,outpostId);
                console.log("KRAWCZYK KRÓL:"+chronicle);
                
                this.setChronicle(chronicle);

                this.selectedChronicle = chronicle;
                this.setLoadingInitial(false);
                return chronicle;
            }
            catch(e)
            {
                console.log(e);
                this.setLoadingInitial(false);
            }
        }

    }
    getAllChronicles = async () =>{
        this.loadingInitial = true;

        try{
            const chronicleLoad = await agent.Chronicles.getAll();
            chronicleLoad.forEach(chronicle => {
                this.setChronicle(chronicle);
            }
            );
            
            runInAction(()=>this.allChronicles=true) ;
            this.setLoadingInitial(false);
        }
        catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadChronicles = async (outpostId:number) =>{
        this.loadingInitial = true;
        ///yyy sprawdzenie id 1 elementu.. ale jakies dziwne bardzo xd
        if(! this.checkOutpostId(outpostId)) this.chronicleRegistry.clear();
        try{
            const chronicleLoad = await agent.Chronicles.list(outpostId);
            chronicleLoad.forEach(chronicle =>
                {
                    this.setChronicle(chronicle);
                }
                );
            runInAction(()=>this.allChronicles=false) ;

            this.setSelectedOutpostId(outpostId)
            this.setLoadingInitial(false);

        }
        catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setChronicle =(chronicle:Chronicle)=>{
      chronicle.publicationDate = new Date(chronicle.publicationDate!)
      this.chronicleRegistry.set(chronicle.id,chronicle)
    }

    deleteChronicle = async (id: number,outpostId:number)=>{
        this.loading=true;
        try{
             await agent.Chronicles.delete(outpostId, id);
             runInAction(()=>{
                this.chronicleRegistry.delete(id);
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

    updateChronicle = async(chronicle: Chronicle,outpostId:number, id:number)=>{
         this.loading=true;
        try{

            await agent.Chronicles.update(chronicle,outpostId,id);
            runInAction(()=>{
                this.chronicleRegistry.set(chronicle.id,chronicle);
                this.selectedChronicle=chronicle;
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
    };
    createChronicle = async (chronicle: Chronicle,outpostId:number)=>{
        this.loading =true;
        try{
            //@TODO PROBLEM Z OSTATNIM IDEKSEM PRZED ZALADOWANIEM ew. przerobić na UUID z id z backendu (przerobic backend na przyjmowanie string id)

            var response = await agent.Chronicles.create(chronicle,outpostId);

            runInAction(() => {
                chronicle.id = response.id;
                this.selectedChronicle= chronicle;
                this.chronicleRegistry.set(chronicle.id,chronicle);
                this.setChronicle(chronicle);
                this.loading=false;
            });
        }
        catch(e){
            runInAction(() => {
                this.loading=false;
            });
            
        }

    }
    
}