import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import Privilege from "../contract/model/Privilege";

@Entity()
export default class $Privilege extends Privilege {
    @PrimaryColumn()
    name!: string;

    @Column({ default: 'default' })
    group!: string;

    @Column({ nullable: true })
    description!: string;
}