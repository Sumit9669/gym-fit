
import { Workout } from "../models/workout.model";
import { BaseRepository } from "./base.repository";

export class WorkoutRepository extends BaseRepository<Workout>{
    constructor(){
        super();
    }

    getWorkoutByName(name:string):Workout|undefined{
        let result;
      this.items.forEach((item)=>{
            if(item.workoutName === name){
                result = item;
                return item;
            }
        });
        return result;
    }
} 