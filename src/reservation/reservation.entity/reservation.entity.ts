import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ReservationStatus } from "./reservation-status.enum";


@Entity()
export class ReservationEntity {
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    userId : number;
    @Column({ type: 'timestamp' })
    startTime: Date;
    @Column ({type : 'timestamp'})
    endTime: Date;
     @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus;
}
    
