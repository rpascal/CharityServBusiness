import { baseInterface } from './baseModel';
import { Observable } from 'rxjs/Observable';


export interface Item extends baseInterface {
    name: string;
    subCollection?: Observable<subCollection[]>;
}

export interface subCollection extends baseInterface {
    blah: string;
    // phone : string;
    // address : string;
}

export interface service extends baseInterface {
    Title : string;
    Description : string;
    MainCategory : string;
}

export interface charity extends baseInterface {
    Name: string;
    Phone: string;
    Street: string;
    State: string;
    City: string;
    Zip: string;
    Services: string[];
    URL : string;
}