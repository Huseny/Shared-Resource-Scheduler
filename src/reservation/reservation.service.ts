import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ReservationService {
    getUserReservations(id: any) {
       
    }
    async getAllReservations() {
        
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

    
    return reservation;
  }
        
    
}
