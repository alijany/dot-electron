import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "../contract/model/User";
import $Privilege from "./Privilege";

@Entity()
export default class $User extends User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ unique: true })
    username!: string;

    @Column()
    password!: string;

    @Column({ nullable: true })
    token?: string;

    @ManyToMany(type => $Privilege)
    @JoinTable()
    privileges?: $Privilege[];

    async can($privilege: $Privilege) {
        const can = this.privileges?.find(privilege =>
            privilege.name == $privilege.name
        )
        return Boolean(can)
    }

    getToken(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    setToken(): User {
        throw new Error("Method not implemented.");
    }
}