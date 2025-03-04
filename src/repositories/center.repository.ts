import { Center } from "../models/center.model";
import { BaseRepository } from "./base.repository";

export class CenterRepository extends BaseRepository<Center>{
    constructor(){
        super();
    }

    getCenterByName(centerName:string):Center|undefined{
        let result;
      this.items.forEach((center)=>{
            if(center.centerName === centerName){
                result = center;
                return center;
            }
        });
        return result;
    }
} 