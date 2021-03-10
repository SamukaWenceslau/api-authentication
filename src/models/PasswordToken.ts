import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "./Users";

@Entity('passwordtoken')
class PasswordToken {

    @PrimaryColumn()
    id: string;

    @Column()
    token: string;

    @Column()
    user_id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    constructor() {
        if (!this.id && !this.token) {
            this.id = uuid();
            this.token = uuid();
        }
    }

}

export { PasswordToken };