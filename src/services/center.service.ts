import { ICenter } from "../interface/enums/center.interface";
import { Center } from "../models/center.model";
import { CenterRepository } from "../repositories/center.repository";
import { WorkoutRepository } from "../repositories/workout.repository";

export class CenterService{
    constructor(protected centerRepo:CenterRepository, protected workoutRepo:WorkoutRepository){

    }

    registerCenter(centerPayload:ICenter){
        this.validateCenterData(centerPayload);
        const newId = this.centerRepo.getAll().length;
        this.centerRepo.add({
            id:String(newId+1),
            ...centerPayload,
            currentCapacity: centerPayload.centerSlots
        });
        return `Center ${centerPayload.centerName} registered Successfully!\n`;

    }

    private validateCenterData(centerData:ICenter){
        if(!centerData.centerName || !centerData.city ||!centerData.centerSlots
        ){
            throw Error('Invalid data');
        } else{
            return true;
        }
    }

    addWorkoutForCenter(centerName:string, workoutType:string){
        try{
            const checkCenter = this.centerRepo.getCenterByName(centerName);
        let workoutId;
        const checkWorkout = this.workoutRepo.getWorkoutByName(workoutType)
        if(!checkCenter){
            throw Error('Please register your gym!');
        }
        if(!checkWorkout){
             workoutId = (this.workoutRepo.getAll().length)+1;
            const data = this.workoutRepo.add({
                id: String(workoutId),
                workoutName:workoutType
            });
            
        }
        this.checkIfAlreadyregisterdOrHaveCapacity(checkCenter, checkWorkout?.id! ?? workoutId);
        this.centerRepo.update(String(checkCenter.id), {
            workoutTypes: checkCenter?.workoutTypes ? [...checkCenter.workoutTypes, workoutId] : [workoutId],
            id: checkCenter.id,
            centerName: checkCenter.centerName,
            city: checkCenter.city,
            centerSlots: checkCenter.centerSlots,
            currentCapacity : checkCenter.currentCapacity-1
        });
        console.log("workout Added successfully");
    }catch(error:any){
        return error.message;
    }

    }
    checkIfAlreadyregisterdOrHaveCapacity(center: Center, workoutId:string) {
        if(!center.workoutTypes?.includes(workoutId) && center.currentCapacity>0){
            return true;
        } else {
            throw Error("no slot capacity Left or workout already added");
        }
    }
    addSlotOfWorkout(slotDetail:any){
        try{const centerDetail = this.centerRepo.getCenterByName(slotDetail.centerName);
        const workOutDetail = this.workoutRepo.getWorkoutByName(slotDetail.workoutName);
        if(centerDetail && workOutDetail){
            this.centerRepo.update(workOutDetail.id,{
                id: centerDetail.id,
                centerName: centerDetail.centerName,
                city: centerDetail.city,
                centerSlots: centerDetail.centerSlots,
                currentCapacity: centerDetail.currentCapacity,
                workoutTypes: centerDetail.workoutTypes,
                workoutSlots: [{
                    workoutId: workOutDetail.id, slotTime: slotDetail.slotTime, currentCapacity: slotDetail.capacity,
                    capacity: slotDetail.capacity
                } ]
            });
            console.log('slot added successfully');
        }}catch(error:any){
            console.log('data not available for center')
        }
    }

    getAvailableSlots(centerName:string){
        try{
            const centerDetail = this.centerRepo.getCenterByName(centerName);
            if(!centerDetail || (centerDetail.workoutTypes?.length ===0 || centerDetail.workoutSlots?.length ===0)){
            throw Error('Please register your gym or workout or slots!');
            }
            const allWorkouts = this.workoutRepo.getAll();
            console.log("slot , centerName, workoutType, slotTime, NumberOfAvailableSeats\n");
            for(let item of centerDetail.workoutTypes!){
                for(let workOut of allWorkouts){
                    if(workOut.id === item){
                        for(let workSlot of centerDetail.workoutSlots! ){
                            if(workOut.id === workSlot.workoutId && workSlot.capacity>0){
                                console.log(`>> ${centerDetail.id} ${centerDetail.centerName} ${workOut.workoutName} ${workSlot.slotTime} ${workSlot.currentCapacity}`);

                            }
                        }
                                          }
                }
            }   
        }catch(error:any){
            return error.message;
        }
    }
    cancelSlot(){

    }
}