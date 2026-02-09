import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ReservationService {
  private reservations = [];

  
    async getUserReservations(userId : number) {
       return await this.reservations.filter(r => r.userId === userId);
    }
    async getAllReservations() {
      return await this.reservations;
    }
  
    async createReservation(data, user) {
       const { startTime, endTime } = data;

       if (new Date(startTime) >= new Date(endTime)) {
      throw new BadRequestException('Invalid time range');
    }
    const reservation = {
      ...data,
      userId: user.id,
      status: 'PENDING',
    };

    this.reservations.push(reservation);    
    return reservation;
  }
        
    
}
