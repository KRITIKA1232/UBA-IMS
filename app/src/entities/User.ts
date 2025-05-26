import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Internship } from "./Internship";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    fname!: string;

    @Column()
    lname!: string;

    @OneToMany(() => Internship, (internship) => internship.user, { cascade: true })
    internships!: Internship[];
}

// This code defines a User entity with a one-to-many relationship to the Internship entity.
// The User entity has an auto-generated primary key `id`, and two string columns `fname` and `lname`.