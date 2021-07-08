import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import Privilege from "../contract/model/Privilege";

@Entity({ name: "privilege" })
export default class $Privilege extends Privilege {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @Column({ default: 'default' })
    group!: string;

    @Column({ nullable: true })
    description!: string;
}