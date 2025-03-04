export class Center{
    constructor(
       public id:string,
       public centerName:string,
       public city:string,
       public centerSlots:number,
       public currentCapacity: number,
       public workoutTypes?:any[],
       public workoutSlots?:workoutSlots[]

    ){

    }    
}
interface workoutSlots{
    workoutId:string,
    slotTime:string,
    capacity:number,
    currentCapacity:number
}