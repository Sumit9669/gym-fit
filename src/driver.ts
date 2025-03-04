import * as readline from 'readline';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { CenterRepository } from './repositories/center.repository';
import { CenterService } from './services/center.service';
import { ICenter } from './interface/enums/center.interface';
import { WorkoutRepository } from './repositories/workout.repository';
const userRepo = new UserRepository();
const userSvc = new UserService(userRepo);
const centerRepo = new CenterRepository();
const workoutRepo = new WorkoutRepository();
const centerSvc = new CenterService(centerRepo,workoutRepo);
const r1 = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});


function userPrompts(){    
    console.log('Available Actions\n addCenter\n addWorkoutType \n addSlots \n viewUserBookings \n registerUser');

    r1.question('Action\n', (input)=>{
        const command = input.replace(')','').split('(');
        const [action, payload] = command;
        switch(action){
            case 'registerUser':{
                const data = payload.split(',');
                const userData = {
                    name: data[0],
                    age: Number(data[1]),
                    city: data[2]
                }
                console.log(userSvc.registerUser(userData));
                userPrompts();
                }
                break;
            case 'addCenter':{
                const data = payload.split(',');
                const centerData:ICenter = {
                    centerName: data[0],
                    city: data[1],
                    centerSlots: Number(data[2])
                }
                console.log(centerSvc.registerCenter(centerData));
                userPrompts();
                }
                break;
                case 'addWorkoutType':{
                    const data = payload.split(',');
                    console.log(centerSvc.addWorkoutForCenter(data[0],data[1]));
                    userPrompts();
                }
                break;
                case 'addSlots':{
                    const data = payload.split(',');
                    const userdata={
                        centerName:data[0],
                        workoutName:data[1],
                        slotTime:data[2],
                        capacity:data[3]
                    }
                    centerSvc.addSlotOfWorkout(userdata);
                    userPrompts();
                }
                break;
                case 'viewUserBookings':{
                    const data = payload.split(',');
                    userPrompts();
                }
                break;
                case 'getAvailableSlot':{
                    const data = payload.split(',');
                    const centerName = data[0];
                    centerSvc.getAvailableSlots(centerName);
                    userPrompts();
                }
                break;
                case 'cancelSlot':{
                    const data = payload.split(',');
                    userPrompts();
                }
                break;     
                case 'bookSlot':{
                    const data = payload.split(',');
                    userPrompts();
                }
                break;                                            
            default:
                console.log('no action taken or invalid action\n');
                userPrompts();
        }
    })
}


userPrompts()


