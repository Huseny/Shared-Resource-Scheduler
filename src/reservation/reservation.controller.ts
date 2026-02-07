import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ReservationService } from './reservation.service';



@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService){ }

    @Post()
  create(@Body() data, @Req() req) {
    return this.reservationService.createReservation(data, req.user);
  }
   @Get('my')
  getMyReservations(@Req() req) {
    return this.reservationService.getUserReservations(req.user.id);
  }
  @Get()
  getAllReservations() {
    return this.reservationService.getAllReservations();
  }
}
