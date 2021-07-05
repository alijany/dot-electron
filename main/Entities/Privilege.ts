import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class $Privilege extends BaseEntity {
    @PrimaryColumn()
    name!: string;

    @Column({ nullable: true })
    description!: string;
}