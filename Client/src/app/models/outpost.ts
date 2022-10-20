import Chronicles from "./chronicle";

export interface Outpost{
    id: number;
    name: string;
    description: string;
    category: string;

    country:string;
    city: string;
    street: string;

    postalCode: string;

    chronicles?: (Chronicles)[] | null;
    userId?:number;

    coord_latitude?:  string ;
    coord_longtiude?:  string ;
  }

