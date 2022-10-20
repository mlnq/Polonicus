import axios, { AxiosResponse } from "axios";
import Chronicle from "../models/chronicle";
import { Outpost } from "../models/outpost";
import User from "../models/user";
import UserCreds from "../models/userCreds";
import UserRegister from "../models/userRegister";
import { store } from "../stores/store";


//axios jest za szybki temu tworze fake delay
const sleep = (delay: number) =>{
    return new Promise((resolve)=>
        setTimeout(resolve,delay)
    )
}

axios.interceptors.response.use( async response=>{
        try {
            await sleep(500);
            return response;
        } catch (error) {
            console.log(error);
            return await Promise.reject(error);
        }
})

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(config =>{
    const token = store.utilsStore.token;
    if (token) console.log('Token:'+token);
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
}, 
error => {
    console.log(error);
    Promise.reject(error)
});

const responseBody = <T> (response: AxiosResponse<T>) => response.data;


//<T> -> generyczne dodane w celu ograniczenia przelotu danych, dane mają być sprawdzane czy się pokrywają z interfejsem
const request = {
    get: <T> (url:string) => axios.get<T>(url).then(responseBody),
    post: <T> (url:string, body: {}) => axios.post<T>(url,body).then(responseBody),
    put: <T> (url:string, body: {}) => axios.put<T>(url,body).then(responseBody),
    delete: <T> (url:string) => axios.delete<T>(url).then(responseBody)
}

const Outposts ={
    getAll: () => request.get<Outpost[]>('/outpost/all'),
    list: () => request.get<Outpost[]>('/outpost'),
    details: (id:number) => request.get<Outpost>(`/outpost/${id}`),
    create: (outpost: Outpost) => request.post<{id:number}>(`/outpost`,outpost),
    update: (outpost: Outpost) => request.put<void>(`/outpost/${outpost.id}`,outpost),
    delete: (id: number) => request.delete<void>(`/outpost/${id}`)
}

const Chronicles ={
    getLastDate: () => request.get<Chronicle>(`/chronicles/last`),
    getAll: () => request.get<Chronicle[]>(`/chronicles`),
    list: (outpostId: number) => request.get<Chronicle[]>(`/outpost/${outpostId}/chronicle`),
    details: (id:number,outpostId: number) => request.get<Chronicle>(`/outpost/${outpostId}/chronicle/${id}`),
    create: (chronicle: Chronicle,outpostId:number) => request.post<{id:number}>(`/outpost/${outpostId}/chronicle`,chronicle),
    update: (chronicle: Chronicle,outpostId:number, id:number) => request.put<void>(`/outpost/${outpostId}/chronicle/${id}`,chronicle),
    delete: (outpostId:number, id:number) => request.delete<void>(`/outpost/${outpostId}/chronicle/${id}`)
}
const Account ={
    getAll: () => request.get<User[]>('/account/getAll'),
    login: (user: UserCreds) => request.post<User>('/account/login',user),
    register: (user: UserRegister) => request.post<void>('/account/register',user),
    getUser: () => request.get<User>('/account'),
    upgradeUser: (user: UserCreds) => request.put<void>('/account/upgrade',user),
    downgradeUser: (user: UserCreds) => request.put<void>('/account/downgrade',user),
}

const agent ={
    Outposts,
    Chronicles,
    Account
}

export default agent;