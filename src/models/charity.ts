import { baseInterface } from './baseModel';
export interface charity extends baseInterface {
    Name: string;
    Phone: string;
    Street: string;
    State: string;
    City: string;
    Zip: string;
    Services: string[];
    URL: string;
    email: string;
}