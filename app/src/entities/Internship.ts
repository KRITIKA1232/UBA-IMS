import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity("internship")
export class Internship {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    joined_date!: Date;

    @Column()
    completion_date!: Date;

    @Column()
    is_certified!: boolean;

    @Column()
    mentor_name!: string;

    @ManyToOne(() => User, (user) => user.internships)
    user!: User;
}

// This code defines an Internship entity with a many-to-one relationship to the User entity.
// The Internship entity has an auto-generated primary key `id`, and several columns to store internship details.
