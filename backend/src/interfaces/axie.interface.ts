import {Part} from './parts.interface';
export interface Axie {
    id:number;
    name:string;
    image:string;
    class:string;
    parts:Part[];
    auction:string;
    title:string;
    breedCount:number;
}