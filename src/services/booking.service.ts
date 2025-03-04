import { BookingRepository } from "../repositories/booking.repository";

export class BookingService{
    constructor(protected bookingRepo:BookingRepository){

    }
}