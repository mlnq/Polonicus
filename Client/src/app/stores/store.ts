import { createContext, useContext } from "react";
import ChronicleStore from "./chronicleStore";
import OutpostStore from "./outpostStore";
import UserStore from "./userStore";
import UtilsStore from "./utilsStore";


interface Store{
    outpostStore: OutpostStore,
    chronicleStore: ChronicleStore,
    userStore: UserStore,
    utilsStore: UtilsStore
}

export const store: Store = {
    outpostStore: new OutpostStore(),
    chronicleStore: new ChronicleStore(),
    userStore: new UserStore(),
    utilsStore:new UtilsStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}