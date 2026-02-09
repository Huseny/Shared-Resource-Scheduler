import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService){ }

    @Post()
  create(@Body() data, @Req() req) {
     const user = { id: data.userId }; 
    return this.reservationService.createReservation(data, user);
  }

@Get(':id')
getUserReservations(@Param('id') id: string) {
  return this.reservationService.getUserReservations(Number(id));
}


  @Get()
  getAllReservations() {
    return this.reservationService.getAllReservations();
  }
}
