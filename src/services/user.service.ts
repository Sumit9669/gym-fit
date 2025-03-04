import { IUser } from "../interface/enums/user.interface";
import { UserRepository } from "../repositories/user.repository";

export class UserService{
    constructor(protected userRepo:UserRepository){

    }

    registerUser(userPayload:IUser){
        this.validateUserData(userPayload);
        const newId = this.userRepo.getAll().length;
        this.userRepo.add({
            id:String(newId+1),
            ...userPayload
        });
        return `User ${userPayload.name} registered Successfully!\n`;

    }

    private validateUserData(user:IUser){
        if(!user.age || !user.city ||!user.name
        ){
            throw Error('Invalid data');
        }
    }
}