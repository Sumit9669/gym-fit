import { Booking } from "../models/booking.model";
import { BaseRepository } from "./base.repository";

export class BookingRepository extends BaseRepository<Booking>{
    constructor(){
        super();
    }
} 