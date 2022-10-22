import {makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import UserCreds from "../models/userCreds";
import User from "../models/user";
import { store } from "./store";
import { history } from "../..";
import UserRegister from "../models/userRegister";

export default class UserStore{

    private user: User | null = null;
    public users: User[] = [];
    public firstTime: boolean| null = true;
    public loading = false;
    public successfulAttempt = true;

    constructor(){
        makeAutoObservable(this);
    }

    getAllUsers= async() => {
        this.setLoading(true);
        try{
            this.users = await agent.Account.getAll();
            this.setLoading(false);
        }
        catch(e){
            console.log(e);
            this.setLoading(false);
            
        }
        return this.users;
    }
    
    setLoading = (state:boolean)=>
    {
        this.loading=state;
    }

    get allUsers()
    {
        return this.users;
    }
    get Role()
    {
        return this.user?.roleId;
    }

    get accountDetails()
    {
        return this.user;
    }

    setFirstTime = (state:boolean) => {
        this.firstTime=state;
     }

    get isLogged()
    {
        return !!this.user;
    }

    login = async (userCreds: UserCreds) =>{

        this.setLoading(true);
        try{
            const user = await agent.Account.login(userCreds);
            store.utilsStore.setToken(user.token);

            runInAction(() =>
            {
                this.user=user;
                this.user.dateOfBirth = new Date(user.dateOfBirth!);
                this.successfulAttempt=true;
            });

            this.setLoading(false);
            history.push('/outposts');
            // console.log(user);
        }
        catch(e){
            this.setLoading(false);
            runInAction(() =>{this.successfulAttempt=false; });
            console.log(e);
        }
    }

    logout = () => {
        store.utilsStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user=null;
        this.setFirstTime(true);
        history.push('/');
     }

    register = async(user:UserRegister) =>{
        this.setLoading(true);
        console.log('rejestruje Usera w BD');
        try{

            this.setLoading(false);
            runInAction(() =>{this.successfulAttempt=true; });

            await agent.Account.register(user);
            //dodac info ze zarejestrowano pomyslnie
            history.push('/');
        }
        catch(e){
            this.setLoading(false);
            runInAction(() =>{this.successfulAttempt=false; });

            console.log(e);
        }
     }

     deleteUser = async(email:String)=>{
        this.setLoading(true);
        try{
            agent.Account.deleteUser(email);
            this.setLoading(false);
        }
        catch(e){
            this.setLoading(false);
            console.log(e);
        }
     }

     upgrade = async(user:User)=>{
        this.setLoading(true);
        try{
            agent.Account.upgradeUser(user);
            runInAction(() =>
            {
               user.roleId=2;
            });
            this.setLoading(false);
        }
        catch(e){
            this.setLoading(false);
            console.log(e);
        }
     }
     downgrade = async(user:User)=>{
        this.setLoading(true);
        try{
            agent.Account.downgradeUser(user);
            runInAction(() =>
            {
               user.roleId=1;
            });
            this.setLoading(false);
        }
        catch(e){
            this.setLoading(false);
            console.log(e);
        }
     }

     getUser = async() =>{
        try{
            // console.log('szukam Usera na podstawie CLAIMA');

            let user = await agent.Account.getUser();

            runInAction(() =>
            {
                this.user=user;
                // console.log(user.dateOfBirth);
                this.user.dateOfBirth = new Date(user.dateOfBirth!);
            });

            // console.log(user);
        }
        catch(e){
            console.log(e);
        }
     }



     getAge =() =>{
         var today = new Date();
         var birthday =this.user!.dateOfBirth;
         var age = today.getFullYear() - birthday!.getFullYear();
         var m = today.getMonth() - birthday!.getMonth();

         if (m < 0 || (m === 0 && today.getDate() < birthday!.getDate())) 
         {
            age--;
         }
        return age;

     }
};