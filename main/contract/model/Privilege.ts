import { BaseEntity } from "typeorm";

export default abstract class Privilege extends BaseEntity {
    
    abstract name: string;

    abstract group: string;

    abstract description: string;
}